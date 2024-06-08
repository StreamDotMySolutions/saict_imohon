import { useState } from 'react'
import {  Button,Modal} from 'react-bootstrap'

import ShowAgihan from '../../../Agihan-v2/show'

export default function ViewModal({id}) {

 
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
  
        <Modal size={'xl'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ShowAgihan mohonRequestId={id} />
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

