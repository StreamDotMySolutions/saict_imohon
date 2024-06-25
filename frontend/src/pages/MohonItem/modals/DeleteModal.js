import { useState} from 'react'
import { Row, Button,Modal,Form} from 'react-bootstrap'

import axios from '../../../libs/axios'
import useMohonStore from '../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DeleteModal({id, step}) {

    const store = useMohonStore()
    const errors = store.errors

    //const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const types = [
      { id: 'new', name: 'Baharu' },
      { id: 'replacement', name: 'Ganti' }
    ];
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
        //console.log(response.data)
        let item = response.data.item
        store.setValue('category_id',  item.category_id) // set formValue
        store.setValue('type', item.type) // set formValue
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
      handleClose()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // if user check the checkbox
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

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

        })
        .catch( error => {
          console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )

          }
      
        })
    }
  
    return (
      <>
        <Button size="sm" disabled={ step !== 0 } variant="outline-danger" onClick={handleShowClick}>
          Hapus
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Hapus Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className='p-5 m-5'>
              <FontAwesomeIcon icon="fas fa-trash" className='text-danger' style={{fontSize:"50pt"}}/>
              <h4>Anda pasti ingin menghapuskan permohonan ?</h4>
              <p>Semua maklumat item akan dihapuskan</p>
            </Row>
          </Modal.Body>
          
          <Modal.Footer>
            <Form.Check
              className='me-4'
              isInvalid={store.getValue('errors')?.hasOwnProperty('acknowledge')}
              //isInvalid
              reverse
              label="Saya sahkan tindakan ini"
              type="checkbox"
              onClick={ () => store.setValue({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />

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

