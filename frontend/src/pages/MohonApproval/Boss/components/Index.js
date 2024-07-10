import React, { useState, useEffect } from 'react'
import { Table,Pagination, Button } from 'react-bootstrap'
import useStore from '../store'
import axios from '../../../../libs/axios'
import ViewModal from '../modals/ViewModal'
import { AgihanApprovalStatus } from '../../../../components/global/AgihanApproval'

{/*
* Role = Boss will receive MohonDistributionRequest from role = Admin
* BOSS either approve or reject
*/}

const Index = ({status}) => {
    const store = useStore()
    const [responses, setResponses] = useState([])
    //console.log(status)

    useEffect( () => 
        {
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: `${store.url}/${status}` // eg GET http://localhost:8000/api/mohon-distribution-requests/by-boss
                } 
            )
            .then( response => { // response block
                //console.log(store.url) //
                //console.log(response.data.mohons.data)   // output to console  
                setResponses(response.data.mohons) // assign data to const = mohons
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
                        <th style={{ 'width': '20px'}}>No.</th>
                        <th style={{ 'width': '120px'}}>Pemohon</th>
                        <th className='text-center' style={{ 'width': '50px'}}>Status Kelulusan</th>
                        <th className='text-center' style={{ 'width': '50px'}}>Jumlah Peralatan</th>
                        <th className='text-center' style={{ 'width': '50px'}}>Tarikh</th>
                        <th className='text-center' style={{ 'width': '100px'}}>Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {responses?.data?.map((data,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{data.numbering}</span></td>
                            <td>{data.user?.name}</td>
                    
                            <td>
                                <AgihanApprovalStatus step={data.mohon_distribution_approval.step} currentStatus={data.mohon_distribution_approval.status} /></td>
                            <td className='text-center'>{data.mohon_distribution_items_count}</td>
                            <td className='text-center'>{data.created_at}</td>
                            <td className='text-center'>
                                {/* <ViewModal id={data.id} /> */}
                                <ViewModal 
                                    mohonDistributionRequestId={data.id}
                                    mohonRequestId={data.mohon_request_id}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <PaginatorLink items={responses} />
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