import { useState } from 'react';
import { Alert,Row,Col,Badge, Button,Modal,Form} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useInventoryStore from '../stores/InventoryStore'
import InventoryForm from '../components/InventoryForm';

export default function DeleteModal({id}) {
    const store = useInventoryStore()
    const errors = store.errors

    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
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

    const handleDeleteClick = () => {
      setError(null)
      const formData = new FormData()
      formData.append('_method','delete')
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      axios({
        url: `${store.delete_url}/${id}`,
        data: formData,
        method: 'post'
      }).then( response => {
        setRenderedComponent(<SuccessMessage message={response.data.message} />)
        setTimeout(() => {
          setIsLoading(false)
          useInventoryStore.setState({ refresh: true })
          handleCloseClick();
        }, 1000);
      }).catch( error => {
        console.warn(error)
        if(error.response.status === 422){
          useInventoryStore.setState({ errors :error.response.data.errors })  

        if(error.response.data?.hasOwnProperty('message')){
          //console.log(error.response.data.message)
          setError(error.response.data.message)
          setRenderedComponent(<ErrorMessage  message={error.response.data.message} />)
        }

        }
      })
    }

    const handleCloseClick = () => {
      useInventoryStore.getState().emptyData()
      setRenderedComponent()
      handleClose()
    }

    function SuccessMessage({message='success'}) {
      return (
        <Alert variant={'success'}>
          {message}
        </Alert>
      )
    }
  
    function ErrorMessage({message='success'}) {
      return (
        <Alert variant={'danger'}>
          {message}
        </Alert>
      )
    }
    

    return (
      <>
        <Button variant="danger"  onClick={handleShow}>
         Padam
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title><Badge bg='danger'>Padam ID:{id}</Badge></Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              className='me-4'

              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
       
              label="Saya sahkan data ini untuk dipadam"
              type="checkbox"
              onClick={ () =>useInventoryStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />
            <Button variant="secondary" onClick={handleCloseClick}>
              Tutup
            </Button>
            <Button variant="danger" onClick={handleDeleteClick}>
              Padam
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

