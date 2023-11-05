import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import ApplicationForm from './components/ApplicationForm'
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'

export default function CreateModal() {

    const store = useApplicationStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      store.emptyData()
      setShow(true)
    } 

    const [renderedComponent, setRenderedComponent] = useState(<ApplicationForm />)

    function AppendToFormdata(item,formData){
      console.log('load for item ' + item)
      
      if (store.getValue( item + '_total') != null ) {
        formData.append(item + '_requested' , store.getValue(item + '_total'));


      //  let total = store.getValue( item + '_total')
        
      const details = store.getValue('details');

      console.log(details)

      //console.log( store.getValue(item + '_total'))
      //console.log( Object.keys(details[item]).length )
      // let submitted = Object.keys(details[item]).length;
      // if(  store.getValue(item + '_total') != submitted ){
      //   setError('Sila lengkapkan maklumat peralatan  ')
      // }


      function addErrorsIfEmpty(data) {
        const updatedData = { ...data };
      
        for (const item in updatedData) {
          if (updatedData.hasOwnProperty(item)) {
            for (const key in updatedData[item]) {
              if (updatedData[item].hasOwnProperty(key)) {
                const itemData = updatedData[item][key];
      
                if (!itemData.description || !itemData.type) {
                  itemData.error = 'Description or type is missing';
                }
              }
            }
          }
        }
      
        return updatedData;
      }

      const updatedDetails = addErrorsIfEmpty(details);
      

      //   for (let i = 0; i <= total; i++) {
      //     console.log(details?.[item]?.[i + 1]?.description)
      //     const description = details?.[item]?.[i + 1]?.description;
      //     if (!description) {
      //       // Append an error for this item
      //       details[item][i + 1].error = 'Description is required.';
      //     }
      //   }
      //   store.setValue('details', details);


        // let updatedDetails = { ...details };
        
        // if (!updatedDetails.hasOwnProperty(item)) {
        //   updatedDetails[item] = {};
        // }
        
        // // track by number so we know which item is giving error
        // if (!updatedDetails[item][3]) {
        //   updatedDetails[item][3] = {};
        // }
        
        // updatedDetails[item][3].error = 'Your error message here';
        
        // store.setValue('details', updatedDetails);

        
        
      }
  
    }

    const handleSubmitClick = () => {
        setError(null)
        setIsLoading(true)
        //console.log(store.description.value)
        const formData = new FormData()

        if (store.getValue('acknowledge') != null ) {
          formData.append('acknowledge', store.getValue('acknowledge'));
        }
             
        if (store.getValue('description') != null ) {
          formData.append('description', store.getValue('description'));
        }

        // item details
        if (store.getValue('details') != null ) {
          console.log(store.getValue('details'))
          formData.append('items', JSON.stringify(store.getValue('details')));
        }

        AppendToFormdata('pc', formData)
        AppendToFormdata('nb', formData)
        AppendToFormdata('pbwn', formData)
        AppendToFormdata('pcn', formData)

        axios({
            method: 'post',
            url: store.url,
            data: formData
        })
        .then( response => {
          //console.log(response)
          setIsLoading(false)
          useApplicationStore.setState({refresh:true})
          useApplicationStore.setState({latestId: response.data.id})
          setRenderedComponent(<SuccessMessage message={response.data.message} />)


          
          // Add a delay of 1 second before closing
          setTimeout(() => {
            handleCloseClick();
          }, 1000);
  
        })
        .catch( error => {
          setIsLoading(false)
          console.warn(error)
          if(error.response.status === 422){
            useApplicationStore.setState({ errors :error.response.data.errors })  
          }
        })

        //handleClose()
    }

    const handleCloseClick = () => {
      //useApplicationStore.setState(store.reset());
      // Empty the data object
      store.emptyData()
      setRenderedComponent(<ApplicationForm />)
      handleClose()
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShowClick}>
          Mohon
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Permohonan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
          
          { error ?
               
               <Row className='text-danger'>{error}</Row>
               
               :
              <Form.Check
                className='me-4'
                isInvalid={errors?.hasOwnProperty('acknowledge')}
                reverse
                label="Saya mengesahkan telah memeriksa permohonan ini"
                type="checkbox"
                onClick={ () => useApplicationStore.setState({errors:null}) }
                onChange={ (e) => store.setValue('acknowledge', true) }
              />

            }

            <Button variant="secondary" onClick={handleCloseClick}>
              Tutup
            </Button>
            <Button  disabled={isLoading} variant="primary" onClick={handleSubmitClick}>
              Hantar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function SuccessMessage({message='success'}) {
    return (
      <Alert variant={'success'}>
        {message}
      </Alert>
    )
  }
  
