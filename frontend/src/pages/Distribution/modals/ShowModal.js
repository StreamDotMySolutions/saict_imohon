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
        'item': 'item',
        'total': 'total',
        'description': 'description',
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
        console.log(response)
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
      
      axios({
        'url' : store.show_url,
      })
      .then( response => {
        
        console.log(response)

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
        <Button variant="secondary"  onClick={handleShow}>
         Lihat 
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Badge>Lihat ID:{id}</Badge>
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
              disabled
              readonly
              checked
              label="Data telah disahkan"
              type="checkbox"
              onClick={ () =>useStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />
            <Button variant="secondary" onClick={handleCloseClick} disabled={isLoading}>
              Tutup
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

