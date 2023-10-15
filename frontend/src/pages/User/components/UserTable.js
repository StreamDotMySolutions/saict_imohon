import React, { useState,useEffect } from 'react';
import Pagination from './Pagination';
import HeaderTable from './HeaderTable';
import ShowUserModal from './Modal/ShowUserModal';
import EditUserModal from './Modal/EditUserModal';
import DeleteUserModal from './Modal/DeleteUserModal';
import useUserStore from '../stores/UserStore';
import axios from '../../../libs/axios';

function UserTable() {
  const store = useUserStore.getState()
  const [data, setData] = useState([])

  useEffect( () => {
      axios({
          url: store.index_url,  // user store API
          method: 'get', // method is POST
      })
      .then( response => {
          //console.log(response.data)
          setData(response.data.users.data)
          useUserStore.setState({refresh: false})
      })
  },[store.refresh])
  //console.log(store.data)
  return (
    <>
    {/* <HeaderTable /> */}

    {data.length > 0 ?  <RenderTable data={data} /> : 'loading...' }
    

    <div class="d-flex">
      <div className='text-muted'>120 pengguna</div>
      <div class="ms-auto"><Pagination /></div>
    </div>
    </>
  );
}

export default UserTable;

const  RenderTable = (users) => {

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
        {users.data?.map((user, index) => (
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