import React, { useState, useEffect } from 'react'
import { Table,Pagination, Button } from 'react-bootstrap'
import useMohonItemStore from '../store'
import axios from '../../../libs/axios'
import EditModal from '../modals/EditModal'
import DeleteModal from '../modals/DeleteModal'
import ViewModal from '../modals/ViewModal'
import CreateModal from '../modals/CreateModal'
import ApprovalModal from '../../Mohon/modals/ApprovalModal'

const MohonItemIndex = ({mohonRequestId, step}) => {
    const store = useMohonItemStore()
    const [items, setItems] = useState([])

    // to get items data
    useEffect( () => 
        {
            // modified axios to prepend Bearer Token on header
            axios( 
                {
                    method: 'get', // method is GET
                    url: `${store.url}/${mohonRequestId}` // eg GET http://localhost:8000/api/mohon-items/123
                } 
            )
            .then( response => { // response block
                //console.log(response.data.items)   // output to console  
                setItems(response.data.items) // assign data to const = mohons
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
                    {step === 0 && <CreateModal /> }
                    {' '}
                    <ApprovalModal id={mohonRequestId} count={items.data?.length} step={step}/>
                </div>
            </div>


            <Table>
                <thead>
                    <tr>
                        {/* <th style={{ 'width': '20px'}}>No</th> */}
                        <th>Peralatan</th>
                        <th>Jenis</th>
                        <th>Pemilik Peralatan</th>
                        <th className='text-center' style={{ 'width': '250px'}}>Tindakan</th>
                    </tr>
                </thead>

                <tbody>
                    {items?.data?.map((item,index) => (
                        <tr key={index}>
                            {/* <td> <span className="badge bg-primary">{item.id}</span></td> */}
                            <td>{item.category?.name}</td>
                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                            <td>{item.name}</td>
                            <td className='text-center' >
                                <ViewModal id={item.id} step={step} />
                                {' '}
                                <EditModal id={item.id} step={step} />
                                {' '}
                                <DeleteModal id={item.id} step={step} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <PaginatorLink items={items} />
                </div>
            </div>
        </div>
    );
};
export default MohonItemIndex;


/**
 * Paginator Links
 */
function PaginatorLink ({items}){
    //console.log(items.links)
    const handlePaginationClick = (url) => {
      //console.log(url)
      useMohonItemStore.setState({url: url}) // update the url state in store
      
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