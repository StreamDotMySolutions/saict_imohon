import React, { useState,useEffect } from 'react'
import useCategoryStore from '../../../../Category/stores/CategoryStore'
import useUserDepartmentStore from '../../../../UserDepartment/stores/UserDepartmentStore';
import axios from '../../../../../libs/axios'
//import { Form } from 'react-bootstrap';

const UserDepartment = () => {
    const category = useUserDepartmentStore()
    const [data,setData] = useState([])
    // console.log('from category')
    // console.log(category.index_url)

    useEffect( () => {
        axios({
            url: category.index_url,  // user store API
            method: 'get', // method is POST
        })
        .then( response => {
            console.log(response.data)
            setData(response.data.user_departments)
        })
    },[])

    return (
        <>
        <select
            className='form-select'
            size='20'
            onChange={(e) => { 
                const data = {
                    value: e.target.value
                }
                useCategoryStore.setState({parent_id: data})}
            }
        >
            <CategoryDropdown data={data} />
        </select>
        </>
    );
};


function CategoryDropdown({ data, depth = 0 }) {
    const indent = '_ _'.repeat(depth);
    
    return (
      <>
        {data.map((category,index) => (
          <>
       
          {/* <option className={category.parent_id === null ? 'text-uppercase fw-bold' : ' text-uppercase'} key={index} value={category.id}> */}
          <option
            value={category.id}
            className={category.parent_id === null ? 'text-uppercase fw-bold' : 'text-uppercase'}
            key={index}
            disabled={category.parent_id === null}
             >
            {depth != 0 && 'I'}{indent}{' '}{category.name}
          </option>
          <CategoryDropdown data={category.children} depth={depth + 1} />
          </>
        ))}
  
    </>
    );
  }

export default UserDepartment;