import { useState } from 'react';
import { Row,Col, Button, ProgressBar,Modal,Alert } from 'react-bootstrap';
import useApplicationStore from '../../stores/ApplicationStore'
import axios from '../../../../libs/axios'

export default function ManagerApprovalModal({editable,id,label='Lihat'}) {
    const store = useApplicationStore()
    const [show, setShow] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<Default />)
  
    const handleClose = () => setShow(false)

    const handleCloseClick = () => {
      //useApplicationStore.setState(useApplicationStore.getState().reset());
      // Empty the data object
      store.emptyData()
      setRenderedComponent(<Default />)
      handleClose()
    }
    
    const [isLoading, setIsLoading] = useState(false)

    const handleShow = () => {
      setRenderedComponent(<Default />)
      setShow(true)
      console.log('fetch data')
      //useApplicationStore.getState().emptyData()
      store.emptyData()
      setIsLoading(true)


      axios( `${store.show_url}/${id}`)
      .then( response => {
       
        // set fetched value to form
        if(response.data.application?.hasOwnProperty('description')){
          //useApplicationStore.getState().setValue('description', response.data.application.description)
          store.setValue('description', response.data.application.description)
        } 
        setIsLoading(false)
      })
      .catch( error => {
        console.warn(error)
        setIsLoading(false)
      })
    }
  
    const handleStatusClick = (status) => {
     
      console.log(status)
      // url ~ /applications/approval/{application}/{status}/by-manager

      //useApplicationStore.getState().emptyData()
      store.emptyData()
      setIsLoading(true)

      axios( `${store.show_url}/approval/${id}/${status}/by-manager`)
      .then( response => {
        console.log(response)
        useApplicationStore.setState({refresh:true})
        useApplicationStore.setState({latestId: id})
        setRenderedComponent(<SuccessMessage message={response.data.message} />)
        setIsLoading(false)
        
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
        <Button disabled={!editable} variant="primary" onClick={handleShow}>
          {label}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Pengesahan Permohonan ( Manager )</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>

            <Button disabled={isLoading} variant="danger" onClick={ () => handleStatusClick('rejected')}>
              Gagal
            </Button>
            <Button disabled={isLoading} variant="success" onClick={ () => handleStatusClick('approved') }>
              Lulus
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  function Default() {
    const store = useApplicationStore()
    return (
      <>
      {store.getValue('description')}
      </>
    )
  }

  function SuccessMessage({message='success'}) {
    return (
      <Alert variant={'success'}>
        {message}
      </Alert>
    )
  }
  