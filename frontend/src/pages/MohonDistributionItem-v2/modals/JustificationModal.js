import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'


export default function JustificationModal({message}) {


    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setShow(true) // show the modal
    }

    const handleCloseClick = () => {
      handleClose()
    }

  
    return (
      <>
        <Button size="sm" variant="outline-dark" onClick={handleShowClick}>
          Mesej
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>Justifikasi</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Col className='border border-1 rounded p-2 bg-dark text-light'>
            {message} 
          </Col>
        </Modal.Body>
          
          <Modal.Footer>
            <Button 
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

