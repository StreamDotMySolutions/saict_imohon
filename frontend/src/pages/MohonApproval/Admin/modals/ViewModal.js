import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, Table, Badge} from 'react-bootstrap'
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
    const requiredStep  = 3 // Step 3 ( Admin )
    const [approval, setApproval] = useState('') 

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
          console.log(response.data)
          let mohon = response.data.mohon
          //store.setValue('title', mohon.title) // set formValue
          //store.setValue('description', mohon.description) // set formValue
          setApproval(mohon.mohon_approval)
          setItems(mohon.mohon_items)
          setStep(mohon.mohon_approval.step)

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
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // status
      if (store.getValue('status') != null ) {
        formData.append('status', store.getValue('status'));
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
        <Button size="sm" variant="outline-info" onClick={handleShowClick}>
          Pengesahan Mohon
        </Button>
  
        <Modal size={'xl'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{id}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <MohonData id={id} />
          </Modal.Body>
          
          <Modal.Footer>

            {approval?.step === 4 && approval?.status === 'approved' ? 
            
            <Badge>Telah oleh disahkan  {approval?.user?.name} pada {approval?.created_at} </Badge>

            :
            <>
            <Form.Check
              className='me-4'
              isInvalid={errors?.hasOwnProperty('acknowledge')}
              reverse
              //checked={step !== requiredStep }
              disabled={step !== requiredStep }
              label="Saya mengesahkan telah memeriksa permohonan ini"
              type="checkbox"
              onClick={ () => useMohonStore.setState({errors:null}) }
              onChange={ (e) => store.setValue('acknowledge', true) }
            />

            <Button 
              disabled={ isLoading || step !== requiredStep}
              variant="success" 
              onClick={handleApproveClick}>
              Lulus
            </Button>

            <Button 
              disabled={ isLoading || step !== requiredStep}
              variant="danger" 
              onClick={handleRejectClick}>
              Gagal
            </Button>
            </>

            }

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

