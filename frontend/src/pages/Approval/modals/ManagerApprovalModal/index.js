import { useState } from 'react';
import { Row,Col, Button, ProgressBar,Modal,Alert, Form } from 'react-bootstrap';
import useApplicationStore from '../../stores/ApplicationStore'
import axios from '../../../../libs/axios'

export default function ManagerApprovalModal({editable,id,label='Lihat'}) {
    const store = useApplicationStore()
    const errors = store.errors
    console.log(errors)
    const [show, setShow] = useState(false)
    const [renderedComponent, setRenderedComponent] = useState(<Default />)
  
    const handleClose = () => setShow(false)

    const handleCloseClick = () => {
      //useApplicationStore.setState(useApplicationStore.getState().reset());
      // Empty the data object
      store.emptyData()
      setRenderedComponent(<Default />)
      handleClose()
    }
    
    const [isLoading, setIsLoading] = useState(false)

    const handleShow = () => {
      setRenderedComponent(<Default />)
      setShow(true)
      console.log('fetch data')
      //useApplicationStore.getState().emptyData()
      store.emptyData()
      setIsLoading(true)


      axios( `${store.show_url}/${id}`)
      .then( response => {
       
        // set fetched value to form
        if(response.data.application?.hasOwnProperty('description')){
          //useApplicationStore.getState().setValue('description', response.data.application.description)
          store.setValue('description', response.data.application.description)
        } 
        setIsLoading(false)
      })
      .catch( error => {
       
        console.warn(error)

        setIsLoading(false)
      })
    }
  
    const handleStatusClick = (status) => {
     
      console.log(status)
      // url ~ /applications/approval/{application}/{status}/by-manager

      //useApplicationStore.getState().emptyData()
 
      setIsLoading(true)

      const formData = new FormData
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }
      

      axios({
       'url' : `${store.show_url}/approval/${id}/${status}/by-manager`,
       'method' : 'post',
       'data' : formData
      })
      .then( response => {
        store.emptyData()
        console.log(response)
        useApplicationStore.setState({refresh:true})
        useApplicationStore.setState({latestId: id})
        setRenderedComponent(<SuccessMessage message={response.data.message} />)
        setIsLoading(false)
        
        // Add a delay of 1 second before closing
        setTimeout(() => {
          handleCloseClick();
        }, 1000);
      })
      .catch( error => {
        console.warn(error)
        if(error.response.status === 422){
          useApplicationStore.setState({ errors :error.response.data.errors })  
        }
        setIsLoading(false)
      })
    }

    return (
      <>
        <Button disabled={!editable} variant="primary" onClick={handleShow}>
          {label}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Pengesahan Permohonan ( Manager )</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {renderedComponent}
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              className='me-4'
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              label="Saya mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useApplicationStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>

            <Button disabled={isLoading} variant="danger" onClick={ () => handleStatusClick('rejected')}>
              Gagal
            </Button>
            <Button disabled={isLoading} variant="success" onClick={ () => handleStatusClick('approved') }>
              Lulus
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  function Default() {
    const store = useApplicationStore()
    return (
      <>
    maklumat - {store.getValue('description')}
      </>
    )
  }

  function SuccessMessage({message='success'}) {
    return (
      <Alert variant={'success'}>
        {message}
      </Alert>
    )
  }
  