import { useState } from 'react';
import { Alert,Row,Col, Button, ProgressBar,Modal } from 'react-bootstrap';
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'

export default function DeleteModal({deleteable,id}) {
    const store = useApplicationStore()
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<DefaultMessage id={id} />)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseClick = () => {
      //useApplicationStore.setState(useApplicationStore.getState().reset());
      // Empty the data object
      useApplicationStore.getState().emptyData()
      setRenderedComponent()
      handleClose()
    }

    const handleSubmitClick = () => {
   
      setIsLoading(true)
      axios({
          method: 'post',
          url: `${store.delete_url}/${id}`,
          data: { '_method':'delete'}
      })
      .then( response => {
        //console.log(response)
        setIsLoading(false)
        useApplicationStore.setState({refresh:true})
        setRenderedComponent(<SuccessMessage message={response.data.message} />)
        
        // Add a delay of 1 second before closing
        setTimeout(() => {
          handleCloseClick();
          setRenderedComponent(<DefaultMessage id={id} />)
        }, 1000);

      })
      .catch( error => {
        console.warn(error)
        setIsLoading(false)
      })
    }
  
    return (
      <>
        <Button disabled={!deleteable} variant="danger" onClick={handleShow}>
         Padam
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Padam</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" disabled={isLoading || !deleteable} onClick={handleSubmitClick}>
              Padam
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
  