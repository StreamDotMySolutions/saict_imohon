import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function DeliveryDateModal({agihanRequestId}) {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      setShow(true) // show the modal
    }

    const handleCloseClick = () => {
      handleClose()
    }

  
    return (
      <>
        <Button size="sm" variant="outline-primary" onClick={handleShowClick}>
          Tarikh Penghantaran
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{agihanRequestId}</span> Tarikh Penghantaran </Modal.Title>
          </Modal.Header>

          <Modal.Body>
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

