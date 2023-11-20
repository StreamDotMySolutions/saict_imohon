import { useState } from 'react';
import { Alert, Button,Modal,Form, Badge} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useStore from '../store';
import DistributionForm from '../components/Form';

export default function ShowModal({id}) {
    const store = useStore()
    const errors = store.errors
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<DistributionForm />)

    const handleClose = () => { 
      setShow(false);
    }

    const setDistributionValues = (data) => {
      const valueMappings = {
        'application_id': 'application_id',
        'item': 'item',
        'total': 'total',
        'description': 'description',
        'status': 'status',
      };
    
      for (const key in valueMappings) {
        if (data.distribution.hasOwnProperty(key)) {
          store.setValue(valueMappings[key], data.distribution[key]);
        }
      }
    }
    
    const handleShow = () => {
      setIsLoading(false)
      useStore.getState().emptyData()
      axios({
        'url' : `${store.show_url}/${id}`,
      })
      .then( response => {
        //console.log(response)
        setDistributionValues(response.data);
      })
      .catch( error => {
        setIsLoading(false)
        console.warn(error)
        if(error.response.status === 422){
          if(error.response.data.hasOwnProperty('message') && !error.response.data.errors  ){
            setRenderedComponent(<ErrorMessage message={error.response.data.message} />)
            setTimeout(() => {
              setIsLoading(false)
              useStore.setState({ refresh: true })
              handleCloseClick();
            }, 1000);
          }
        }
      })
      setRenderedComponent(<DistributionForm />)
      setShow(true);
    }

    const handleSubmitClick = () => {

      setIsLoading(true)

      const formData = new FormData()

      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      if (store.getValue('updated_status') != null ) {
        formData.append('status', store.getValue('updated_status'));
      }
      

      formData.append('_method', 'put');
      
      axios({
        'url' : `${store.update_url}/${id}`,
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
          
          if(error.response.data.hasOwnProperty('message') && !error.response.data.errors  ){
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

    const handleStatusClick =(status) => {
      console.log(status)
      store.setValue('updated_status',status)
      handleSubmitClick()
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
         Edit 
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Badge>Edit ID:{id}</Badge>
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

            <Button 
              disabled={isLoading || store.getValue('status') === 'rejected' } 
              variant="danger" 
              onClick={ () => handleStatusClick('rejected')}>
              Gagal
            </Button>
            <Button 
              disabled={isLoading || store.getValue('status') === 'approved' } 
              variant="success" 
              onClick={ () => handleStatusClick('approved') }>
              Lulus
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

