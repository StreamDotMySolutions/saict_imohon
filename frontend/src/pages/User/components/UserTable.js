import React, { useState,useEffect } from 'react';
//import Pagination from './Pagination';
import HeaderTable from './HeaderTable';
import ShowUserModal from './Modal/ShowUserModal';
import EditUserModal from './Modal/EditUserModal';
import DeleteUserModal from './Modal/DeleteUserModal';
import useUserStore from '../stores/UserStore';
import axios from '../../../libs/axios';
import { Pagination,PageItem } from 'react-bootstrap';

function UserTable() {

  const store = useUserStore()
  const [data, setData] = useState([])
  //console.log(store.index_url)
  useEffect( () => {
      axios({
          url: store.index_url,  // user store API
          method: 'get', // method is POST
      })
      .then( response => {
          //console.log(response.data)
          console.log('loading data...')
          setData(response.data.users)
          useUserStore.setState({refresh: false})
      })
  },[store.refresh,store.index_url])



  return (
    <>
    <HeaderTable />
    <RenderTable items={data} />
  
    <div class="d-flex">
      <div class="ms-auto">
        <PaginatorLink items={data} />
      </div>
    </div>
    </>
  );
}

export default UserTable;

function RenderTable({items}) {
  //console.log(items)

  return(
    <table className="table table-bordered">
        <thead>
            <tr>
                <th className="px-5 col-2">Nama</th>
                <th className="px-5">Email</th>
                <th className="px-5 col-5 border border-end-0">Jabatan</th>
                <th></th>
            </tr>
        </thead>
      <tbody>
        {items?.data?.map((user, index) => (
          <tr key={index}>
            <td className='px-5'>{user.profile?.name.toUpperCase()}</td>
            <td className='px-5'>{user.email}</td>
            <td className='px-5'>{user.profile?.user_department?.name}</td>
            <td className='px-5'>
              <ShowUserModal id={user.id} />
              {' '}
              <EditUserModal id={user.id} />
              {' '}
              <DeleteUserModal id={user.id}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}

/**
 * Paginator Links
 */
function PaginatorLink ({items}){
  //console.log(items.links)
  const handlePaginationClick = (url) => {
    //console.log(url)
    useUserStore.setState({index_url: url})
  }
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

  return (
    <Pagination>
    {links}
    </Pagination>
  )
}

