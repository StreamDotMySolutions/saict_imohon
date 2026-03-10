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

    // Flatten the tree into a list of options with depth info
    const flattenTree = (nodes, depth = 0) => {
        const result = []
        nodes.forEach((node, index) => {
            const isLast = index === nodes.length - 1
            result.push({ ...node, depth, isLast })
            if (node.children?.length) {
                result.push(...flattenTree(node.children, depth + 1))
            }
        })
        return result
    }

    const options = flattenTree(data)

    return (
        <Form.Group>
            <Form.Label className='fw-semibold'>
                <FontAwesomeIcon icon='fa-solid fa-building' className='me-2' />
                Jabatan
            </Form.Label>
            <Form.Select
                size='lg'
                isInvalid={!!errors?.user_department_id}
                onChange={e => useAuthStore.setState({ user_department_id: { value: e.target.value } })}
            >
                <option value=''>Pilih Jabatan</option>
                {options.map(opt => {
                    const isRoot = opt.parent_id === null
                    const prefix = isRoot ? '' : '\u00A0\u00A0\u00A0\u00A0'.repeat(opt.depth - 1) + (opt.isLast ? '└── ' : '├── ')
                    return (
                        <option
                            key={opt.id}
                            value={opt.id}
                            disabled={isRoot}
                            style={isRoot ? { fontWeight: 'bold', backgroundColor: '#f0f0f0' } : {}}
                        >
                            {isRoot ? `■ ${opt.name}` : `${prefix}${opt.name}`}
                        </option>
                    )
                })}
            </Form.Select>
            {errors?.user_department_id && (
                <Form.Control.Feedback type='invalid'>
                    {errors.user_department_id}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}

export default Department
