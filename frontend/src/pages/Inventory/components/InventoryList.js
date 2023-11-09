import { useState, useEffect } from 'react';
import { Badge, Table, Pagination } from 'react-bootstrap';
import InventoryDashboard from './InventoryDashboard';
import useInventoryStore from '../stores/InventoryStore';
import axios from '../../../libs/axios'


const InventoryList = () => {

    const store = useInventoryStore()

    // const data = {
    //     1 : {
    //         'id': 1,
    //         'item': 'pc',
    //         'vendor': 'xyz sdn bhd',
    //         'total': 20,
    //         'contract_duration': '1/11/23 - 1/11/24',
    //         'received_date': '11/7/23',
    //         'user_id': 'En Zikri Yahya'
    //     },
    //     2 : {
    //         'id': 2,
    //         'item': 'pbwm',
    //         'vendor': 'abc sdn bhd',
    //         'total': 10,
    //              'contract_duration': '1/11/23 - 1/11/24',
    //         'received_date': '15/7/23',
    //         'user_id': 'Pn Siti'
    //     },
    //     3 : {
    //         'id': 3,
    //         'item': 'pcn',
    //         'vendor': 'abc sdn bhd',
    //         'total': 10,
    //              'contract_duration': '1/11/23 - 1/11/24',
    //         'received_date': '15/7/23',
    //         'user_id': 'Ms Chong'
    //     },
    //     4 : {
    //         'id': 4,
    //         'item': 'pc',
    //         'vendor': 'abc sdn bhd',
    //         'total': 10,
    //              'contract_duration': '1/11/23 - 1/11/24',
    //         'received_date': '15/7/23',
    //         'user_id': 'En Amir'
    //     },
    //     5 : {
    //         'id': 5,
    //         'item': 'pcn',
    //         'vendor': 'abc sdn bhd',
    //         'total': 10,
    //              'contract_duration': '1/11/23 - 1/11/24',
    //         'received_date': '15/7/23',
    //         'user_id': 'Pn Zulaikha'
    //     }
    // }

    useEffect( () => {
        axios({url: `${store.url}`})
        .then( response => {
            store.emptyData()
            //setData(response.data)  
            //console.log(response.data.inventories)
            store.setValue('links', response.data.inventories.links)
            store.setValue('inventories', response.data.inventories.data)
            //store.setValue('pages', response.data.inventories.data)
            useInventoryStore.setState({ refresh: false})
        })
        .catch( error => {
          console.warn(error)
        })

        // Add a delay of 1 second before closing
        // setTimeout(() => {
        //     useInventoryStore.setState({ latestId: null})
        // }, 4000);
    
      },[store.refresh,store.url])

    function InventoryItems() {

        //store = useInventoryStore()
        const inventories = store.getValue('inventories')
        console.log(inventories)
        return (
          <>
            {inventories.map((item) => (
              <tr key={item.id}>
                <td className='text-center'><Badge>{item.id}</Badge></td>
                <td>{item.vendor}</td>
                <td className='text-center'>{item.item}</td>
                <td className='text-center'>{item.total}</td>
                <td className='text-center'>From {item.date_start} to {item.date_end}</td>
                <td className='text-center'>{item.received_on}</td>
              </tr>
            ))}
          </>
        );
    }

    function Paginator (){
        //console.log(items.links)
        const handlePaginationClick = (url) => {
            //console.log(url)
            useInventoryStore.setState({url: url})
        }

        //const pages = 
        const items = store.getValue('links')
        //console.log(items)
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
    
    return (<>
   
        <InventoryDashboard />
        <div className="col" style={{ lineHeight: '2.5' }}>
            <Table className='table'>
                <thead>
                    <tr>
                        <th className='text-center'>ID</th>
                        <th>VENDOR</th>
                        <th className='text-center'>ITEM</th>
                        <th className='text-center'>TOTAL</th>
                        <th className='text-center'>DURATION</th>
                        <th className='text-center'>RECEIVED ON</th>
                    </tr>
                </thead>
                <InventoryItems />
            </Table>
            <Paginator />
        </div>
    </>);
};

export default InventoryList;