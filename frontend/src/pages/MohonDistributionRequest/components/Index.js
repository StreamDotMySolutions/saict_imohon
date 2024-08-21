import React, { useState, useEffect} from 'react'
import { Table,Pagination, Button } from 'react-bootstrap'
import useStore from '../store'
import axios from '../../../libs/axios'
import EditModal from '../modals/EditModal'
import DeleteModal from '../modals/DeleteModal'
import ViewModal from '../modals/ViewModal'
import CreateModal from '../modals/CreateModal'
import { Link, useParams } from 'react-router-dom'
import ApprovalModal from '../modals/ApprovalModal'
import { AgihanApprovalStatus } from '../../../components/global/AgihanApproval'
import DeliveryDateModal from '../modals/DeliveryDateModal'

const Index = () => {
    const { mohonRequestId } = useParams()
    const store = useStore()
    const [mohons, setMohons] = useState([])

    useEffect( () => 
        {
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: `${store.url}/${mohonRequestId}` // eg GET http://localhost:8000/api/mohon-distributions/index
                } 
            )
            .then( response => { // response block
                console.log(response.data)   // output to console  
                //console.log(`${store.url}/${mohonRequestId}`)
                setMohons(response.data.mohons) // assign data to const = mohons
                store.setValue('refresh', false ) // set MohonIndex listener back to FALSE
            })
            .catch( error => { // error block
                console.warn(error) // output to console
            })
      },
        [
            store.getValue('refresh'), // Form action listener
            store.url // pagination listener
        ] 

    ) // useEffect()

    return (
        <div>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <CreateModal />
                </div>
            </div>


            <Table>
                <thead>
                    <tr>
                        <th style={{ 'width': '20px'}}>ID</th>
                        <th className='col-2'>Nama</th>
                        <th className='col-2'>Kad Pengenalan</th>
                    
                        <th className='text-center' >Kelulusan Agihan Terkini</th>
                        <th style={{ 'width': '50px'}}>Jumlah Peralatan</th>
                        <th className='text-center' style={{ 'width': '100px'}}>Tarikh Permohonan</th>
                        <th className='text-center 6-col'>Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {mohons?.data?.map((mohon,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{mohon.id}</span></td>
                            <td>{mohon.user?.name}</td>
                            <td>{mohon.user?.nric}</td>
                    
                            <td className='text-center'>
                              
                                <AgihanApprovalStatus step={mohon?.mohon_distribution_approval?.step} currentStatus={mohon?.mohon_distribution_approval?.status} />
                            </td>
                            <td className='text-center'>{mohon.mohon_distribution_items_count}</td>
                            <td className='text-center'>{mohon.created_at}</td>
                            <td className='text-center'>
                                
                         
                                { ' '}
                                {/* <ApprovalModal id={mohon.id} count={mohon.mohon_distribution_items_count} step={mohon.mohon_distribution_approval.step}/>
                                {' '} */}
                                <Link to={`/mohon-distribution-items/${mohon.id}`}>
                                    <Button size='sm' variant='outline-dark'>Peralatan</Button>
                                </Link>
                                {/* {' '}
                                <EditModal id={mohon.id} step={mohon.mohon_distribution_approval?.step}/> */}
                                {' '}
                                <DeleteModal id={mohon.id} step={mohon.mohon_distribution_approval?.step} />
                                {' '}
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <PaginatorLink items={mohons} />
                </div>
            </div>
        </div>
    );
};
export default Index;


/**
 * Paginator Links
 */
function PaginatorLink ({items}){
    //console.log(items.links)
    const handlePaginationClick = (url) => {
      //console.log(url)
      useStore.setState({url: url}) // update the url state in store
      
    }

    // extract the data from Laravel Paginator JSON
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