import { useState, useEffect} from 'react'
import { Badge, Card, Row, Col } from 'react-bootstrap'
import { InputText } from '../modals/components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'
import JustificationModal from '../modals/JustificationModal'


export default function MohonData({id}) {

    const store = useMohonStore()
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    useEffect( () => {

      store.setValue('title', '') // set formValue
      store.setValue('user', '') // set formValue
      store.setValue('department', '') // set formValue
      store.setValue('description', '') // set formValue
      store.setValue('items', []) // set formValue
        axios({
            'method' : 'get',
            'url' : `${apiUrl}/global/mohon-requests/${id}`
        })
        .then( response => {
          //console.log(response)
          let mohon = response.data.mohon
          store.setValue('title', mohon.title) // set formValue
          store.setValue('user', mohon.user.name) // set formValue
          store.setValue('department', mohon.user.user_profile.user_department.name) // set formValue
          store.setValue('description', mohon.description) // set formValue
          store.setValue('items', mohon.mohon_items) // set formValue
        })
        .catch ( error => {
          console.warn(error)
        })
    },[id])

  
    return (
      <>
  
          <InputText 
              fieldName='user' 
              placeholder='Pemohon'  
              icon='fa-solid fa-user'
              isLoading={'true'}
            />
            <br />
            <InputText 
              fieldName='department' 
              placeholder='Jabatan'  
              icon='fa-solid fa-building'
              isLoading={'true'}
            />
            {/* <br />
            <InputText 
              fieldName='title' 
              placeholder='Tajuk permohonan'  
              icon='fa-solid fa-pencil'
              isLoading={'true'}
            />
            <br />
            <InputTextarea
              fieldName='description' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-question'
              rows='6'
              isLoading={'true'}
            />
            <br /> */}
            <br />
            <h5>Maklumat Peralatan ( {store.getValue('items')?.length ?? 0} unit )</h5>
            <Row className='g-2 mt-0'>
                {store.getValue('items')?.map((item, index) => (
                    <Col xs={12} md={6} lg={4} key={index}>
                        <Card className='h-100 shadow-sm'>
                            <Card.Header className='d-flex align-items-center justify-content-between py-2'>
                                <div>
                                    <strong>{item.category?.name}</strong>
                                </div>
                                <Badge bg={item.type === 'new' ? 'success' : 'warning'} text={item.type === 'new' ? undefined : 'dark'}>
                                    {item.type === 'new' ? 'Baharu' : 'Ganti'}
                                </Badge>
                            </Card.Header>
                            <Card.Body className='py-2 px-3'>
                                <InfoRow label='Penerima' value={item.name} />
                                <InfoRow label='Jawatan' value={item.occupation} />
                                <InfoRow label='No. Telefon' value={item.mobile} />
                                <InfoRow label='Bangunan' value={item.building_name} />
                                <InfoRow label='Tingkat' value={item.building_level} />
                                <InfoRow label='Lokasi' value={item.location} />
                            </Card.Body>
                            {item.description && (
                                <Card.Footer className='py-2 text-end'>
                                    <JustificationModal message={item.description} />
                                </Card.Footer>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
       
      </>
    );
  }

const InfoRow = ({ label, value }) => (
    <div className='d-flex justify-content-between mb-1' style={{ fontSize: '0.85rem' }}>
        <span className='text-muted'>{label}</span>
        <span className='fw-semibold text-end ms-2'>{value ?? '-'}</span>
    </div>
);