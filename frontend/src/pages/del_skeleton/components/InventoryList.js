import { useEffect } from 'react';
import { Badge, Table, Pagination, Button } from 'react-bootstrap';
import InventoryDashboard from './InventoryDashboard';
import useInventoryStore from '../stores/InventoryStore';
import axios from '../../../libs/axios'
import ShowModal from '../modals/ShowModal';
import EditModal from '../modals/EditModal';
import CreateModal from '../modals/CreateModal';
import DeleteModal from '../modals/DeleteModal';

const InventoryList = () => {

    const store = useInventoryStore()
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
        //console.log(inventories)
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
                    <ShowModal id={item.id} />
                    {' '}
                    <EditModal id={item.id} />
                    {' '}
                    <DeleteModal id={item.id} />
                </th>
              </tr>
            ))}
            </tbody>
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
        <div className="d-flex bd-highlight mb-3">
            <div className="ms-auto p-2 bd-highlight">
                <CreateModal />
            </div>
        </div>
        <div className="col" style={{ lineHeight: '2.5' }}>
            <Table className='table'>
                <InventoryItems />
            </Table>
        </div>
        
           
        <div className="d-flex bd-highlight mb-3">
            <div className="ms-auto p-2 bd-highlight">
                <Paginator />
            </div>
        </div>
    </>);
};
export default InventoryList;