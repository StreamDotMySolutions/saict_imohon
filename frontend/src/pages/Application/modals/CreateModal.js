import { useState } from 'react'
import { Row,Col, Button, ProgressBar,Modal } from 'react-bootstrap'
import ApplicationForm from './components/ApplicationForm'
import axios from '../../../libs/axios'
import useApplicationStore from '../stores/ApplicationStore'

export default function CreateModal() {

    const store = useApplicationStore()
    const [show, setShow] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmitClick = () => {

        //console.log(store.description.value)
        const formData = new FormData()
        formData.append('description', store.description.value)
        axios({
            method: 'post',
            url: store.url
        })
        .then( response => {
          console.log(response)
        })
        .catch( error => {
          //console.warn(error)
          if(error.response.status === 422){
            useApplicationStore.setState({ errors :error.response.data.errors })  
          }
        })

        //handleClose()
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Mohon
        </Button>
  
        <Modal size={'lg'} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Permohonan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ApplicationForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
            <Button variant="primary" onClick={handleSubmitClick}>
              Hantar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  