import { useState } from 'react';
import { Alert,Row,Col, Button,Modal,Form} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useInventoryStore from '../stores/InventoryStore'
import InventoryForm from '../components/InventoryForm';

export default function ShowModal({id}) {
    const store = useInventoryStore()
    const errors = store.errors

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<InventoryForm />)

    const handleClose = () => { 
      setShow(false);
     useInventoryStore.setState({readonly:false})
    }
    
    const handleShow = () => {
     useInventoryStore.setState({readonly:true})
     useInventoryStore.getState().emptyData()
      setRenderedComponent(<InventoryForm />)
      setShow(true);
      console.log(id)
      setIsLoading(true)

      axios(`${store.show_url}/${id}`)
      .then( response => {

        //console.log(response)
        store.setValue('vendor', response.data.inventory.vendor)
        store.setValue('item',response.data.inventory.item)
        store.setValue('total',response.data.inventory.total)
        store.setValue('date_start',response.data.inventory.date_start)
        store.setValue('date_end',response.data.inventory.date_end)
        store.setValue('created_at',response.data.inventory.created_at)
        store.setValue('received_on',response.data.inventory.received_on)
        setIsLoading(false)
        
      })
      .catch( error => {
        console.warn(error)
        setIsLoading(false)
      })
    }


    const handleCloseClick = () => {

      // Empty the data object
      useInventoryStore.getState().emptyData()
      setRenderedComponent()
      handleClose()
    }

    return (
      <>
        <Button variant="secondary"  onClick={handleShow}>
         Lihat
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lihat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              className='me-4'
              disabled
              readonly
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              checked={true}
              label="Data ini telah disahkan"
              type="checkbox"
              onClick={ () =>useInventoryStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />
            <Button variant="secondary" onClick={handleCloseClick}>
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
  