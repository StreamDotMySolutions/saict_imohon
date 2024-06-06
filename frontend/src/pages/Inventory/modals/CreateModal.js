import { useState } from 'react';
import { Alert, Button,Modal,Form, Badge} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useInventoryStore from '../stores/InventoryStore'
import InventoryForm from '../components/InventoryForm';

export default function CreateModal() {
    const store = useInventoryStore()
    const errors = store.errors
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<InventoryForm />)

    const handleClose = () => { 
      setShow(false);
    }
    
    const handleShow = () => {
      setIsLoading(false)
      useInventoryStore.getState().emptyData()
      setRenderedComponent(<InventoryForm />)
      setShow(true);
    }

    const handleSubmitClick = () => {

      setIsLoading(true)
      const formData = new FormData()

      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
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
      
      if (store.getValue('vendor') != null ) {
        formData.append('vendor', store.getValue('vendor'));
      }

      if (store.getValue('email') != null ) {
        formData.append('email', store.getValue('email'));
      }

      if (store.getValue('phone') != null ) {
        formData.append('phone', store.getValue('phone'));
      }

      if (store.getValue('model') != null ) {
        formData.append('model', store.getValue('model'));
      }

      if (store.getValue('category_id') != null ) {
        formData.append('category_id', store.getValue('category_id'));
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

      axios({
        'url' : store.store_url,
        'method' : 'post',
        'data' : formData
      })
      .then( response => {
        
        //console.log(response)
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

    const handleCloseClick = () => {
      useInventoryStore.getState().emptyData()
      handleClose()
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
         Tambah
        </Button>
  
        <Modal size={'xl'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Badge>Tambah</Badge>
            </Modal.Title>
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
            <Button variant="secondary" onClick={handleCloseClick} disabled={isLoading}>
              Tutup
            </Button>

            <Button variant="primary" onClick={handleSubmitClick} disabled={isLoading}>
              Tambah
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

