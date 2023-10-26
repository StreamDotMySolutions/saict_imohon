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
          //console.log(response)    
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
                <Col className='fw-bold'>Tujuan</Col>
                <Col className='fw-bold'>Tarikh</Col>
                <Col className='fw-bold'>Jenis</Col>
                <Col className='fw-bold text-center'>Status</Col>
                <Col className='fw-bold text-center'>Tindakan</Col>

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
                <Col>{application.description}</Col>
                <Col>24/10/23</Col>
                <Col>Baharu</Col>
                <Col>
                  <ApplicationStatus status={application?.application_approval_by_manager?.status} />
                </Col>
                <Col className='text-center'>
                <ShowModal />
                {' '}
                <EditModal id={application.id} />
                {' '}
                <DeleteModal id={application.id} />
                </Col>
                <ApplicationProgress status={application?.application_approval_by_manager?.status} />
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