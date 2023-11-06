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
      //console.log('formData for item ' + item)
      
      if (store.getValue( item + '_total') != null ) {
        //console.log(details)
        let total = store.getValue( item + '_total')
        //console.log(total)
        const details = store.getValue('details');
        //console.log(details)

        if(total && ! details[item]){
          setError(`Sila lengkapkan maklumat peralatan`)
          setTimeout(() => {
            setError(null)
            setIsLoading(false)
          }, 2000);
        }
        
   
        if(details && details[item]){ 
          let submitted = Object.keys(details[item])?.length
          let requested = store.getValue(item + '_total')

          if( submitted != requested){
            setError(`Sila lengkapkan maklumat peralatan`)
            setTimeout(() => {
              setError(null)
              setIsLoading(false)
            }, 2000);
          }
          
          // Check if the number of elements in "data" matches the "total" value
          const dataCount = Object.keys(details[item])?.length
          //console.log(dataCount)

          if (dataCount != total) {
            setError(`Sila lengkapkan maklumat peralatan ( data tak sama dengan permintaan )`)
            //console.log(`The number of elements in "data" is not equal to ${total}`);
            setTimeout(() => {
              setError(null)
              setIsLoading(false)
            }, 2000);
          } 

          // Check if description and type are not equal to ''
          //console.log(details.pc)

          const itemArray = details[item] ? Object.values(details[item]) : [];
          //const itemArray = details?.item ? Object.values(details.item) : [];

          itemArray.forEach( (item,index) => {
            //console.log(item.description);
          
            if (item.description === '') {
              setError(`Sila lengkapkan maklumat peralatan ( empty string ${index} )`)
              console.log(`The number of elements in "data" is not equal to ${total}`);
              setTimeout(() => {
                setError(null)
                setIsLoading(false)
              }, 2000);
            }
          });
          
        }
         
        formData.append(item + '_requested' , store.getValue(item + '_total'));

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
          //console.log(store.getValue('details'))
          formData.append('items', JSON.stringify(store.getValue('details')));
        } else {

          setError('Sila lengkapkan maklumat peralatan  ')
          // Add a delay of 1 second before closing
          setTimeout(() => {
            setError(null)
          }, 2000);
            
          setIsLoading(false)
          return
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
      setIsLoading(false)
      store.emptyData()
      setError(null)
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
            <Button  disabled={isLoading } variant="primary" onClick={handleSubmitClick}>
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
  
