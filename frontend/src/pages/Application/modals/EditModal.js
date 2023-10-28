import { useState } from 'react';
import { Alert,Row,Col, Button, ProgressBar,Modal } from 'react-bootstrap';
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'
import ApplicationForm from './components/ApplicationForm';

export default function EditModal({editable,id}) {
    const store = useApplicationStore()
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
      axios(`${store.show_url}/${id}`)
      .then( response => {

        //console.log(response.data)
       
        // set fetched value to form
        if(response.data.application?.hasOwnProperty('description')){
          store.setValue('description', response.data.application.description)
        } 

        if(response.data.application?.hasOwnProperty('type')){
          store.setValue('type', response.data.application.type)
        } 

        if(response.data.application?.application_item?.hasOwnProperty('pc')){
          store.setValue('pc', response.data.application.application_item.pc)
        } 

        if(response.data.application?.application_item?.hasOwnProperty('nb')){
          store.setValue('nb', response.data.application.application_item.nb)
        } 

        if(response.data.application?.application_item?.hasOwnProperty('pbwn')){
          store.setValue('pbwn', response.data.application.application_item.pbwn)
        } 

        if(response.data.application?.application_item?.hasOwnProperty('pcn')){
          store.setValue('pcn', response.data.application.application_item.pcn)
        } 

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

      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }
   
      if (store.getValue('type') != null ) {
        formData.append('type', store.getValue('type'));
      }
      
      if (store.getValue('description') != null ) {
        formData.append('description', store.getValue('description'));
      }

      if (store.getValue('pc') != null ) {
        formData.append('pc', store.getValue('pc'));
      }

      if (store.getValue('nb') != null ) {
        formData.append('nb', store.getValue('nb'));
      }

      if (store.getValue('pbwn') != null ) {
        formData.append('pbwn', store.getValue('pbwn'));
      }

      if (store.getValue('pcn') != null ) {
        formData.append('pcn', store.getValue('pcn'));
      }
      
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
  