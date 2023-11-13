import { useState } from 'react';
import { Alert,Button,Modal,Form} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useItemStore from '../stores/ItemStore';
import InventoryForm from './components/InventoryForm';

export default function CreateModal() {
    const store = useItemStore()

    const errors = store.errors
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<InventoryForm />)
    const handleClose = () => { 
      setShow(false);
    }
    
    const handleShow = () => {
      store.emptyData()
      setRenderedComponent(<InventoryForm />)
      setShow(true);
      setIsLoading(true)
    }

    const handleSubmitClick = () => {
      console.log('submit action')
    }

    const handleCloseClick = () => {
      setRenderedComponent()
      handleClose()
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
         Tambah
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
           
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>

            <Button variant="primary" onClick={handleSubmitClick}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function DefaultMessage({id}){
    return (
      <Alert variant={'warning'}>
        Padam permohonan id={id} ?
      </Alert>
    )
  }

  function SuccessMessage({message='success'}) {
    return (
      <Alert variant={'success'}>
        {message}
      </Alert>
    )
  }
  