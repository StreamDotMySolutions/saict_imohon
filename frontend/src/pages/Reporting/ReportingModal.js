import { useState } from 'react'
import {  Button,Modal} from 'react-bootstrap'

import ShowAgihan from './show'

export default function ReportingModal({mohonRequestId}) {

 
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
        <Button size="sm" variant="outline-primary" onClick={handleShowClick}>
          Laporan
        </Button>
  
        <Modal fullscreen size={'xl'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{mohonRequestId}</span> Laporan Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ShowAgihan mohonRequestId={mohonRequestId} />
          </Modal.Body>
          
          <Modal.Footer>
           

            <Button 
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

