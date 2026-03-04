import { useEffect, useState } from 'react'
import { Badge, Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../libs/axios'
import useUserStore from '../stores/UserStore'
import ShowUserModal from './Modal/ShowUserModal'
import EditUserModal from './Modal/EditUserModal'
import DeleteUserModal from './Modal/DeleteUserModal'

function flattenDepts(depts, result = []) {
    depts?.forEach(d => {
        result.push(d)
        if (d.children?.length) flattenDepts(d.children, result)
    })
    return result
}

function UserTable({ role, departments }) {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const store = useUserStore()

    const [users, setUsers] = useState([])
    const [links, setLinks] = useState([])
    const [pageUrl, setPageUrl] = useState(null)
    const [search, setSearch] = useState('')
    const [deptId, setDeptId] = useState('')

    const flatDepts = flattenDepts(departments)

    // Reset pagination on filter change
    useEffect(() => { setPageUrl(null) }, [search, deptId, role])

    useEffect(() => {
        const params = new URLSearchParams({ role })
        if (search) params.set('search', search)
        if (deptId) params.set('user_department_id', deptId)

        const url = pageUrl ?? `${apiUrl}/admin/users?${params.toString()}`

        axios({ method: 'get', url })
            .then(response => {
                setUsers(response.data.users.data ?? [])
                setLinks(response.data.users.links ?? [])
                useUserStore.setState({ refresh: false })
            })
            .catch(err => console.warn(err))
    }, [role, search, deptId, pageUrl, store.refresh])

    const handleDisable = (id) => {
        const formData = new FormData()
        formData.append('_method', 'patch')
        axios({ url: `${apiUrl}/admin/users/${id}/disable`, method: 'post', data: formData })
            .then(() => useUserStore.setState({ refresh: true }))
            .catch(err => console.warn(err))
    }

    return (
        <>
            <Row className='g-2 mb-3' style={{ maxWidth: 500 }}>
                <Col>
                    <Form.Control
                        size='sm'
                        placeholder='Cari nama atau emel...'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Select size='sm' value={deptId} onChange={e => setDeptId(e.target.value)}>
                        <option value=''>Semua Jabatan</option>
                        {flatDepts.filter(d => d.parent_id !== null).map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <Table hover responsive>
                <thead className='table-light'>
                    <tr>
                        <th>Nama</th>
                        <th>Emel</th>
                        <th>Jabatan</th>
                        <th className='text-center'>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.profile?.user_department?.name ?? '-'}</td>
                            <td className='text-center'>
                                <div className='d-flex gap-1 justify-content-center'>
                                    <ShowUserModal id={user.id} />
                                    <Button
                                        size='sm'
                                        variant='warning'
                                        onClick={() => handleDisable(user.id)}
                                        title='Nyahaktif'
                                    >
                                        <FontAwesomeIcon icon='fa-solid fa-ban' />
                                    </Button>
                                    <EditUserModal id={user.id} />
                                    <DeleteUserModal id={user.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={4} className='text-center text-muted py-4'>Tiada rekod.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className='d-flex justify-content-end'>
                <Pagination className='mt-2'>
                    {links.map((page, index) => (
                        <Pagination.Item
                            key={index}
                            active={page.active}
                            disabled={page.url === null}
                            onClick={() => page.url && setPageUrl(page.url)}
                        >
                            <span dangerouslySetInnerHTML={{ __html: page.label }} />
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </>
    )
}

export default UserTable
