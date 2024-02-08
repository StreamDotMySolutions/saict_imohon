import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { Title } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function CreateModal() {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      store.emptyData() // empty store data
      setShow(true)
    } 

    const handleCloseClick = () => {
      handleClose()
    }

    const handleSubmitClick = () => {
      const formData = new FormData()

      // submit title
      if (store.getValue('title') != null ) {
        formData.append('title', store.getValue('title'));
      }

      axios({ 
          method: 'post',
          url: store.url,
          data: formData
        })
        .then( response => {
          console.log(response)

          // Add a delay of 1 second before closing
          setTimeout(() => {
            handleCloseClick();
          }, 500);
        })
        .catch( error => {
          console.log(error)
        })
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShowClick}>
          Mohon
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>Permohonan</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Title />
            {store.getValue('title')}
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseClick}>
              Tutup
            </Button>

            <Button variant="primary" onClick={handleSubmitClick}>
              Hantar
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

