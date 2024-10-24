import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { Navigate} from 'react-router-dom'
import { InputText, InputTextarea, InputSelect } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function CreateModal() {

    const store = useMohonStore()
    const errors = store.errors

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mohonId, setMohonId] = useState('')
    const [categories, setCategories] = useState([])
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      store.emptyData() // empty store data
        // get item categories from /mohon-items/categories
        // axios({
        //   'method' : 'get',
        //   'url' : `${store.categoriesUrl}`
        // })
        // .then( response => {
        //   console.log(response.data.categories)
        //   setCategories(response.data.categories)
        // })
  
      setShow(true)
    } 

    const handleCloseClick = () => {
      handleClose()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // title
      // if (store.getValue('title') != null ) {
      //   formData.append('title', store.getValue('title'));
      // }

      // // description
      // if (store.getValue('description') != null ) {
      //   formData.append('description', store.getValue('description'));
      // }

      axios({ 
          method: 'post',
          url: store.submitUrl,
          data: formData
        })
        .then( response => {
          //console.log(response.data)
          // redirect to mohon-items
          store.setValue('mohonId', response.data?.id)
          // set MohonIndex listener to true
          store.setValue('refresh', true)

          // Add a delay of 1 second before closing
          setTimeout( () => {
            setIsLoading(false)

            // close the modal
            //handleCloseClick()
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

    // redirect to store-items
    if( store.getValue('mohonId') !== null ) {
      const mohonId = store.getValue('mohonId')
      //console.log(mohonId)
      store.emptyData()
      //return <Navigate to={`/mohon/${mohonId}`} replace /> // this is to MohonShow
      return <Navigate to={`/mohon-items/${mohonId}`} replace /> // this is to MohonItem
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShowClick}>
          Tambah
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <h1 className='text-center mt-5 mb-5'>Cipta permohonan baharu ?</h1>
            {/* <InputText 
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
            /> */}

         
          </Modal.Body>
          
          <Modal.Footer>
            {/* <Button 
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button> */}

            <Button 
              disabled={isLoading}
              variant="danger" 
              onClick={handleCloseClick}>
              Tidak
            </Button>

            <Button 
              disabled={isLoading}
              variant="success" 
              onClick={handleSubmitClick}>
              Cipta
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

