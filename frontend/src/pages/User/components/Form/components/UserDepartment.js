import React, { useState,useEffect } from 'react'
import useUserDepartmentStore from '../../../../UserDepartment/stores/UserDepartmentStore';
import useUserStore from '../../../stores/UserStore';
import axios from '../../../../../libs/axios'
import { Form } from 'react-bootstrap';

const UserDepartment = () => {
    const category = useUserDepartmentStore()
    const user = useUserStore()
    const [data,setData] = useState([])
    // console.log('from category')
    // console.log(category.index_url)

    useEffect( () => {
        axios({
            url: category.index_url,  // user store API
            method: 'get', // method is POST
        })
        .then( response => {
            //console.log(response.data)
            setData(response.data.user_departments)
        })
    },[])

    return (
        <>
        <Form.Select 
            htmlSize={10}
            isInvalid={user.user_department_id?.message}
            value={user?.user_department_id?.value}
            onChange={(e) => { 
                const data = {
                    value: e.target.value
                }
                useUserStore.setState({user_department_id: data})}
            }
        >
            <CategoryDropdown data={data} />
        </Form.Select>

        <Form.Control.Feedback type="invalid">
                {user.user_department_id?.message}
        </Form.Control.Feedback>
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