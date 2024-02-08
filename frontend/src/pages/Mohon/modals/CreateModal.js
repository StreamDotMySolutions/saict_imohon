import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { Title } from './components/Inputs'
import useMohonStore from '../store'

export default function CreateModal() {

    const store = useMohonStore()
    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
        setShow(true)
    } 

    const handleCloseClick = () => {
        handleClose()
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

          </Modal.Footer>
        </Modal>
      </>
    );
  }

