import { useState } from 'react';
import { Alert,Button,Modal,Form} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useItemStore from '../stores/ItemStore'
import InventoryForm from './components/InventoryForm';

export default function EditModal({id}) {
    const store = useItemStore()
    const errors = store.errors
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<InventoryForm />)
    const handleClose = () => { 
      setShow(false);
    }
    
    const handleShow = () => {

      setRenderedComponent(<InventoryForm />)
      setShow(true);
      setIsLoading(true)
      store.emptyData()
      console.log(store.getValue('vendor'))
      axios(`${store.show_url}/${id}`)
      .then( response => {
        //console.log(response)
        store.setValue('vendor',response.data.inventory.vendor)
        store.setValue('item',response.data.inventory.item)
        store.setValue('total',response.data.inventory.total)
        store.setValue('date_start',response.data.inventory.date_start)
        store.setValue('date_end',response.data.inventory.date_end)
        store.setValue('received_on',response.data.inventory.received_on)
        setIsLoading(false)
        
      })
    }


    const handleCloseClick = () => {
      store.emptyData()
      setRenderedComponent()
      handleClose()
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
         Edit
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {id}
           {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
           
            <Button variant="secondary" onClick={handleClose}>
              Tutup
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
  