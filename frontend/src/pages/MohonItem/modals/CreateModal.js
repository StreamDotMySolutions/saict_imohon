import { useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea, InputSelect } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function CreateModal() {

    const store = useMohonStore()
    const errors = store.errors
    const { mohonRequestId } = useParams()

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const types = [
      { id: 'new', name: 'Baharu' },
      { id: 'replacement', name: 'Ganti' }
    ];

    const handleShowClick = () =>{
      // get item categories from /mohon-items/categories
      axios({
        'method' : 'get',
        'url' : `${store.submitUrl}/categories`
      })
      .then( response => {
        console.log(response.data.categories)
        setCategories(response.data.categories)
      })

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
            <Modal.Title>Item {mohonRequestId}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <InputSelect 
                  fieldName='category_id' 
                  options = {categories}
                  placeholder='Sila Pilih Peralatan'  
                  icon='fa-solid fa-computer'
                  isLoading={isLoading}
                />
              </Col>
              <Col>
                <InputSelect 
                  fieldName='type' 
                  options = {types}
                  placeholder='Sila Pilih Jenis'  
                  icon='fa-solid fa-info'
                  isLoading={isLoading}
                />
              </Col>
            </Row>
            <br />
            <InputTextarea
              fieldName='description' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-pencil'
              rows='6'
              isLoading={isLoading}
            />
            <br />
           
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

