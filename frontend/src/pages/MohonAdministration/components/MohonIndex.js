import React, { useState, useEffect } from 'react'
import { Table,Pagination, Button } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../libs/axios'
import EditModal from '../modals/EditModal'
import DeleteModal from '../modals/DeleteModal'
import ViewModal from '../modals/ViewModal'
import CreateModal from '../modals/CreateModal'
import { Link } from 'react-router-dom'
import ApprovalModal from '../modals/ApprovalModal'
import { ApproverStatus } from '../../../components/global/Approval'


const MohonIndex = () => {
    const store = useMohonStore()
    const [mohons, setMohons] = useState([])

    useEffect( () => 
        {
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: store.url // eg GET http://localhost:8000/api/mohon/index
                } 
            )
            .then( response => { // response block
                //console.log(response.data.mohons.data)   // output to console  

      
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

            {/* <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <CreateModal />
                </div>
            </div> */}


            <Table>
                <thead>
                    <tr>
                        <th style={{ 'width': '20px'}}>ID</th>
                        <th style={{ 'width': '120px'}}>User</th>
                        <th style={{ 'width': '200px'}}>Jabatan</th>
                        <th style={{ 'width': '400px'}}>Tajuk</th>
   
                        <th style={{ 'width': '200px'}}><small>Kelulusan Terkini</small></th>
                        <th style={{ 'width': '50px'}}>Peralatan</th>
                        <th className='text-center' style={{ 'width': '300px'}}>Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {mohons?.data?.map((mohon,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{mohon.id}</span></td>
                            <td>{mohon.user?.email}</td>
                            <td>{mohon.user?.user_profile?.user_department?.name}</td>
                            <td>{mohon.title}</td>
         
                            <td><ApproverStatus step={mohon.mohon_approval?.step} currentStatus={mohon.mohon_approval?.status} /></td>
                            <td className='text-center'>{mohon.mohon_items_count}</td>
                            <td className='text-center'>
                                {/* <ApprovalModal id={mohon.id} count={mohon.mohon_items_count} step={mohon.mohon_approval.step}/>
                                {' '} */}
                                {/* <Link to={`/mohon-items/${mohon.id}`}>
                                    <Button size='sm' variant='outline-success'>Peralatan</Button>
                                </Link> */}
                                {' '}
                                <EditModal id={mohon.id} />
                                {' '}
                                <DeleteModal id={mohon.id} />
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
export default MohonIndex;


/**
 * Paginator Links
 */
function PaginatorLink ({items}){
    //console.log(items.links)
    const handlePaginationClick = (url) => {
      //console.log(url)
      useMohonStore.setState({url: url}) // update the url state in store
      
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