import { useState } from 'react';
import { Alert,Row, Button,Modal,Form} from 'react-bootstrap';
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
      useInventoryStore.getState().emptyData()
      setRenderedComponent(<InventoryForm />)
      setShow(true);
      setIsLoading(true)
    }

    const handleSubmitClick = () => {

      const formData = new FormData()

      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }
      
      axios({
        'url' : store.store_url,
        'method' : 'post',
        'data' : formData
      })
      .then( response => {
        console.log(response)
        setRenderedComponent(<SuccessMessage message={response.data.message} />)

        // Add a delay of 1 second before closing
        setTimeout(() => {
          handleCloseClick();
        }, 1000);

      })
      .catch( error => {
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

    return (
      <>
        <Button variant="primary"  onClick={handleShow}>
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

            <Button variant="primary" onClick={handleSubmitClick}>
              Tambah
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function SuccessMessage({message='success'}) {
    return (
      <Alert variant={'success'}>
        {message}
      </Alert>
    )
  }
  