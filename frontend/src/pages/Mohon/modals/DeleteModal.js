import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function DeleteModal({id, step = 0, status }) {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      setShow(true) // show the modal
    }

    const handleCloseClick = () => {
      handleClose()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'delete');

      axios({ 
          method: 'post',
          url : `${store.submitUrl}/${id}`,
          data: formData
        })
        .then( response => {
          //console.log(response)
          setIsLoading(false)

          // set MohonIndex listener to true
          store.setValue('refresh', true)

          // Add a delay of 1 second before closing
          setTimeout(() => {
            handleCloseClick();
          }, 500);
        })
        .catch( error => {
          //console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )
          }
        })
    }
  
    return (
      <>
      <Button 
        disabled={!(step === 0 || (step === 2 && status === 'rejected'))} 
        size="sm" 
        variant="outline-danger" 
        onClick={handleShowClick}
      >
        Hapus
      </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Hapus Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h1 className='text-center mt-5 mb-5'>Hapus permohonan ?</h1>
          </Modal.Body>
          
          <Modal.Footer>
            <Button 
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>

            <Button 
              disabled={isLoading}
              variant="danger" 
              onClick={handleSubmitClick}>
              Hapus
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

