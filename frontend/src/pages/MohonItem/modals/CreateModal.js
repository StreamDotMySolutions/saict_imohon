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
        //console.log(response.data.categories)
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

      // category_id
      if (store.getValue('category_id') != null ) {
        formData.append('category_id', store.getValue('category_id'));
      }

      // type
      if (store.getValue('type') != null ) {
        formData.append('type', store.getValue('type'));
      }

      // name
      if (store.getValue('name') != null ) {
        formData.append('name', store.getValue('name'));
      }

      // occupation
      if (store.getValue('occupation') != null ) {
        formData.append('occupation', store.getValue('occupation'));
      }

      // department
      if (store.getValue('department') != null ) {
        formData.append('department', store.getValue('department'));
      }      

      // section
      if (store.getValue('section') != null ) {
        formData.append('section', store.getValue('section'));
      }

      // unit
      if (store.getValue('unit') != null ) {
        formData.append('unit', store.getValue('unit'));
      }

      // mobile
      if (store.getValue('mobile') != null ) {
        formData.append('mobile', store.getValue('mobile'));
      }

      // location
      if (store.getValue('location') != null ) {
        formData.append('location', store.getValue('location'));
      }


      // description
      if (store.getValue('description') != null ) {
        formData.append('description', store.getValue('description'));
      }

      axios({ 
          method: 'post',
          url: `${store.submitUrl}/${mohonRequestId}`,
          data: formData
        })
        .then( response => {
          // console.log(response)
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
            <Modal.Title>Tambah Item</Modal.Title>
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

            <Row className='mt-3'>
              <InputText 
                fieldName='name' 
                placeholder='Nama'  
                icon='fa-solid fa-user'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='occupation' 
                placeholder='Jawatan'  
                icon='fa-solid fa-graduation-cap'
                isLoading={isLoading}
              />
            </Row>

            
            <Row className='mt-3'>
              <InputText 
                fieldName='department' 
                placeholder='Jabatan / Bahagian'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='section' 
                placeholder='Seksyen'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='unit' 
                placeholder='Unit'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='mobile' 
                placeholder='No Telefon (peribadi)'  
                icon='fa-solid fa-phone'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='location' 
                placeholder='Lokasi peralatan'  
                icon='fa-solid fa-globe'
                isLoading={isLoading}
              />
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

