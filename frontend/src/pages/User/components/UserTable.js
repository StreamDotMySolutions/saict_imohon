import React, { useState,useEffect } from 'react';
//import Pagination from './Pagination';
import HeaderTable from './HeaderTable';
import ShowUserModal from './Modal/ShowUserModal';
import EditUserModal from './Modal/EditUserModal';
import DeleteUserModal from './Modal/DeleteUserModal';
import useUserStore from '../stores/UserStore';
import axios from '../../../libs/axios';
import { Pagination,Button } from 'react-bootstrap';
import DisplayMessage from '../../../components/DisplayMessage';

function UserTable({role}) {

  const store = useUserStore()
  const [data, setData] = useState([])
  //console.log(store.index_url)
  useEffect( () => {
      axios({
          url: `${store.index_url}&role=${role}`,  // user store API
          method: 'get', // method is POST
      })
      .then( response => {
          //console.log(response.data)
          //console.log('loading data...')
          setData(response.data.users)
          useUserStore.setState({refresh: false})
      })
  },[store.refresh,store.index_url,role])

  return (
    <>

      { data.length == 0 ? '...loading' :
        <>
        <HeaderTable />

        <RenderTable items={data} />

        <div className="d-flex">
          <div className="ms-auto">
            <PaginatorLink items={data} />
          </div>
        </div>
      </>
      }
    </>
  );
}

export default UserTable;

function RenderTable({items}) {
  //console.log(items)
  const store = useUserStore()
  const [message, setMessage] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [selectedId,setSelectedId] = useState(null)

  const HandleDisableClick = (id) => {
    setSelectedId(id)
    setMessage(null)
    setIsLoading(true)
    //console.log(id)
    const formData = new FormData();
    formData.append('_method', 'patch');
    formData.append('id', id);

    axios({
      url: `${store.approve_url}/${id}/disable`,
      method: 'post',
      data: formData
    })
    .then( response => {
      //console.log(response)
      useUserStore.setState({ refresh: true }) // useEffect trigger
      setMessage(response.data.message)
      setIsLoading(false)
    })
    .catch( error => {
      console.warn(error)
    })
  }
  return(
    <>
    { message && <DisplayMessage variant='success' message={message} />}

    { items?.data?.length ==  0 ? 'Tiada Data' : (
    <table className="table table-bordered">
        <thead>
            <tr>
                <th className="px-5 col-2">Nama</th>
                <th className="px-5">Email</th>
                <th className="px-5 border border-end-0">Jabatan</th>
                <th className='col-4 text-center'>Tindakan</th>
            </tr>
        </thead>
      <tbody>
        {items?.data?.map((user, index) => (
          <tr key={index}>
            <td className='px-5'>{user?.name?.toUpperCase()}</td>
            <td className='px-5 col-2'>{user?.email}</td>
            <td className='px-5'>{user?.profile?.user_department?.name}</td>
            <td className='px-5 text-center'>
              {/* <ShowUserModal id={user.id} /> */}
              <Button 
                  size={'sm'}
                  onClick={ () => HandleDisableClick(user.id)} 
                  variant={'warning'}>

                  { isLoading  && selectedId == user.id ? 
                  <>
                    <i className="fa-solid fa-sync fa-spin"></i>
                    </>
                    :
                    <>
                    Nyahaktif
                    </>
                  }
                  </Button>
              {' '}
              <EditUserModal id={user.id} />
              {' '}
              <DeleteUserModal id={user.id}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )}
    </>
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

  return  (
    <Pagination>
    {links}
    </Pagination>
  )
}

