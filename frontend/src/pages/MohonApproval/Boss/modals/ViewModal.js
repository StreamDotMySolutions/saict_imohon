import { useState, useEffect} from 'react'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form, Table, Badge} from 'react-bootstrap'
import { InputText, InputTextarea } from './components/Inputs'
import axios from '../../../../libs/axios'
import useMohonStore from '../store'
import MohonData from '../../../Reporting/show'
import ShowForBoss from '../../../Reporting/ShowForBoss'

export default function ViewModal({mohonDistributionRequestId, mohonRequestId}) {

    const base_url = process.env.REACT_APP_BACKEND_URL
    const store = useMohonStore()
    const errors = store.getValue('errors')

    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [approval, setApproval] = useState() // MohonDistributionApproval

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.emptyData() // empty store data
      setShow(true) // show the modal
      axios({
        'method' : 'get',
        'url' : `${base_url}/mohon-distribution/${mohonDistributionRequestId}` //mohon distribution request
        })
        .then( response => {
            //console.log(response.data)
            let mohon = response.data.mohon
            setApproval(mohon.mohon_distribution_approval)

            let approved = mohon.mohon_distribution_approval_approved_by_user
            let rejected = mohon.mohon_distribution_approval_approved_by_user
            store.setValue('message', approved ? approved.message : rejected.message)
            //console.log(approval)
            // items
           
        })
        .catch ( error => {
            console.warn(error)
           
        })
        .finally( setIsLoading(false) )
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

      // ackknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // status
      if (store.getValue('status') != null ) {
        formData.append('status', store.getValue('status'));
      }

      // message
      if (store.getValue('message') != null ) {
        formData.append('message', store.getValue('message'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'put');
      
      axios({ 
          method: 'post',
          url : `${store.bossApprovalUrl}/${mohonDistributionRequestId}`, // role = boss to approve agihan && status = approved || rejected
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
        <Button size="sm" variant="outline-primary" onClick={handleShowClick}>
          Lihat 
        </Button>
  
        <Modal size={'xl'} show={show} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title><span className="badge bg-primary">{mohonDistributionRequestId}</span> Lihat Permohonan </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* <MohonData mohonRequestId={mohonRequestId} /> */}
            <ShowForBoss mohonRequestId={mohonRequestId} />
            <InputTextarea
              fieldName="message"
              placeholder="Sila lengkapkan justifikasi kelulusan"
              icon="fas fa-pencil"
              rows ="8"
              isLoading={isLoading || approval?.step == 2 } />
          </Modal.Body>
          
          <Modal.Footer>

          {approval?.step == 2  ? 
            
            <Badge>Telah oleh disahkan pada {approval?.created_at}</Badge>
            :
            <>
            <Form.Check
                className='me-4'
                isInvalid={errors?.hasOwnProperty('acknowledge')}
                reverse
                disabled={isLoading}
                //disabled={step !== requiredStep }
                label="Saya mengesahkan telah memeriksa permohonan ini"
                type="checkbox"
                onClick={ () => useMohonStore.setState({errors:null}) }
                onChange={ (e) => store.setValue('acknowledge', true) }
              />
            <Button 
                //disabled={ isLoading || step !== 3}
                disabled={isLoading}
                variant="success" 
                onClick={handleApproveClick}>
                Lulus
              </Button>

              <Button 
                //disabled={ isLoading || step !== 3}
                disabled={isLoading}
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

