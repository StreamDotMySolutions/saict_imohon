import { useState } from 'react';
import { Alert, Button,Modal,Form, Badge} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useStore from '../store';
import DistributionForm from '../components/Form';

export default function CreateModal() {
    const store = useStore()
    const errors = store.errors
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<DistributionForm />)

    const handleClose = () => { 
      setShow(false);
    }
    
    const handleShow = () => {
      setIsLoading(false)
      useStore.getState().emptyData()
      setRenderedComponent(<DistributionForm />)
      setShow(true);
    }

    const handleSubmitClick = () => {

      setIsLoading(true)
      const formData = new FormData()

      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      if (store.getValue('item') != null ) {
        formData.append('item', store.getValue('item'));
      }

      if (store.getValue('total') != null ) {
        formData.append('total', store.getValue('total'));
      }

      if (store.getValue('description') != null ) {
        formData.append('description', store.getValue('description'));
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
          setIsLoading(false)
          useStore.setState({ refresh: true })
          handleCloseClick();
        }, 1000);

      })
      .catch( error => {
        setIsLoading(false)
        console.warn(error)
        if(error.response.status === 422){
          useStore.setState({ errors :error.response.data.errors })  

          if(error.response.data.hasOwnProperty('message') ){
            setRenderedComponent(<ErrorMessage message={error.response.data.message} />)
            setTimeout(() => {
              setIsLoading(false)
              useStore.setState({ refresh: true })
              handleCloseClick();
            }, 1000);
          }
        }
      })
    }

    const handleCloseClick = () => {
      useStore.getState().emptyData()
      handleClose()
    }

    const SuccessMessage = ({message='success'}) => {
      return (
        <Alert variant={'success'}>
          {message}
        </Alert>
      )
    }

    const ErrorMessage = ({message='success'}) => {
      return (
        <Alert variant={'danger'}>
          {message}
        </Alert>
      )
    }
  
    return (
      <>
        <Button variant="primary"  onClick={handleShow}>
         Tambah
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
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
              onClick={ () =>useStore.setState({errors:null}) }
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

