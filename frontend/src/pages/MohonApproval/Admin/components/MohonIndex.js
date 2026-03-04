import React, { useState, useEffect } from 'react'
import { Table,Pagination, Button, Badge, Form } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../../libs/axios'
import { Link } from 'react-router-dom'
import ViewModal from '../modals/ViewModal'
import { ApproverStatus } from '../../../../components/global/Approval'
//import ReportingModal from '../modals/ReportingModal'
import ReportingModal from '../../../Reporting/ReportingModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import StatusModal from '../modals/StatusModal'

const MohonIndex = ({status}) => {
    const store = useMohonStore()
    const [mohons, setMohons] = useState([])
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    useEffect( () => 
        {
            //console.log(store.url)
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: `${apiUrl}/admin/mohon-requests?status=${status}` // eg GET http://localhost:8000/api/admin/mohon-requests
                } 
            )
            .then( response => { // response block
                //console.log(store.url)
                console.log(response.data)   // output to console  
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
            <Table>
                <thead>
                    <tr>
                        <th style={{ 'width': '50px'}}>No. Rujukan</th>
                        <th style={{ 'width': '120px'}}>Nama</th>
                        <th style={{ 'width': '120px'}}>Kad Pengenalan</th>
                        <th style={{ 'width': '250px'}}>Jabatan</th>
                        {/* <th style={{ 'width': '200px'}}>Kelulusan Mohon</th> */}
                        <th className='text-center' style={{ 'width': '50px'}}>Jumlah Peralatan Dimohon</th>
                        <th className='text-center' style={{ 'width': '50px'}}>Jumlah Peralatan Diagih</th>
                        {/* <th className='text-center' style={{ 'width': '50px'}}>Status Tiket</th> */}
                        <th className='text-center' >Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {mohons?.data?.map((mohon,index) => (
                        <tr key={index}>
                            <td><small><span className="badge bg-primary">{mohon.reference_no ?? `#${mohon.id}`}</span></small></td>
                            <td>{mohon.user?.name}</td>
                            <td>{mohon.user?.nric}</td>
                            <td>{mohon.user?.user_profile?.user_department?.name}</td>
                            {/* <td className='text-center'>
                                <ApproverStatus step={mohon.mohon_approval?.step} currentStatus={mohon.mohon_approval?.status} />
                            </td> */}
                            <td className='text-center'>{mohon.mohon_items_count}</td>
                            <td className='text-center'>{mohon.mohon_distribution_items_count}</td>
                            {/* <td className='text-center'>

                                <FontAwesomeIcon icon={mohon.ticket_status === 'open' ? faLockOpen : faLock} />
                            </td> */}
                           
                            <td>
                                <div className='d-flex gap-1 justify-content-center flex-wrap'>
                                    <ReportingModal mohonRequestId={mohon.id} />
                                    <ViewModal id={mohon.id} />
                                    {mohon.mohon_approval?.step == 4 && mohon.mohon_approval?.status == 'approved' && (
                                        <Link to='/admin/agihan'>
                                            <Button size='sm' variant='outline-success'>
                                                <FontAwesomeIcon icon='fas fa-truck' className='me-1' />Agihan
                                            </Button>
                                        </Link>
                                    )}
                                </div>
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