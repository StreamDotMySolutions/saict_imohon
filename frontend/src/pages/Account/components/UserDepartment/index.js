import React, { useState,useEffect } from 'react'
// import useUserDepartmentStore from '../../../../UserDepartment/stores/UserDepartmentStore'
// import useUserStore from '../../../stores/UserStore'
// import axios from '../../../../../libs/axios'

import useDepartmentStore from '../../../UserDepartment/stores/UserDepartmentStore'
import axios from '../../../../libs/axios'
import useAccountStore from '../../stores/AccountStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Row,Col,Button, Form } from 'react-bootstrap'

const UserDepartment = () => {
    const category = useDepartmentStore()
    const user = useAccountStore()

    const [data,setData] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [message, setMessage] = useState(null)
    const [value, setValue] = useState(null)

    const handleInputClick = () => {
        setIsEditing(true)
        console.log('edit')
    }
    const handleCancelClick = () => {
        setIsEditing(false)
    }
    
    const handleSaveClick = () => {
        console.log('saving')
        setIsSaving(true)
        console.log(user.user_department_id)

        //Send to server
        const formData = new FormData();
    
        formData.append('_method', 'put');
        formData.append('user_department_id', user.user_department_id.value);
        
        axios({
          url: user.update_url,
          method: 'post',
          data: formData,
        })
          .then((response) => {      
            setIsSaving(false)
            setIsSuccess(true)
          })
          .catch((error) => {
            setMessage(error.response.data.message)
            setIsError(true)
            console.error(error)
            setIsSaving(false)
          });
        
        // Exit the editing mode
        setIsEditing(false);
    }


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

        <select
            className={`form-select ${user.user_department_id?.message ? 'is-invalid' : ''}`}
            size='20'
            onClick={handleInputClick}
            style={isEditing ? { backgroundColor: 'lightyellow' } : {}}
            onChange={(e) => { 
                const data = {
                    value: e.target.value
                }
                useAccountStore.setState({user_department_id: data})}
            }
        >
            <CategoryDropdown data={data} selected={user?.account?.profile?.user_department_id} />
        </select>
        <Form.Control.Feedback type="invalid">
                {user.user_department_id?.message}
        </Form.Control.Feedback>

        { isEditing && (
            <Row className='mt-2 text-end'>
                <Col>
                    <Button onClick={handleSaveClick} variant={'light'} className='border border-1 border-success text-success'><FontAwesomeIcon icon="fa-solid fa-save" /></Button>
                    {' '}
                    <Button onClick={handleCancelClick} variant={'light'} className='border border-1 border-danger text-danger'><FontAwesomeIcon icon="fa-solid fa-times" /></Button>
                </Col>
            </Row>
        )}
    
        </>
    );
};

function CategoryDropdown({ data, selected, depth = 0 }) {
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
            selected={selected == category.id} // Check if this category is selected
             >
            {depth != 0 && 'I'}{indent}{' '}{category.name}
          </option>
          <CategoryDropdown data={category.children} selected={selected} depth={depth + 1} />
          </>
        ))}
  
    </>
    );
}

export default UserDepartment;