import { useState } from 'react';
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'
import ApplicationForm from './components/ApplicationForm';

export default function EditModal({editable,id}) {
    const store = useApplicationStore()
    const errors = store.errors
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<ApplicationForm />)
    const handleClose = () => setShow(false);
    
    const handleShow = () => {
      useApplicationStore.getState().emptyData()
      setRenderedComponent(<ApplicationForm />)
      setShow(true);
      //console.log(id)
      setIsLoading(true)

      function loadItemData(item,response){
        if(response.data.application?.application_item?.hasOwnProperty(item)){
          store.setValue(item, response.data.application.application_item[item])
        } 

        if(response.data.application?.application_item?.hasOwnProperty(item + '_description')){
          store.setValue( item + '_description', response.data.application.application_item[item + '_description'])
        } 

        if(response.data.application?.application_item?.hasOwnProperty(item + '_type')){
          store.setValue( item + '_type', response.data.application.application_item[item + '_type'])
        } 
      }

      axios(`${store.show_url}/${id}`)
      .then( response => {

        //console.log(response.data)
       
        // set fetched value to form
        if(response.data.application?.hasOwnProperty('description')){
          store.setValue('description', response.data.application.description)
        } 

        loadItemData('pc', response)
        loadItemData('nb', response)
        loadItemData('pbwn', response)
        loadItemData('pcn', response)
        loadItemData('projektor', response)
        loadItemData('webcam', response)
        
        //console.log(response.data.application.editable)
        setIsLoading(false)
        
      })
      .catch( error => {
        console.warn(error)
        setIsLoading(false)
      })
    }

    const handleCloseClick = () => {
      //useApplicationStore.setState(useApplicationStore.getState().reset());
      // Empty the data object
      useApplicationStore.getState().emptyData()
      setRenderedComponent()
      handleClose()
    }

    const handleSubmitClick = () => {
   
      setIsLoading(true)

      const formData = new FormData()
      formData.append('_method', 'put')

      function AppendToFormdata(item,formData){
        if (store.getValue(item) != null ) {
          formData.append(item, store.getValue(item));
        }
  
        if (store.getValue(item + '_description') != null ) {
          formData.append(item + '_description', store.getValue(item + '_description'));
        }
  
        if (store.getValue(item + '_type') != null ) {
          formData.append(item + '_type', store.getValue(item + '_type'));
        }
      }

      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }
      
      if (store.getValue('description') != null ) {
        formData.append('description', store.getValue('description'));
      }

      AppendToFormdata('pc', formData)
      AppendToFormdata('nb', formData)
      AppendToFormdata('pbwn', formData)
      AppendToFormdata('pcn', formData)
      
      axios({
          url: `${store.edit_url}/${id}`,
          method: 'post',
          data: formData
      })
      .then( response => {
        //console.log(response)
        setIsLoading(false)
        useApplicationStore.setState({refresh:true})
        //setRenderedComponent(<ApplicationForm />)
        useApplicationStore.setState({latestId: id})
        setRenderedComponent(<SuccessMessage message={response.data.message} />)
       

        // Add a delay of 1 second before closing
        setTimeout(() => {
          handleCloseClick();
        }, 1000);
       
      })
      .catch( error => {
        console.warn(error)
        if(error.response.status === 422){
          useApplicationStore.setState({ errors :error.response.data.errors })  
        }
        setIsLoading(false)
      })
    }
  
    return (
      <>
        <Button variant="warning" disabled={!editable} onClick={handleShow}>
         Edit
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              className='me-4'
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              label="Saya mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useApplicationStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="warning" disabled={isLoading || !editable } onClick={handleSubmitClick}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function DefaultMessage({id}){
    return (
      <Alert variant={'warning'}>
        Padam permohonan id={id} ?
      </Alert>
    )
  }

  function SuccessMessage({message='success'}) {
    return (
      <Alert variant={'success'}>
        {message}
      </Alert>
    )
  }
  