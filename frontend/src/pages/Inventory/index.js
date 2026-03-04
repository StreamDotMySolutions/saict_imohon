import { useEffect, useState } from 'react'
import { Col, Container, Form, Nav, Pagination, Row, Table } from 'react-bootstrap'
import axios from '../../libs/axios'

import useInventoryStore from './stores/InventoryStore'

import ShowModal from './modals/ShowModal'
import CreateModal from './modals/CreateModal'
import EditModal from './modals/EditModal'
import DeleteModal from './modals/DeleteModal'
import InventoryDashboard from './Dashboard'

const Inventories = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const store = useInventoryStore()

    const [tab, setTab] = useState('rekod')

    const [inventories, setInventories] = useState([])
    const [links, setLinks] = useState([])
    const [pageUrl, setPageUrl] = useState(null)
    const [search, setSearch] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])

    // Load categories once for the filter dropdown
    useEffect(() => {
        axios({ method: 'get', url: `${apiUrl}/admin/categories` })
            .then(response => setCategories(response.data.categories))
    }, [])

    // Reset pagination when search or filter changes
    useEffect(() => {
        setPageUrl(null)
    }, [search, categoryId])

    // Fetch inventories (only when on rekod tab)
    useEffect(() => {
        if (tab !== 'rekod') return

        const params = new URLSearchParams()
        if (search) params.set('search', search)
        if (categoryId) params.set('category_id', categoryId)

        const url = pageUrl
            ? `${pageUrl}${pageUrl.includes('?') ? '&' : '?'}${params.toString()}`
            : `${apiUrl}/admin/inventories?${params.toString()}`

        axios({ method: 'get', url })
            .then(response => {
                setInventories(response.data.inventories.data)
                setLinks(response.data.inventories.links)
                useInventoryStore.setState({ refresh: false })
            })

        setTimeout(() => {
            useInventoryStore.setState({ latestId: null })
        }, 4000)
    }, [search, categoryId, pageUrl, store.refresh, tab])

    return (
        <Container>
            <h4 className='mb-1'>Inventori</h4>
            <p className='text-muted'>Senarai peralatan dan kontrak yang direkodkan dalam sistem.</p>
            <hr />

            {/* Tabs */}
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <Nav variant='tabs'>
                    <Nav.Item>
                        <Nav.Link active={tab === 'rekod'} onClick={() => setTab('rekod')} style={{ cursor: 'pointer' }}>
                            Rekod
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={tab === 'dashboard'} onClick={() => setTab('dashboard')} style={{ cursor: 'pointer' }}>
                            Papan Pemuka
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                {tab === 'rekod' && <CreateModal />}
            </div>

            {/* Dashboard tab */}
            {tab === 'dashboard' && <InventoryDashboard />}

            {/* Rekod tab */}
            {tab === 'rekod' && (
                <>
                    {/* Search/filter bar */}
                    <Row className='g-2 mb-3' style={{ maxWidth: 500 }}>
                        <Col>
                            <Form.Control
                                size='sm'
                                placeholder='Cari vendor, nama kontrak...'
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Select
                                size='sm'
                                value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}
                            >
                                <option value=''>Semua Kategori</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>

                    <Table hover responsive>
                        <thead className='table-light'>
                            <tr>
                                <th>No.</th>
                                <th>Vendor</th>
                                <th>No. Kontrak</th>
                                <th>Kategori</th>
                                <th className='text-center'>Jumlah Peralatan</th>
                                <th className='text-center'>Tempoh</th>
                                <th className='text-center'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventories?.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.vendor}</td>
                                    <td>{item.contract_number ?? '-'}</td>
                                    <td>{item.category?.name ?? '-'}</td>
                                    <td className='text-center'>{item.total ?? '-'}</td>
                                    <td className='text-center'>
                                        {item.date_start} – {item.date_end}
                                    </td>
                                    <td className='text-center'>
                                        <div className='d-flex gap-1 justify-content-center'>
                                            <ShowModal id={item.id} />
                                            <EditModal id={item.id} />
                                            <DeleteModal id={item.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {inventories?.length === 0 && (
                                <tr>
                                    <td colSpan={7} className='text-center text-muted py-4'>Tiada rekod.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <div className='d-flex justify-content-end'>
                        <Pagination className='mt-3'>
                            {links?.map((page, index) => (
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
            )}
        </Container>
    )
}

export default Inventories
