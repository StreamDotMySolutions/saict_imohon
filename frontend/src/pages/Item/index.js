import {useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Row,Col, Table, Badge,Pagination } from 'react-bootstrap'
import ShowModal from './modals/ShowModal'
import useInventoryStore from './stores/InventoryStore'

const Inventories = () => {
    const store = useInventoryStore()
    const [data, setData] = useState([])

 
    useEffect( () => {
        axios({url: store.url})
        .then( response => {

          setData({
            'inventories': response.data.inventories.data,
            'links': response.data.inventories.links
          });

          useInventoryStore.setState({ refresh: false})
        })

        // Add a delay of 1 second before closing
        setTimeout(() => {
            useInventoryStore.setState({ latestId: null})
        }, 4000);
    
      },[store.refresh,store.url])

      function InventoryItems() {

          const inventories = data.inventories

          return (
            <>
              <thead>
                  <tr>
                      <th className='text-center'>ID</th>
                      <th>VENDOR</th>
                      <th className='text-center'>ITEM</th>
                      <th className='text-center'>TOTAL</th>
                      <th className='text-center'>DURATION</th>
                      <th className='text-center'>RECEIVED ON</th>
                      <th className='text-center'></th>
                  </tr>
              </thead>
              <tbody>
              {inventories?.map((item) => (
                <tr key={item.id}>
                  <td className='text-center'><Badge>{item.id}</Badge></td>
                  <td>{item.vendor}</td>
                  <td className='text-center'>{item.item}</td>
                  <td className='text-center'>{item.total}</td>
                  <td className='text-center'>From {item.date_start} to {item.date_end}</td>
                  <td className='text-center'>{item.received_on}</td>
                  <th className='text-center'>
  
                  </th>
                </tr>
              ))}
              </tbody>
            </>
          );
      }

      function Paginator (){
        const handlePaginationClick = (url) => {
            useInventoryStore.setState({url: url})
        }

        const items =  data.links
        const links = items?.map( (page,index) => 
            
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

 
    return (
        <div className="col" >
            <Table style={{ lineHeight: '2.5' }}>
              <thead>
                  <tr>
                      <th className='text-center'>ID</th>
                      <th>VENDOR</th>
                      <th className='text-center'>ITEM</th>
                      <th className='text-center'>TOTAL</th>
                      <th className='text-center'>DURATION</th>
                      <th className='text-center'>RECEIVED ON</th>
                      <th className='text-center'></th>
                  </tr>
              </thead>
              <tbody>
              {data?.inventories?.map((item,index) => (
              <tr key={item.id}>
                <td className='text-center'><Badge>{item.id}</Badge></td>
                <td>{item.vendor}</td>
                <td className='text-center'>{item.item}</td>
                <td className='text-center'>{item.total}</td>
                <td className='text-center'>From {item.date_start} to {item.date_end}</td>
                <td className='text-center'>{item.received_on}</td>
                <td className='text-center'>
                  <ShowModal id={item.id} />
                </td>
              </tr>
            ))}
            </tbody>
          </Table>

            
            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <Paginator />
                </div>
            </div>

        </div>

     
    );
};

export default Inventories;