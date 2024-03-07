import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
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
            'url' : `${store.mohonDistributionItemShow}/${id}`
        })
        .then( response => {
          console.log(response.data)
          store.setValue('description', response.data?.item?.description)
          store.setValue('received_text', response.data?.item?.received_text)
          store.setValue('received_at', response.data?.item?.received_at)
          store.setValue('received_status', response.data?.item?.received_status)
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

      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', 1);
      }
      
      // description
      if (store.getValue('received_text') != null ) {
        formData.append('received_text', store.getValue('received_text'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.mohonDistributionItemReceived}/${id}`,
          data: formData
        })
        .then( response => {
          console.log(response)

          // set MohonIndex listener to true
          store.setValue('refresh', true)

          // Add a delay of 1 second before closing
          setTimeout(() => {
            setIsLoading(false)
            handleCloseClick();
          }, 500);
        })
        .catch( error => {
          console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )
          }
        })
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
            <h5>Nota dari Admin</h5>
            <InputTextarea
              fieldName='description' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-info'
              rows='3'
              isLoading={'true'}
            />
            <br />
            <h5>Nota penerimaan</h5>
            <InputTextarea
              fieldName='received_text' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-pencil'
              rows='6'
              isLoading={isLoading}
            />

          </Modal.Body>
          
          <Modal.Footer>

            {  store.getValue('received_status') == 1 ?
            <>
            Pengesahan telah dibuat pada { store.getValue('received_at')}
            </>
            :
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
            }

            {  store.getValue('received_status') == 0 &&
            <Button 
              disabled={ isLoading || store.getValue('received_status') == 1 }
              variant="outline-success" 
              onClick={handleSubmitClick}>
              Hantar
            </Button>
            }

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

