import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import DynamicInputForm from './components/DynamicInputForm'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function CreateModal() {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
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
          url: store.url,
          data: formData
        })
        .then( response => {
          //console.log(response)
          // set MohonIndex listener to true
          store.setValue('refresh', true)

          // Add a delay of 1 second before closing
          setTimeout(() => {
            setIsLoading(false)
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
        <Button variant="primary" onClick={handleShowClick}>
          Tambah
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>Item</Modal.Title>
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
            <br />
            {/* <Row>
              <Col xs={6}>
                <InputText 
                  fieldName='item_number' 
                  placeholder='Jenis'  
                  icon='fa-solid fa-computer'
                  isLoading={isLoading}
                />
              </Col>
              <Col xs={3}>
                <InputText 
                  fieldName='item_number' 
                  placeholder='Jumlah'  
                  icon='fa-solid fa-calculator'
                  isLoading={isLoading}
                />
              </Col>
            </Row> */}

            {/* <br />
            <DynamicInputForm /> */}

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

