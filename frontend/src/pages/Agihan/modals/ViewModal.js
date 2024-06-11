import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, FloatingLabel} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useStore from '../store'

export default function ViewModal({id}) {

    const store = useStore()
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      //console.log(id)

        axios({
            'method' : 'get',
            'url' : `${store.mohonDistributionItemAcceptance}/${id}/show`
        })
        .then( response => {
          console.log(response.data)
          store.setValue('message', response.data?.data?.message)
          setIsLoading(false)
        })
        .catch ( error => {
          console.warn(error)
          setIsLoading(false)
        })

        setShow(true) // show the modal
    }

    const handleCloseClick = () => {
      handleClose()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      formData.append('mohon_distribution_item_id', id);

      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', 1);
      }
      
      // description
      if (store.getValue('message') != null ) {
        formData.append('message', store.getValue('message'));
      }

      // method PUT ( to simulate PUT in Laravel )
      //formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.mohonDistributionItemAcceptance}/${id}/updateOrCreate`,
          data: formData
        })
        .then( response => {
          //console.log(response)
          store.setValue('refresh', true)
          handleClose()
        })
        .catch( error => {
          console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )
          }
        })
        .finally()
    }

  
    return (
      <>
        <Button size="sm" variant="outline-info" onClick={handleShowClick}>
          Pengesahan
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Pengesahan Penerimaan </Modal.Title>
          </Modal.Header>


          <Modal.Body>
            {/* <h5>Nota dari Admin</h5>
            <InputTextarea
              fieldName='description' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-info'
              rows='3'
              isLoading={'true'}
            />
            <br /> */}
            <h5>Nota penerimaan</h5>

    
            <InputTextarea
              fieldName='message' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-pencil'
              rows='6'
              isLoading={isLoading}
            />
         

          </Modal.Body>
          
          <Modal.Footer>

    
            <Form.Check
                className='me-4'
                isInvalid={errors?.hasOwnProperty('acknowledge')}
                reverse
                disabled={isLoading}
                label="Saya mengesahkan telah memeriksa permohonan ini"
                type="checkbox"
                onClick={ () => useStore.setState({errors:null}) }
                onChange={ (e) => store.setValue('acknowledge', true) }
              />
            

      
            <Button 
              disabled={ isLoading }
              variant="outline-success" 
              onClick={handleSubmitClick}>
              Hantar
            </Button>
            

            <Button 
              disabled={isLoading}
              variant="outline-secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

