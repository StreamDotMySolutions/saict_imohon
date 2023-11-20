/**
 * This Component is for user with role = 'boss'
 * To approve Distribution Request
 */

import {useEffect, useState } from 'react'
import axios from '../../libs/axios'
import useStore from './store';
import { Table, Badge,Pagination } from 'react-bootstrap'

import ShowModal from './modals/ShowModal'
import CreateModal from './modals/CreateModal'
import EditModal from './modals/EditModal'
import DeleteModal from './modals/DeleteModal'

const App = () => {
    const store = useStore()
    const [data, setData] = useState([])

    //console.log(store.url)

    useEffect( () => {
        axios({url: store.url})
        .then( response => {

           //console.log(response)
            
            if (response.data.distributions && response.data.distributions.data) {
                setData({
                  'distributions': response.data.distributions.data,
                  'links': response.data.distributions.links
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

    function Status({ status }) {
        let badgeColor;
      
        switch (status) {
          case 'approved':
            badgeColor = 'success';
            break;
          case 'pending':
            badgeColor = 'warning';
            break;
          case 'rejected':
            badgeColor = 'danger';
            break;
          default:
            badgeColor = 'secondary';
        }
      
        return (
          <>
            <Badge bg={badgeColor}>{status.toUpperCase()}</Badge>
          </>
        );
    }

 
    return (
        <div>
{/* 
            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <CreateModal />
                </div>
            </div> */}

            <Table style={{ lineHeight: '2.5' }}>
              <thead>
                  <tr>
                      <th className='text-center'>ID</th>
                      <th className='text-center'>NAMA</th>
                      <th className='text-center'>JABATAN</th>
                      <th className='text-center'>PERALATAN</th>
                      <th className='text-center'>JUMLAH</th>
                      <th className='text-center'>STATUS</th>
                      <th className='text-center'>TARIKH</th>
                      <th className='text-center'></th>
                  </tr>
              </thead>
              <tbody>
              {data?.distributions?.map((item,index) => (
              <tr key={item.id}>
                <td className='text-center'><Badge>{item.id}</Badge></td>
                <td className='text-center'>{item?.application?.user?.name}</td>
                <td className='text-center'>{item?.application?.user?.user_profile?.user_department?.name}</td>
                <td className='text-center'>{item.item}</td>
                <td className='text-center'>{item.total}</td>
                <td className='text-center'><Status status={item.status} /></td>
                <td className='text-center'>{item.created_at_formatted}</td>
                
                <td className='text-center'>
                  <ShowModal id={item.id} />
                  {' '}
                  <EditModal id={item.id} />
    
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