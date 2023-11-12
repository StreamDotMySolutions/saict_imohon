import {useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Row,Col, Badge,Pagination } from 'react-bootstrap'
import ShowModal from './modals/ShowModal'
import useInventoryStore from './stores/InventoryStore'

const Application = () => {
    const store = useInventoryStore()
    const [data, setData] = useState([])
    const applications = data?.data?.inventories
 
    useEffect( () => {
        axios({url: store.url})
        .then( response => {
          console.log(response)    
          setData(response)  
          useInventoryStore.setState({ refresh: false})
        })

        // Add a delay of 1 second before closing
        setTimeout(() => {
            useInventoryStore.setState({ latestId: null})
        }, 4000);
    
      },[store.refresh,store.url])

 

    return (
        <div>
            

            <Row className='bg-light border border-1 rounded p-3'>
                <Col className='col-1 fw-bold'>ID.</Col>
                <Col className='fw-bold col-5'>Vendor</Col>


            </Row>
            <hr />
            {applications?.data?.map((application,index) => (
              <Row className='mb-2'>
                <Col className='col-1'><Badge className='bg-dark'>{application.id}</Badge></Col>
                <Col className='col-5'>{application.vendor}</Col>
            
                <Col className='text-center col-3'>
                <ShowModal id={application.id} />
      
                </Col>
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
      useInventoryStore.setState({url: url})
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