import {useEffect, useState } from 'react'
import axios from '../../../libs/axios'
import { Row,Col, Button, Badge,Pagination } from 'react-bootstrap'
import useApplicationStore from '../stores/ApplicationStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApplicationStatus from '../modals/components/ApplicationStatus'
import ApplicationProgress from '../modals/components/ApplicationProgress'
import AdminApprovalModal from '../modals/AdminApprovalModal'
import ShowModal from '../../Application/modals/ShowModal'

const Applications = ({status}) => {
    const store = useApplicationStore()
    const [data, setData] = useState([])
    const applications = data?.data?.applications
 
    useEffect( () => {
        axios({url: `${store.url}&status=${status}`})
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
                <Col className='fw-bold'>Peralatan</Col>
                <Col className='col-1'></Col>
                <Col className='fw-bold'>Nama</Col>
                <Col className='fw-bold'>Jawatan</Col>
                <Col className='fw-bold'>Tarikh</Col>
                <Col className='fw-bold'>Jenis</Col>
                <Col className='fw-bold text-center'>Status</Col>
                <Col className='fw-bold text-center'>Tindakan</Col>

            </Row>
            <hr />
            {applications?.data?.map((application,index) => (<>
            <Row key={application.id}>
              <Row className='col-3 bg-light mt-3 rounded p-1 fw-bold fs-6 text-muted'>
                <Col xs={1}><FontAwesomeIcon icon={'fa-solid fa-home'}/></Col>
                <Col>{application.user.user_profile.user_department.name.toUpperCase()}</Col>
              </Row>
              <Row 
                className='rounded p-3 mt-0 bg-light' 
                style={{
                  backgroundColor: store.latestId !== null && store.latestId === application.id ? 'lightyellow' : '',
                }}
                // onMouseEnter={(e) => {
                //   e.currentTarget.classList.add('border', 'border-1');
                // }}
                // onMouseLeave={(e) => {
                //   e.currentTarget.classList.remove('border', 'border-1');
                // }}
              >

                <Col className='col-1'><Badge className='bg-dark'>{application.id}</Badge></Col>
                <Col>
                <Row>
                    <Item label='PC' value={application?.application_item?.pc} />
                    <Item label='NB' value={application?.application_item?.nb} />
                    <Item label='PBWN' value={application?.application_item?.pbwn} />
                    <Item label='PCN' value={application?.application_item?.pcn} />
                  </Row>
                </Col>
                <Col className='col-1'></Col>
                <Col>{application.user.user_profile.name}</Col>
                <Col>{application.user.user_profile.occupation}</Col>
                <Col>{application.created_at_formatted}</Col>
                <Col>{application.type === 'new' ? 'BARU' : 'GANTI'}</Col>
                <Col>
                  <ApplicationStatus status={application?.application_approval_by_admin?.status} />
                </Col>
                <Col className='text-center'>
                  <ShowModal id={application.id} />
                  {' '}
                  <AdminApprovalModal editable={application?.admin_editable} id={application.id} label={<FontAwesomeIcon icon={'fa-solid fa-pencil'}/>} />
                </Col>
                <ApplicationProgress status={application?.application_approval?.status} step={application?.application_approval?.step}/>
              </Row>
            </Row>
            </> ))}

            
            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <PaginatorLink items={applications} />
                </div>
            </div>
        </div>

     
    );
};
export default Applications;

function Item({label,value}){
  return (<>

    {value !== 0 &&
      <button type="button" className="btn btn-sm btn-light border border-secondary mb-1">
      {label} <span className="badge bg-secondary float-end">
        {value}
      </span>
    </button>
    }
  </>)
}

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
  
