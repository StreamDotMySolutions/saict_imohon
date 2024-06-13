import { useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea, InputSelect, InputSelectRecursive } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'
import HtmlForm from './HtmlForm'

export default function CreateModal() {

    const store = useMohonStore()
    const errors = store.errors
    const { mohonRequestId } = useParams()

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [departments, setDepartments] = useState([])
  
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
        store.setValue('categories', response.data.categories)
      })

      // get departments
      axios({
        'method' : 'get',
        'url' : `${store.departmentUrl}`
      })
      .then( response => {
        //console.log(response.data)
        setDepartments(response.data.user_departments)
        store.setValue('departments', response.data.user_departments)
        //setCategories(response.data.categories)
      })

      store.emptyData() // empty store data
      setShow(true)
    } 

    //console.log(departments)

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

      // department_id
      if (store.getValue('department_id') != null ) {
        formData.append('department_id', store.getValue('department_id'));
      }

      // building_name
      if (store.getValue('building_name') != null ) {
        formData.append('building_name', store.getValue('building_name'));
      }

      // building_level
      if (store.getValue('building_level') != null ) {
        formData.append('building_level', store.getValue('building_level'));
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

    

    const  RecursiveDropdown = ({ data, selected, depth = 0 }) => {
      const indent = '_ _'.repeat(depth);
      
      return (
        <>
          {data.map((item,index) => (
            <>
         
            {/* <option className={item.parent_id === null ? 'text-uppercase fw-bold' : ' text-uppercase'} key={index} value={item.id}> */}
            <option
              value={item.id}
              className={item.parent_id === null ? 'text-uppercase fw-bold' : 'text-uppercase'}
              key={index}
              disabled={item.parent_id === null}
              selected={selected == item.id} // Check if this item is selected
               >
              {depth != 0 && 'I'}{indent}{' '}{item.name}
            </option>
            <RecursiveDropdown data={item.children} selected={selected} depth={depth + 1} />
            </>
          ))}
    
      </>
      );
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
            <HtmlForm />
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

 
