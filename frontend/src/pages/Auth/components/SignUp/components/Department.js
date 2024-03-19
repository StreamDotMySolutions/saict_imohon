import React, { useState,useEffect } from 'react'

//import useDepartmentStore from '../../../../UserDepartment/stores/UserDepartmentStore'
import useAuthStore from '../../../stores/AuthStore'
import axios from '../../../../../libs/axios'
//import useAccountStore from '../../../../Account/stores/AccountStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Row,Col,Button, Form, InputGroup, Alert } from 'react-bootstrap'

const Department = () => {

    const store = useAuthStore()
    const errors = store.errors
    const auth = useAuthStore()
    const [data,setData] = useState([])

    useEffect( () => {
        axios({
            url: auth.user_departments_url,  // user store API
            method: 'get', // method is POST
        })
        .then( response => {
            //console.log(response.data)
            setData(response.data.user_departments)
        })
    },[])

    return (
        <>
        <InputGroup hasValidation>
            <InputGroup.Text className='fs-2'><FontAwesomeIcon icon="fa-solid fa-home"></FontAwesomeIcon></InputGroup.Text>
            <Form.Select 
                htmlSize={10}
                isInvalid={errors?.hasOwnProperty('user_department_id')}
                onChange={ (e) => useAuthStore.setState({ user_department_id: { value: e.target.value}} )}  
            >
                <CategoryDropdown data={data} />
            </Form.Select>

            {errors?.hasOwnProperty('user_department_id') &&

                <Form.Control.Feedback type="invalid">   
                { errors.user_department_id ? errors.user_department_id : null }
                </Form.Control.Feedback>
            
            }

            <Form.Control.Feedback type="invalid">
               
            </Form.Control.Feedback>
        </InputGroup>
        </>
       
    );
};

function CategoryDropdown({ data, depth = 0 }) {
    const indent = '_ _'.repeat(depth);
    
    return (
      <>
        {data.map((category,index) => (
        <>
        <option
            key={index}
            value={category.id}
            className={category.parent_id === null ? 'text-uppercase fw-bold' : 'text-uppercase'}
            disabled={category.parent_id === null}
            >
            {depth != 0 && 'I'}{indent}{' '}{category.name}
        </option>
        <CategoryDropdown data={category.children}  depth={depth + 1} />
        </>
        ))}
  
    </>
    );
}

export default Department;