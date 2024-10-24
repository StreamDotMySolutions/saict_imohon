import {useEffect, useState } from 'react'
import axios from '../../libs/axios'
import useStore from './stores/store'
import { Table, Badge,Pagination } from 'react-bootstrap'

// import ShowModal from './modals/ShowModal'
// import CreateModal from './modals/CreateModal'
// import EditModal from './modals/EditModal'
// import DeleteModal from './modals/DeleteModal'

const App = () => {
    const store = useStore()
    const [data, setData] = useState([])

    console.log(store.url)

    useEffect( () => {
        axios({url: store.url})
        .then( response => {

            console.log(response)
            
            if (response.data.applications && response.data.applications.data) {
                setData({
                  'data': response.data.applications.data,
                  'links': response.data.applications.links
                });
            }

        useStore.setState({ refresh: false})
        })

        // Add a delay of 1 second before closing
        setTimeout(() => {
            useStore.setState({ latestId: null})
        }, 4000);
    
      },[store.refresh,store.url])

      function Paginator (){
        const handlePaginationClick = (url) => {
            useStore.setState({url: url})
        }

        const items =  data?.links
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
        <div>

            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    {/* <CreateModal /> */}
                </div>
            </div>

            <Table style={{ lineHeight: '2.5' }}>
              <thead>
                  <tr>
                      <th className='text-center'>ID</th>
                      <th className='text-center'>PERALATAN</th>
                      <th className='text-center'>JUMLAH</th>
                      <th className='text-center'>SEBAB</th>
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
                <td className='text-center'>Dari {item.date_start} hingga {item.date_end}</td>
                <td className='text-center'>{item.received_on}</td>
                <td className='text-center'>
                  {/* <ShowModal id={item.id} />
                  {' '}
                  <EditModal id={item.id} />
                  {' '}
                  <DeleteModal id={item.id} /> */}
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

export default App;