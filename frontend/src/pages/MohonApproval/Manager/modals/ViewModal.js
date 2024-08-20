import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, Table, ModalBody} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../../libs/axios'
import useMohonStore from '../store'
import MohonData from '../../../Mohon/components/MohonData'

export default function ViewModal({id}) {

    const store = useMohonStore()
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([]) // MohonItems
    const [step, setStep] = useState('') // Step
    const [approvalDate, setApprovalDate] = useState('') // Message
    const requiredStep = 1 // manager

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      //console.log(id)
      //console.log( `${store.submitUrl}/${id}`)
      axios({
            'method' : 'get',
            'url' : `${store.showUrl}/${id}`
      })
      .then( response => {
          //console.log(response)
          let mohon = response.data.mohon
          //store.setValue('title', mohon.title) // set formValue
          //store.setValue('description', mohon.description) // set formValue
          setItems(mohon.mohon_items)
          setStep(mohon.mohon_approval.step)
          store.setValue('message',mohon.mohon_approval_rejected_by_user ? mohon.mohon_approval_rejected_by_user.message : mohon.mohon_approval_approved_by_user.message  ) 

          // items
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
      if (store.getValue('acknowledge') !== null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // message
      if (store.getValue('message') !== null ) {
        formData.append('message', store.getValue('message'));
      }

      // status
      if (store.getValue('status') !== null ) {
        formData.append('status', store.getValue('status'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.managerApprovalUrl}/${id}`, // role = mnager approve mohon to step = 2 && status = approved
          data: formData
        })
        .then( response => {
          //console.log(response)

          // set MohonIndex listener to true
          store.setValue('refresh', true)

          // Add a delay of 1 second before closing
          setTimeout(() => {
            store.emptyData()
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
        <Button size="sm" variant="outline-info" onClick={handleShowClick}>
          Lihat
        </Button>
  
        <Modal size={'xl'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <MohonData id={id} />
            <h5>Justifikasi</h5>

            <InputTextarea
              fieldName="message"
              placeholder="Sila lengkapkan justifikasi kelulusan"
              icon="fas fa-pencil"
              rows ="8"
              isLoading={isLoading ||  step!==1} />
          </Modal.Body>
          
          <Modal.Footer>

          {step ==1 &&
          <>
            <Form.Check
              className='me-4'
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              //checked={step !== 1}
              disabled={step !== 1}
              label="Saya mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useMohonStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />


            <Button 
              disabled={ isLoading || step !== 1}
              variant="success" 
              onClick={handleApproveClick}>
              Lulus
            </Button>

            <Button 
              disabled={ isLoading || step !== 1}
              variant="danger" 
              onClick={handleRejectClick}>
              Gagal
            </Button>

          </>}

            <Button 
              disabled={isLoading}
              variant="secondary" 
              onClick={handleCloseClick}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

