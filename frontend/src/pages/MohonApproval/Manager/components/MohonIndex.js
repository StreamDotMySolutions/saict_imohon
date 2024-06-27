import React, { useState, useEffect } from 'react'
import { Table,Pagination,Badge } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../../libs/axios'
import ViewModal from '../modals/ViewModal'

const MohonIndex = ({status}) => {
    const store = useMohonStore()
    const [mohons, setMohons] = useState([])

    useEffect( () => 
        {
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: `${store.url}/?status=${status}` // eg GET http://localhost:8000/api/mohon/index
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

            <Table>
                <thead>
                    <tr>
                        {/* <th style={{ 'width': '20px'}}>No.</th> */}
                        <th style={{ 'width': '120px'}}>Nama</th>
                        <th style={{ 'width': '120px'}}>Kad Pengenalan</th>
                        <th className="text-center" style={{ 'width': '100px'}}>Status Kelulusan</th>
                        {/* <th className='text-center' style={{ 'width': '300px'}}>Kelulusan Terkini</th> */}
                        <th className="text-center" style={{ 'width': '50px'}}>Jumlah Peralatan</th>
                        <th className="text-center" style={{ 'width': '50px'}}>Tarikh Permohonan</th>
                        <th className='text-center' style={{ 'width': '100px'}}>Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {mohons?.data?.map((mohon,index) => (
                        <tr key={index}>
                            {/* <td> <span className="badge bg-primary">{mohon.id}</span></td> */}
                            <td>{mohon.user?.name}</td>
                            <td>{mohon.user?.nric}</td>
                            {/* <td className='text-center'>
                                <ApproverStatus step={mohon.mohon_approval.step} currentStatus={mohon.mohon_approval.status} />
                            </td> */}
                            <td  className='text-center'>
                            { mohon.mohon_approval ?
                                <Table className='border rounded' style={{backgroundColor:"#f0f0f0"}}>
                                    <thead>
                                        <tr>
                                            <th>Peringkat</th>
                                            <th>Status</th>
                                            <th>Tarikh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{mohon?.mohon_approval?.step}</td>
                                            <td>{mohon?.mohon_approval?.status}</td>
                                            <td>{mohon?.mohon_approval?.created_at}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                :
                                <Badge>Belum buat permohonan</Badge>        
                                }
                            </td>

                         
                            <td className='text-center'>{mohon.mohon_items_count}</td>
                            <td className='text-center'>{mohon.created_at}</td>
                            <td className='text-center'>
                                <ViewModal id={mohon.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex bd-highlight mb-3">
                {/* <StatusPermohonan /> */}
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