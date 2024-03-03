import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { Link, useParams,Navigate } from 'react-router-dom'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function CreateModal() {
  
    const { mohonRequestId } = useParams()
    const store = useMohonStore()
    const errors = store.errors
    

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [redirectId, setRedirectId] = useState(null)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      store.emptyData() // empty store data
      setShow(true)
    } 

    const handleCloseClick = () => {
      handleClose()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      setRedirectId(null)
      const formData = new FormData()

      // title
      if (store.getValue('title') != null ) {
        formData.append('title', store.getValue('title'));
      }

      // description
      if (store.getValue('description') != null ) {
        formData.append('description', store.getValue('description'));
      }

      axios({ 
          method: 'post',
          url: `${store.createUrl}/${mohonRequestId}`,
          data: formData
        })
        .then( response => {
          //console.log(response.data.id)
          // set MohonIndex listener to true
          store.setValue('refresh', true)
          store.setValue('mohonDistributionRequestId', response.data?.id)
          setRedirectId(response.data?.id)
          handleCloseClick()
          // Add a delay of 1 second before closing
          // setTimeout(() => {
          //   setIsLoading(false)
          //   handleCloseClick();
          // }, 500);
        })
        .catch( error => {
          //console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )
          }
        })
    }

    // redirect to store-items
    if( redirectId) {
      console.log('hello')
      console.log(redirectId)
      return <Navigate to={`/mohon-distribution-items/${redirectId}`} replace />
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShowClick}>
          Tambah
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>Permohonan Agihan</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputText 
              fieldName='title' 
              placeholder='Tajuk permohonan'  
              icon='fa-solid fa-pencil'
              isLoading={isLoading}
            />
            <br />
            <InputTextarea
              fieldName='description' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-question'
              rows='6'
              isLoading={isLoading}
            />
           

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
              variant="primary" 
              onClick={handleSubmitClick}>
              Hantar
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

