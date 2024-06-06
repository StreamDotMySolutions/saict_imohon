import { useState } from 'react';
import { Alert,Row,Col, Button,Modal,Form, Badge} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useInventoryStore from '../stores/InventoryStore'
import InventoryForm from '../components/InventoryForm';

export default function EditModal({id}) {
    const store = useInventoryStore()
    const errors = store.errors

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<InventoryForm />)

    const handleClose = () => { 
      setShow(false);
      useInventoryStore.setState({readonly:false})
    }

    const setInventoryValues = (data) => {
      const valueMappings = {
        'vendor': 'vendor',
        'email': 'email',
        'phone': 'phone',
        'item': 'item',
        'model': 'model',
        'total': 'total',
        'date_start': 'date_start',
        'date_end': 'date_end',
        'created_at': 'created_at',
        'received_on': 'received_on',
        'contract_name': 'contract_name',
        'contract_number': 'contract_number',
        'contract_pic': 'contract_pic',
        'contract_owner': 'contract_owner',
        'category_id': 'category_id',
      };
    
      for (const key in valueMappings) {
        if (data.inventory.hasOwnProperty(key)) {
          store.setValue(valueMappings[key], data.inventory[key]);
        }
      }
    }
    
    const handleShow = () => {
      useInventoryStore.getState().emptyData()
      setRenderedComponent(<InventoryForm />)
      setShow(true);
      setIsLoading(true)

      axios(`${store.show_url}/${id}`)
      .then( response => {
        setInventoryValues(response.data);
        setIsLoading(false)
      })
      .catch( error => {
        if(error.response.status === 422){
          useInventoryStore.setState({ errors :error.response.data.errors })  
        }
        console.warn(error)
        setIsLoading(false)
      })
    }

    const handleCloseClick = () => {
      useInventoryStore.getState().emptyData()
      setRenderedComponent()
      handleClose()
    }

    const handleSubmitClick = () => {

      setIsLoading(true)
      const formData = new FormData()

      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }
      
      if (store.getValue('vendor') != null ) {
        formData.append('vendor', store.getValue('vendor'));
      }

      if (store.getValue('item') != null ) {
        formData.append('item', store.getValue('item'));
      }

      if (store.getValue('total') != null ) {
        formData.append('total', store.getValue('total'));
      }

      if (store.getValue('date_start') != null ) {
        formData.append('date_start', store.getValue('date_start'));
      }

      if (store.getValue('date_end') != null ) {
        formData.append('date_end', store.getValue('date_end'));
      }

      if (store.getValue('received_on') != null ) {
        formData.append('received_on', store.getValue('received_on'));
      }

      if (store.getValue('contract_name') != null ) {
        formData.append('contract_name', store.getValue('contract_name'));
      }

      if (store.getValue('contract_number') != null ) {
        formData.append('contract_number', store.getValue('contract_number'));
      }

      if (store.getValue('contract_pic') != null ) {
        formData.append('contract_pic', store.getValue('contract_pic'));
      }

      if (store.getValue('contract_owner') != null ) {
        formData.append('contract_owner', store.getValue('contract_owner'));
      }

      formData.append('_method', 'put');

      axios({
        'url' : `${store.edit_url}/${id}`,
        'method' : 'post',
        'data' : formData
      })
      .then( response => {
        
        console.log(response)
        setRenderedComponent(<SuccessMessage message={response.data.message} />)

        // Add a delay of 1 second before closing
        setTimeout(() => {
          setIsLoading(false)
          useInventoryStore.setState({ refresh: true })
          handleCloseClick();
        }, 1000);

      })
      .catch( error => {
        setIsLoading(false)
        console.warn(error)
        if(error.response.status === 422){
          useInventoryStore.setState({ errors :error.response.data.errors })  
        }
      })

    }
    const SuccessMessage = ({message='success'}) => {
      return (
        <Alert variant={'success'}>
          {message}
        </Alert>
      )
    }
  

    return (
      <>
        <Button variant="primary"  onClick={handleShow}>
         Edit
        </Button>
  
        <Modal size={'xl'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><Badge>Edit ID:{id}</Badge></Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              className='me-4'
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              label="Saya telah mengesahkan data ini"
              type="checkbox"
              onClick={ () =>useInventoryStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />
            <Button variant="secondary" onClick={handleCloseClick}>
              Tutup
            </Button>
            
            <Button variant="primary" onClick={handleSubmitClick} disabled={isLoading}>
              Kemaskini
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }



