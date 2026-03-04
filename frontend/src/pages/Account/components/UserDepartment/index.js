import React, { useState, useEffect } from 'react'
import useDepartmentStore from '../../../UserDepartment/stores/UserDepartmentStore'
import axios from '../../../../libs/axios'
import useAccountStore from '../../stores/AccountStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Button, Form, Alert } from 'react-bootstrap'

const UserDepartment = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL

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
    }

    const handleCancelClick = () => {
        setIsEditing(false)
    }

    const handleSaveClick = () => {
        setIsSaving(true)

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
        setIsEditing(false)
    }

    useEffect(() => {
        axios({
            url: `${apiUrl}/global/user-departments`,
            method: 'get',
        })
            .then(response => {
                setData(response.data.user_departments)
            })
    }, [])

    // Auto-hide success message after 2 seconds
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isSuccess])
    

    return (
        <div className='mt-3'>
            <p className='text-muted small mb-2'>Klik pada senarai untuk memilih jabatan anda.</p>

            <select
                className={`form-select ${user.user_department_id?.message ? 'is-invalid' : ''}`}
                size='20'
                defaultValue={user?.account?.profile?.user_department_id}
                onClick={handleInputClick}
                style={isEditing ? { backgroundColor: 'lightyellow' } : {}}
                onChange={(e) => {
                    const data = {
                        value: e.target.value
                    }
                    useAccountStore.setState({ user_department_id: data })
                }}
            >
                <CategoryDropdown data={data} selected={user?.account?.profile?.user_department_id} />
            </select>
            <Form.Control.Feedback type='invalid'>
                {user.user_department_id?.message}
            </Form.Control.Feedback>

            {isSuccess && (
                <Alert variant='success' className='mt-2' dismissible>
                    Jabatan berjaya dikemaskini.
                </Alert>
            )}

            {isEditing && (
                <Row className='mt-2 text-end'>
                    <Col>
                        <Button
                            onClick={handleSaveClick}
                            size='sm'
                            variant='success'
                            className='me-2'
                        >
                            <FontAwesomeIcon icon='fa-solid fa-save' className='me-1' />
                            Simpan
                        </Button>
                        <Button
                            onClick={handleCancelClick}
                            size='sm'
                            variant='outline-secondary'
                        >
                            <FontAwesomeIcon icon='fa-solid fa-times' className='me-1' />
                            Batal
                        </Button>
                    </Col>
                </Row>
            )}
        </div>
    )
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