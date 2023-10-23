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

function NewRegistration({role}) {

  const store = useUserStore()
  const [data, setData] = useState([])
  //console.log(store.index_url)
  useEffect( () => {
      axios({
          url: `${store.index_url}&is_approved=0`,  // user store API
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

export default NewRegistration;

function RenderTable({items}) {
  //console.log(items)
  const store = useUserStore()
  const [message, setMessage] = useState(false)

  const HandleApproveClick = (id) => {
    //console.log(id)
    const formData = new FormData();
    formData.append('_method', 'patch');
    formData.append('id', id);

    axios({
      url: `${store.approve_url}/${id}`,
      method: 'post',
      data: formData
    })
    .then( response => {
      //console.log(response)
      useUserStore.setState({ refresh: true }) // useEffect trigger
      setMessage(response.data.message)
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
                  <th className="px-5 col-3">Nama</th>
                  <th className="px-">Email</th>
                  <th className="px-5 col-5 border border-end-0">Jabatan</th>
                  <th></th>
              </tr>
          </thead>
        <tbody>

          
          {items?.data?.map((user, index) => (
            <tr key={index}>
              <td className='px-5'>{user.profile?.name.toUpperCase()}</td>
              <td className='px-5 col-1'>{user.email}</td>
              <td className='px-5'>{user.profile?.user_department?.name}</td>
              <td className='col-6  text-center'>
                <Button 
                  onClick={ () => HandleApproveClick(user.id)} 
                  variant={'success'}>Approve</Button>
                {' '}
                {/* <ShowUserModal id={user.id} />
                {' '} */}
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

  if(items.data.length > 0 )return  (
    <Pagination>
    {links}
    </Pagination>
  )
}

