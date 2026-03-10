import React, { useState, useEffect } from 'react'
import useUserStore from '../../../stores/UserStore';
import axios from '../../../../../libs/axios'
import { Form } from 'react-bootstrap';

const UserDepartment = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const user = useUserStore()
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
        <>
        <Form.Select
            htmlSize={10}
            isInvalid={user.user_department_id?.message}
            value={user?.user_department_id?.value ?? ''}
            onChange={(e) => {
                useUserStore.setState({ user_department_id: { value: e.target.value } })
            }}
        >
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

        <Form.Control.Feedback type="invalid">
                {user.user_department_id?.message}
        </Form.Control.Feedback>
        </>
    );
};

export default UserDepartment;