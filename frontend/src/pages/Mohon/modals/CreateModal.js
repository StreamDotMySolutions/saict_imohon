import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'


export default function CreateModal() {

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

