import { useState} from 'react'
import {Button,Modal,Form, Col} from 'react-bootstrap'
import axios from '../../../../libs/axios'
import useMohonStore from '../store'


export default function StatusModal({id}) {

    const store = useMohonStore()
    const errors = store.getValue('errors')
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      //console.log(id)
      //console.log( `${store.submitUrl}/${id}`)
      axios({
            'method' : 'get',
            'url' : `${store.submitUrl}/${id}`
      })
      .then( response => {

          let mohon = response.data.mohon      
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

    const handleApproveClick = () => {
      store.setValue('status', 'approved')
      handleSubmitClick()
    }

    const handleRejectClick = () => {
      store.setValue('status', 'rejected')
      handleSubmitClick()
    }

    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // status
      if (store.getValue('status') != null ) {
        formData.append('status', store.getValue('status'));
      }

      //formData.append('message', 'Admin proses permohonan');
      // message
      if (store.getValue('message') !== null ) {
        formData.append('message', store.getValue('message'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.adminApprovalUrl}/${id}`, // role = admin approve mohon to step = 3 && status = approved || rejected
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
          console.warn(error)
          setIsLoading(false)
          if(error.response.status === 422){
            store.setValue('errors',  error.response.data.errors )
          }
        })
    }

    return (
      <>
        <Button size="sm" variant="warning" onClick={handleShowClick}>
          Status
        </Button>
  
        <Modal size={'xl'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Col className="text-center p-3"> 
              <h1>Setkan status permohonan</h1>
              Status terkini : BUKA
            </Col>
           
          </Modal.Body>
          
          <Modal.Footer>

            
            <Form.Check
              className='me-4'
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              //checked={step !== requiredStep }
              disabled={isLoading}
              label="Saya mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useMohonStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />

            <Button 
              disabled={ isLoading }
              variant="warning" 
              onClick={handleApproveClick}>
              BUKA
            </Button>

            <Button 
              disabled={ isLoading }
              variant="success" 
              onClick={handleRejectClick}>
              TUTUP
            </Button>
          
            {/* <Button 
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
}

