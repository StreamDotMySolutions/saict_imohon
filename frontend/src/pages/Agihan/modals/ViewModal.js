import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import DynamicInputForm from './components/DynamicInputForm'
import axios from '../../../libs/axios'
import useStore from '../store'

export default function ViewModal({id}) {

    const store = useStore()
    const errors = store.errors

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
      store.emptyStore()
      handleClose()
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
              icon='fa-solid fa-question'
              rows='3'
              isLoading={'true'}
            />
            <br />
            <h5>Nota penerimaan</h5>
            <InputTextarea
              fieldName='receive_text' 
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
              //disabled={step !== requiredStep }
              label="Saya mengesahkan telah memeriksa penerimaan ini"
              type="checkbox"
              onClick={ () => useStore.setState({errors:null}) }
              //onClick={ () => store.setValue('error', null) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />

            <Button 
              //disabled={ isLoading || step !== requiredStep}
              variant="success" 
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

