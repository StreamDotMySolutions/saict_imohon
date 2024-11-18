import { useState } from 'react';
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap';
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'
import ApplicationForm from './components/ApplicationForm';

export default function ShowModal({editable,id}) {
    const store = useApplicationStore()

    const errors = store.errors
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<ApplicationForm />)
    const handleClose = () => { 
      setShow(false);
      useApplicationStore.setState({readonly:false})
    }
    
    const handleShow = () => {
      useApplicationStore.setState({readonly:true})
      useApplicationStore.getState().emptyData()
      setRenderedComponent(<ApplicationForm />)
      setShow(true);
      console.log(id)
      setIsLoading(true)

      axios(`${store.show_url}/${id}`)
      .then( response => {

        //console.log(response)
        //console.log(response.data.application.application_item)
        store.setValue('items', response.data.application.application_item)
      
        // set fetched value to form
        if(response.data.application.hasOwnProperty('description')){
          store.setValue('description', response.data.application.description)
        } 

        if(response.data.application.hasOwnProperty('created_at_formatted')){
          store.setValue('created_at_formatted', response.data.application.created_at_formatted)
        } 

        // user data
        if(response.data.application.hasOwnProperty('user')){
          store.setValue('user', response.data.application.user)
        }
        
        //console.log(response.data.application.editable)
        setIsLoading(false)
        
      })
      .catch( error => {
        console.warn(error)
        setIsLoading(false)
      })
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
              // disabled
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              checked={true}
              label="Pemohon mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useApplicationStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
