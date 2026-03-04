import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import useAuthStore from '../../../stores/AuthStore'
import axios from '../../../../../libs/axios'

const Department = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const store = useAuthStore()
    const errors = store.errors
    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            url: `${apiUrl}/global/user-departments`,
            method: 'get',
        })
            .then(response => {
                setData(response.data.user_departments)
            })
    }, [])

    return (
        <Form.Group>
            <Form.Label className='fw-semibold'>
                <FontAwesomeIcon icon='fa-solid fa-home' className='me-2' />
                Jabatan
            </Form.Label>
            <Form.Select
                size='lg'
                isInvalid={!!errors?.user_department_id}
                onChange={e => useAuthStore.setState({ user_department_id: { value: e.target.value } })}
            >
                <option value=''>Pilih Jabatan</option>
                <CategoryDropdown data={data} />
            </Form.Select>
            {errors?.user_department_id && (
                <Form.Control.Feedback type='invalid'>
                    {errors.user_department_id}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}

function CategoryDropdown({ data, depth = 0 }) {
    const indent = '_ _'.repeat(depth)

    return (
        <>
            {data.map((category, index) => (
                <React.Fragment key={index}>
                    <option
                        value={category.id}
                        disabled={category.parent_id === null}
                        style={{ paddingLeft: `${depth * 20}px` }}
                    >
                        {depth !== 0 && 'I'}{indent} {category.name}
                    </option>
                    <CategoryDropdown data={category.children} depth={depth + 1} />
                </React.Fragment>
            ))}
        </>
    )
}

export default Department
