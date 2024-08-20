import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function JustificationModal({message}) {

    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
  
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
          Justifikasi
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>Justifikasi</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Col className='bg-dark text-light p-5'>
              {message}
            </Col>
          </Modal.Body>
          
          <Modal.Footer>
            <Button 
              //disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>


          </Modal.Footer>
        </Modal>
      </>
    );
  }

