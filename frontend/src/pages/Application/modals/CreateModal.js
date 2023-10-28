import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal } from 'react-bootstrap'
import ApplicationForm from './components/ApplicationForm'
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'

export default function CreateModal() {

    const store = useApplicationStore()

    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      store.emptyData()
      setShow(true)
    } 

    const [renderedComponent, setRenderedComponent] = useState(<ApplicationForm />)

    const handleSubmitClick = () => {
        setIsLoading(true)
        //console.log(store.description.value)
        const formData = new FormData()
     
        if (store.getValue('type') != null ) {
          formData.append('type', store.getValue('type'));
        }
        
        if (store.getValue('description') != null ) {
          formData.append('description', store.getValue('description'));
        }

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
          //console.warn(error)
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
  