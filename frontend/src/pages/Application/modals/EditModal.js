import { useState } from 'react';
import { Alert,Row,Col, Button, ProgressBar,Modal } from 'react-bootstrap';
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'
import ApplicationForm from './components/ApplicationForm';

export default function EditModal({id}) {
    const store = useApplicationStore()
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<ApplicationForm />)
    const handleClose = () => setShow(false);
    
    const handleShow = () => {

      useApplicationStore.getState().emptyData()
      setRenderedComponent(<ApplicationForm />)
      setShow(true);
      console.log(id)
      setIsLoading(true)
      axios( `${store.show_url}/${id}`)
      .then( response => {
        console.log(response)
        
        // set fetched value to form
        if(response.data.application?.hasOwnProperty('description')){
          useApplicationStore.getState().setValue('description', response.data.application.description)
        } 

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
      if (useApplicationStore.getState().getValue('description') != null ) {
        formData.append('description', useApplicationStore.getState().getValue('description'))
      }
      console.log( `${store.edit_url}/${id}`)
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
        setRenderedComponent(<SuccessMessage message={response.data.message} />)
        // Add a delay of 1 second before closing
        setTimeout(() => {
          handleCloseClick();
        }, 1000);

      })
      .catch( error => {
        console.warn(error)
        setIsLoading(false)
      })
    }
  
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
         Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
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
            <Button variant="warning" disabled={isLoading} onClick={handleSubmitClick}>
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
  