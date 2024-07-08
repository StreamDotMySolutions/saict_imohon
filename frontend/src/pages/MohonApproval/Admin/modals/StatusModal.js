import { useState} from 'react'
import {Button,Modal,Form, Col} from 'react-bootstrap'
import axios from '../../../../libs/axios'
import useMohonStore from '../store'


export default function StatusModal({mohonRequestId}) {

    //console.log(mohonRequestId)
    const store = useMohonStore()
    const base_url = process.env.REACT_APP_BACKEND_URL
    const errors = store.getValue('errors')
    const [show, setShow] = useState(false)
    const [ticketStatus, setTicketStatus] = useState('')
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
            'url' : `${base_url}/mohon/ticket/${mohonRequestId}` // get ticket status
      })
      .then( response => {
          //console.log(response)
          let mohon = response.data.mohon  
          //setTicketStatus(mohon.ticket_status)    
          store.setValue('ticket_status', mohon.ticket_status )
          setIsLoading(false)
      })
        .catch ( error => {
          console.warn(error)
          setIsLoading(false)
      })

        setShow(true) // show the modal
    }

    const handleCloseClick = () => {
      store.emptyData()
      handleClose()
    }


    const handleSubmitClick = () => {
      setIsLoading(true)
      const formData = new FormData()

      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // ticket status
      if (store.getValue('ticket_status') != null ) {
        formData.append('ticket_status', store.getValue('ticket_status')); // should be close or open
      } else {
        formData.append('ticket_status', ticketStatus); // else Open
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          //url : `${store.adminApprovalUrl}/${mohonRequestId}`, // role = admin approve mohon to step = 3 && status = approved || rejected
          url : `${base_url}/mohon/ticket/${mohonRequestId}`,
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
            <Modal.Title><span className="badge bg-primary">{mohonRequestId}</span> Kemaskini Status Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Col className="p-3"> 
              <h1>Status permohonan : {ticketStatus}</h1>
              <Form.Group className='col-1'>
                <Form.Check 
                  type="radio"
                  name="ticket_status"
                  value="false"
                  label="Tutup"
                  id="close-status"
                  checked={store.getValue('ticket_status') === 'close'}
                  onChange={ (e) => store.setValue('ticket_status', 'close') }
                />
                <Form.Check 
                  type="radio"
                  name="ticket_status"
                  value="true"
                  label="Buka"
                  id="open-status"
                  checked={store.getValue('ticket_status') === 'open'}
                  onChange={ (e) => store.setValue('ticket_status', 'open') }
                />
              </Form.Group>
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
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>


            <Button 
              disabled={ isLoading }
              variant="primary" 
              onClick={handleSubmitClick}>
              KEMASKINI
            </Button>
          
   
          </Modal.Footer>
        </Modal>
      </>
    );
}

