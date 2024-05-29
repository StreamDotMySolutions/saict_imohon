import { useState, useEffect} from 'react'
import {  Row,Col,Button,Modal} from 'react-bootstrap'
import { InputText, InputTextarea, InputSelect } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function EditModal({id, step}) {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const types = [
      { id: 'new', name: 'Baharu' },
      { id: 'replacement', name: 'Ganti' }
    ];
  
    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      //console.log(id)

      // get item categories from /mohon-items/categories
      axios({
        'method' : 'get',
        'url' : `${store.submitUrl}/categories`
      })
      .then( response => {
        //console.log(response.data.categories)
        setCategories(response.data.categories)
      })

      //console.log( `${store.submitUrl}/show/${id}`)
      axios({
          'method' : 'get',
          'url' : `${store.submitUrl}/show/${id}`
      })
      .then( response => {
        console.log(response.data)
        let item = response.data.item
        store.setValue('category_id',  item.category_id) // set formValue
        store.setValue('type', item.type) // set formValue
        store.setValue('name', item.name) // set formValue
        store.setValue('occupation', item.occupation) // set formValue
        store.setValue('department', item.department) // set formValue
        store.setValue('section', item.section) // set formValue
        store.setValue('unit', item.unit) // set formValue
        store.setValue('mobile', item.mobile) // set formValue
        store.setValue('location', item.location) // set formValue
        store.setValue('description', item.description) // set formValue
        setIsLoading(false)
      })
      .catch ( error => {
        console.warn(error)
        setIsLoading(false)
      })

      setShow(true) // show the modal
    }
      
    const handleCloseClick = () => {
      setShow(false)
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

      // description
      if (store.getValue('description') != null ) {
        formData.append('description', store.getValue('description'));
      }

      // location
      if (store.getValue('location') != null ) {
        formData.append('location', store.getValue('location'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.submitUrl}/${id}`,
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

        <Button size={'sm'} disabled={step !== 0} variant="outline-primary" onClick={handleShowClick}>
          Edit 
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Kemaskini Permohonan </Modal.Title>
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
              Kemaskini
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    )
}



