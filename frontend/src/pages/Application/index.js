import {useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Row,Col, Button, ProgressBar,Modal, Badge,Pagination } from 'react-bootstrap'
import CreateModal from './modals/CreateModal'
import ShowModal from './modals/ShowModal'
import EditModal from './modals/EditModal'
import useApplicationStore from './stores/ApplicationStore'
import DeleteModal from './modals/DeleteModal'
import ApplicationStatus from '../Approval/modals/components/ApplicationStatus'
import ApplicationProgress from '../Approval/modals/components/ApplicationProgress'

const Application = () => {
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
            
            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <CreateModal />
                </div>
            </div>
            
            <Row className='bg-light border border-1 rounded p-3'>
                <Col className='col-1 fw-bold'>Bil.</Col>
                <Col className='fw-bold col-4'>Tujuan</Col>
                <Col className='fw-bold col-1'>Jenis</Col>
                <Col className='fw-bold col-1'>Peralatan</Col>
                <Col className='fw-bold text-center col-1'>Tarikh</Col>
                <Col className='fw-bold text-center col-1'>Status</Col>
                <Col className='col-3 fw-bold text-center'>Tindakan</Col>

            </Row>
            <hr />
            {applications?.data?.map((application,index) => (
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
                <Col className='col-4'>{application.description}</Col>
                <Col className='col-1'>{application.type === 'new' ? 'BARU' : 'GANTI'}</Col>
                <Col className='col-1'>
                  <Row>
                    <Item label='PC' value={application?.application_item?.pc} />
                    <Item label='NB' value={application?.application_item?.nb} />
                    <Item label='PBWN' value={application?.application_item?.pbwn} />
                    <Item label='PCN' value={application?.application_item?.pcn} />
                  </Row>
                </Col>

                <Col className='col-1 text-center'>{application.created_at_formatted}</Col>
                <Col className='col-1'>
                  <ApplicationStatus status={application?.application_approval?.status} />
                </Col>
                <Col className='text-center col-3'>
                <ShowModal />
                {' '}
                <EditModal editable={application.editable} id={application.id} />
                {' '}
                <DeleteModal deleteable={application.deleteable}  id={application.id} />
                </Col>
                <ApplicationProgress status={application?.application_approval?.status}  step={application?.application_approval?.step} />
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
  

export default Application;