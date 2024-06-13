import { useState, useEffect} from 'react'
import {  Row,Col,Button,Modal} from 'react-bootstrap'
import { InputText, InputTextarea, InputSelect } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'
import HtmlForm from './HtmlForm'

export default function ViewModal({id, step}) {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [departments, setDepartments] = useState([])

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
        //setCategories(response.data.categories)
        store.setValue('categories', response.data.categories)
      })

      
      // get departments
      axios({
        'method' : 'get',
        'url' : `${store.departmentUrl}`
      })
      .then( response => {
        //console.log(response.data)
        //setDepartments(response.data.user_departments)
        store.setValue('departments', response.data.user_departments)
        //setCategories(response.data.categories)
      })

      //console.log( `${store.submitUrl}/show/${id}`)
      axios({
          'method' : 'get',
          'url' : `${store.submitUrl}/show/${id}`
      })
      .then( response => {
        //console.log(response.data)
        let item = response.data.item
        store.setValue('category_id',  item.category_id) // set formValue
        store.setValue('type', item.type) // set formValue
        store.setValue('name', item.name) // set formValue
        store.setValue('occupation', item.occupation) // set formValue
        store.setValue('department_id', item.department_id) // set formValue
        store.setValue('building_name', item.building_name) // set formValue
        store.setValue('building_level', item.building_level) // set formValue
        //store.setValue('department', item.department) // set formValue
        //store.setValue('section', item.section) // set formValue
        //store.setValue('unit', item.unit) // set formValue
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

    // const handleSubmitClick = () => {
    //   setIsLoading(true)
    //   const formData = new FormData()

    //   // category_id
    //   if (store.getValue('category_id') != null ) {
    //     formData.append('category_id', store.getValue('category_id'));
    //   }

    //   // type
    //   if (store.getValue('type') != null ) {
    //     formData.append('type', store.getValue('type'));
    //   }

    //   // name
    //   if (store.getValue('name') != null ) {
    //     formData.append('name', store.getValue('name'));
    //   }

    //   // occupation
    //   if (store.getValue('occupation') != null ) {
    //     formData.append('occupation', store.getValue('occupation'));
    //   }

    //   // department
    //   if (store.getValue('department') != null ) {
    //     formData.append('department', store.getValue('department'));
    //   }

    //   // section
    //   // if (store.getValue('section') != null ) {
    //   //   formData.append('section', store.getValue('section'));
    //   // }

    //   // unit
    //   // if (store.getValue('unit') != null ) {
    //   //   formData.append('unit', store.getValue('unit'));
    //   // }

    //   // mobile
    //   if (store.getValue('mobile') != null ) {
    //     formData.append('mobile', store.getValue('mobile'));
    //   }

    //   // description
    //   if (store.getValue('description') != null ) {
    //     formData.append('description', store.getValue('description'));
    //   }

    //   // location
    //   if (store.getValue('location') != null ) {
    //     formData.append('location', store.getValue('location'));
    //   }

    //   // department_id
    //   if (store.getValue('department_id') != null ) {
    //     formData.append('department_id', store.getValue('department_id'));
    //   }

    //   // building_name
    //   if (store.getValue('building_name') != null ) {
    //     formData.append('building_name', store.getValue('building_name'));
    //   }

    //   // building_level
    //   if (store.getValue('building_level') != null ) {
    //     formData.append('building_level', store.getValue('building_level'));
    //   }

    //   // method PUT ( to simulate PUT in Laravel )
    //   formData.append('_method', 'put');
      
    //   axios({ 
    //       method: 'post',
    //       url : `${store.submitUrl}/${id}`,
    //       data: formData
    //     })
    //     .then( response => {
    //       //console.log(response)

    //       // set MohonIndex listener to true
    //       store.setValue('refresh', true)

    //       // Add a delay of 1 second before closing
    //       setTimeout(() => {
    //         setIsLoading(false)
    //         handleCloseClick();
    //       }, 500);
    //     })
    //     .catch( error => {
    //       //console.warn(error)
    //       setIsLoading(false)
    //       if(error.response.status === 422){
    //         store.setValue('errors',  error.response.data.errors )
    //       }
    //     })
    // }
  
    return (
      <>

        <Button size={'sm'} variant="outline-info" onClick={handleShowClick}>
          Lihat 
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <HtmlForm isLoading={'true'}/> 
          </Modal.Body>
          
          <Modal.Footer>
            <Button 
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>


          </Modal.Footer>
        </Modal>
      </>
    )
}



