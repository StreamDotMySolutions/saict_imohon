import { useState, useEffect} from 'react'
import { Alert,Row,Col, Card, Button, ProgressBar,Modal,Form, Table, Badge} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { InputSelect, InputText, InputTextarea } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'
import JustificationModal from './JustificationModal'

export default function RequestApprovalModal({agihanRequestId, onSuccess}) {

    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate()
    const store = useMohonStore()
    const errors = store.getValue('errors')

    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([])
    const [bosses, setBosses] = useState([])
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowClick = () =>{
      setIsLoading(true)
      store.reset() // empty store data
      //console.log(agihanRequestId)

        //console.log( `${store.submitUrl}`)
        axios({
            'method' : 'get',
            //'url' : `${store.mohonDistributionUrl}/${agihanRequestId}`
              'url' : `${apiUrl}/admin/mohon-distribution/${agihanRequestId}`
        })
        .then( response => {
          console.log(response)
          setBosses(response.data.bossUsers) // set bosses

          let mohon = response.data.mohon
          setItems(mohon.mohon_distribution_items) // set items
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


      // acknowledge
      if (store.getValue('acknowledge') != null ) {
        formData.append('acknowledge', store.getValue('acknowledge'));
      }

      // boss_id
      if (store.getValue('boss_id') != null ) {
        formData.append('boss_id', store.getValue('boss_id'));
      }

      // message
      if (store.getValue('message') != null ) {
        formData.append('message', store.getValue('message'));
      }

      // method PUT ( to simulate PUT in Laravel )
      formData.append('_method', 'post');

      axios({ 
          method: 'post',
          //url : `${store.bossApprovalUrl}/${agihanRequestId}`,
          url:  `${apiUrl}/admin/mohon-distribution-approvals/${agihanRequestId}`,
          data: formData
        })
        .then( response => {
          setIsLoading(false)
          store.setValue('refresh', true)
          setTimeout(() => {
            handleCloseClick();
            onSuccess?.();
            navigate('/admin/agihan?tab=menunggu');
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
 
        <Button variant="primary" onClick={handleShowClick}>
          Seterusnya <FontAwesomeIcon icon='fas fa-chevron-right' />
        </Button>
      
          
        <Modal size='xl' show={show} onHide={handleCloseClick} enforceFocus={false} scrollable>
          <Modal.Header closeButton>
            <Modal.Title>Mohon Agihan</Modal.Title>
          </Modal.Header>

          <Modal.Body>

          {/* ── Progress Steps ──────────────────────────────────── */}
          <div className='d-flex align-items-center mb-4'>
            {/* Step 1 — done (clickable to go back) */}
            <div
              className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
              style={{ width: 32, height: 32, backgroundColor: '#198754', cursor: 'pointer' }}
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon icon='fas fa-check' />
            </div>
            <span className='ms-2 text-muted' style={{ cursor: 'pointer' }} onClick={handleCloseClick}>Cadangan Agihan</span>

            {/* Connector 1→2 */}
            <div className='flex-grow-1 mx-3' style={{ height: 2, backgroundColor: '#198754' }} />

            {/* Step 2 — active */}
            <div
              className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
              style={{ width: 32, height: 32, backgroundColor: '#0d6efd' }}
            >
              2
            </div>
            <span className='ms-2 fw-semibold'>Hantar untuk Kelulusan</span>

            {/* Connector 2→3 */}
            <div className='flex-grow-1 mx-3' style={{ height: 2, backgroundColor: '#dee2e6' }} />

            {/* Step 3 — pending */}
            <div
              className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
              style={{ width: 32, height: 32, backgroundColor: '#6c757d' }}
            >
              3
            </div>
            <span className='ms-2 text-muted'>Kelulusan Boss</span>
          </div>

          <Col className='mb-3'>
            <h5>Maklumat Pelulus</h5>
            <InputSelect
                  fieldName='boss_id' 
                  options = {bosses}
                  placeholder='Sila Pilih Pelulus 2'  
                  icon='fa-solid fa-person'
                  isLoading={isLoading}
                />
          </Col>

          <Col className='mb-3'>
            <h5>Maklumat Agihan ( {items.length} unit )</h5>
            <Row className='g-2 mt-0'>
              {items.map((item, index) => (
                <Col xs={12} md={6} lg={4} key={index}>
                  <Card className='h-100 shadow-sm'>
                    <Card.Header className='d-flex align-items-center justify-content-between py-2'>
                      <strong>{item.category?.name}</strong>
                      <Badge bg={item.type === 'new' ? 'success' : 'warning'} text={item.type === 'new' ? undefined : 'dark'}>
                        {item.type === 'new' ? 'Baharu' : 'Ganti'}
                      </Badge>
                    </Card.Header>
                    <Card.Body className='py-2 px-3'>
                      <InfoRow label='Penerima' value={item.mohon_item?.name} />
                      <InfoRow label='Jawatan' value={item.mohon_item?.occupation} />
                      <InfoRow label='Bangunan' value={item.mohon_item?.building_name} />
                      <InfoRow label='Tingkat' value={item.mohon_item?.building_level} />
                      <InfoRow label='Lokasi' value={item.mohon_item?.location} />
                      <InfoRow label='Vendor' value={item.inventory?.vendor} />
                    </Card.Body>
                    {item.mohon_item?.description && (
                      <Card.Footer className='py-2 text-end'>
                        <JustificationModal message={item.mohon_item?.description} />
                      </Card.Footer>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
           

          <Col>
            <h5>Justifikasi</h5>
            <InputTextarea    
              fieldName="message"
              placeholder="Sila lengkapkan justifikasi agihan"
              icon="fas fa-pencil"
              rows ="3"
              isLoading={isLoading} 
            />
          </Col>
    
            
          </Modal.Body>
          
          <Modal.Footer>
            <Form.Check
                className='me-4'
                isInvalid={errors?.hasOwnProperty('acknowledge')}
                reverse
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
                <FontAwesomeIcon icon='fas fa-arrow-left' className='me-1' />
                Undur
            </Button>

            <Button 
              disabled={isLoading}
              variant="primary" 
              onClick={handleSubmitClick}>
              Mohon Agihan
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

const InfoRow = ({ label, value }) => (
  <div className='d-flex justify-content-between mb-1' style={{ fontSize: '0.85rem' }}>
    <span className='text-muted'>{label}</span>
    <span className='fw-semibold text-end ms-2'>{value ?? '-'}</span>
  </div>
)
