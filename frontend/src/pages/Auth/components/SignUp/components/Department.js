import React, { useState,useEffect } from 'react'

//import useDepartmentStore from '../../../../UserDepartment/stores/UserDepartmentStore'
import useAuthStore from '../../../stores/AuthStore'
import axios from '../../../../../libs/axios'
//import useAccountStore from '../../../../Account/stores/AccountStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Row,Col,Button, Form, InputGroup } from 'react-bootstrap'

const Department = () => {
    const auth = useAuthStore()
    const [data,setData] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [message, setMessage] = useState(null)
    const [value, setValue] = useState(null)

    // const handleInputClick = () => {
    //     setIsEditing(true)
    //     console.log('edit')
    // }
    // const handleCancelClick = () => {
    //     setIsEditing(false)
    // }
    
    // const handleSaveClick = () => {
    //     console.log('saving')
    //     setIsSaving(true)
    //     console.log(user.user_department_id)

    //     //Send to server
    //     const formData = new FormData();
    
    //     formData.append('_method', 'put');
    //     formData.append('user_department_id', user.user_department_id.value);
        
    //     axios({
    //       url: user.update_url,
    //       method: 'post',
    //       data: formData,
    //     })
    //       .then((response) => {      
    //         setIsSaving(false)
    //         setIsSuccess(true)
    //       })
    //       .catch((error) => {
    //         setMessage(error.response.data.message)
    //         setIsError(true)
    //         console.error(error)
    //         setIsSaving(false)
    //       });
        
    //     // Exit the editing mode
    //     setIsEditing(false);
    // }

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
            <Form.Select htmlSize={10} aria-label="Default select example">
                <CategoryDropdown data={data} />
            </Form.Select>

            <Form.Control.Feedback type="invalid">
               
            </Form.Control.Feedback>
        </InputGroup>
        </>
       
    );
};

function CategoryDropdown({ data, selected, depth = 0 }) {
    const indent = '_ _'.repeat(depth);
    
    return (
      <>
        {data.map((category,index) => (
        <>
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

export default Department;