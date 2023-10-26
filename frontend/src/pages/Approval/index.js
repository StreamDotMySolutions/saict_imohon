import {useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Row,Col, Button, ProgressBar,Modal, Badge,Pagination } from 'react-bootstrap'
import CreateModal from './modals/CreateModal'
import ShowModal from './modals/ShowModal'
import EditModal from './modals/EditModal'
import useApplicationStore from './stores/ApplicationStore'
import DeleteModal from './modals/DeleteModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApprovalModal from './modals/ApprovalModal'

const Approval = () => {
    const store = useApplicationStore()
    const [data, setData] = useState([])
    const applications = data?.data?.applications
 
    useEffect( () => {
        axios({url: store.url,})
        .then( response => {
          console.log(response)    
          setData(response)  
          useApplicationStore.setState({ refresh: false})
        })
        .catch( error => {
          console.warn(error)
        })

        // Add a delay of 1 second before closing
        setTimeout(() => {
            useApplicationStore.setState({ latestId: null})
        }, 4000);
    
      },[store.refresh,store.url])


 

    return (
        <div>
            
            <Row className='bg-light border border-1 rounded p-3'>
                <Col className='col-1 fw-bold'>Bil.</Col>
                <Col className='fw-bold'>Tujuan</Col>
                <Col className='fw-bold'>Nama</Col>
                <Col className='fw-bold'>Jawatan</Col>
                <Col className='fw-bold'>Tarikh</Col>
                <Col className='fw-bold'>Jenis</Col>
                <Col className='fw-bold text-center'>Status</Col>
                <Col className='fw-bold text-center'>Tindakan</Col>

            </Row>
            <hr />
            {applications?.data?.map((application,index) => (
            // <Row 
            //     key={index} 
            //     className='border border-1 rounded p-3 mt-2' 
            //     //style={{ backgroundColor: 'lightyellow' }}
            //     style={{
            //         backgroundColor: store.latestId !== null && store.latestId === application.id ? 'lightyellow' : ''
            //       }}
            // >
            <Row 
                key={index} 
                className='rounded p-3 mt-2' 
                style={{
                  backgroundColor: store.latestId !== null && store.latestId === application.id ? 'lightyellow' : '',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('border', 'border-1', 'bg-light');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('border', 'border-1', 'bg-light');
                }}
              >

                <Col className='col-1'><Badge className='bg-dark'>{application.id}</Badge></Col>
                <Col>{application.description}</Col>
                <Col>{application.user.user_profile.name}</Col>
                <Col>{application.user.user_profile.occupation}</Col>
                <Col>24/10/23</Col>
                <Col>Baharu</Col>
                <Col>
                { application?.application_approval_by_manager?.status === 'pending' && 
                   <Button size={'sm'} variant={'warning'}>MENUNGGU</Button>
                }

                { application?.application_approval_by_manager?.status === 'approved' && 
                   <Button size={'sm'} variant={'success'}>LULUS</Button>
                }

                { application?.application_approval_by_manager?.status === 'rejected' && 
                   <Button size={'sm'} variant={'danger'}>GAGAL</Button>
                }

                { !application?.application_approval_by_manager?.status && 
                   <Button size={'sm'} variant={'warning'}>MENUNGGU</Button>
                }
               
  
                </Col>
                <Col className='text-center'>
                  <ApprovalModal id={application.id} label={<FontAwesomeIcon icon={'fa-solid fa-pencil'}/>} />
                  {' '}

                  {/* <ShowModal /> */}
                  {' '}

                  {/* <EditModal id={application.id} />
                  {' '}
                  <DeleteModal id={application.id} /> */}
                </Col>
                <Row>
                    <Col className='mt-3'>
                    { application?.application_approval_by_manager?.status === 'pending' && 

                        <>
                        <ProgressBar  variant={'warning'} style={{ 'height': '5px' }} now={0} />
                        <span className='text-muted fs-6'><Badge className='bg-warning'>STATUS</Badge>{' '}-{' '}menunggu pengesahan Ketua Jabatan</span>
                        </>
                    }
                 
                    { application?.application_approval_by_manager?.status === 'approved' && 

                        <>
                        <ProgressBar  variant={'success'} style={{ 'height': '5px' }} now={50} />
                        <span className='text-muted fs-6'><Badge className='bg-success'>STATUS</Badge>{' '}-{' '}menunggu pengesahan Penyelaras</span>
                        </>
                    }

                    { application?.application_approval_by_manager?.status === 'rejected' && 

                      <>
                      <ProgressBar  variant={'danger'} style={{ 'height': '5px' }} now={100} />
                      <span className='text-muted fs-6'><Badge className='bg-danger'>STATUS</Badge>{' '}-{' '}permohonan ditolak oleh Ketua Jabatan</span>
                      </>
                    }
                    </Col>
                </Row>
            </Row>
            ))}

            
            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <PaginatorLink items={applications} />
                </div>
            </div>
        </div>

     
    );
};
export default Approval;

/**
 * Paginator Links
 */
function PaginatorLink ({items}){
    //console.log(items.links)
    const handlePaginationClick = (url) => {
      //console.log(url)
      useApplicationStore.setState({url: url})
    }
    const links = items?.links?.map( (page,index) => 
        
      <Pagination.Item
          key={index} 
          active={page.active}
          disabled={page.url === null}
          onClick={() => handlePaginationClick(page.url)}
          >
              <span dangerouslySetInnerHTML={{__html: page.label}} />
      </Pagination.Item>
    )
  
    return  (
      <Pagination className='mt-3'>
      {links}
      </Pagination>
    )
}
  
