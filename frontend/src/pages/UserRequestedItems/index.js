import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../libs/axios'
import TrackingModal from '../Tracking/TrackingModal'

const STAGES = ['Mohon', 'Agihan', 'Penghantaran', 'Penerimaan']

function getItemStatuses(item) {
    const approval = item.mohon_request?.mohon_approval
    const dist = item.mohon_distribution_item
    const delivery = dist?.mohon_distribution_item_delivery
    const acceptance = dist?.mohon_distribution_item_acceptance

    let mohonStatus = 'pending'
    if (approval) {
        if (approval.status === 'approved') mohonStatus = 'complete'
        else if (approval.status === 'rejected') mohonStatus = 'rejected'
        else mohonStatus = 'in-progress'
    }

    let agihanStatus = 'pending'
    if (dist) agihanStatus = 'complete'

    let deliveryStatus = 'pending'
    if (delivery) deliveryStatus = 'complete'

    let acceptanceStatus = 'pending'
    if (acceptance) acceptanceStatus = 'complete'

    return [mohonStatus, agihanStatus, deliveryStatus, acceptanceStatus]
}

const statusColor = (status) => {
    if (status === 'complete') return '#198754'
    if (status === 'in-progress') return '#ffc107'
    if (status === 'rejected') return '#dc3545'
    return '#dee2e6'
}

const statusTextColor = (status) => {
    if (status === 'complete' || status === 'rejected') return '#fff'
    if (status === 'in-progress') return '#000'
    return '#6c757d'
}

const CompactStepper = ({ item }) => {
    const statuses = getItemStatuses(item)
    return (
        <div className='d-flex align-items-center justify-content-center gap-0'>
            {STAGES.map((stage, i) => (
                <React.Fragment key={i}>
                    {i > 0 && (
                        <div style={{
                            width: 20, height: 2,
                            backgroundColor: statusColor(statuses[i])
                        }} />
                    )}
                    <div
                        title={stage}
                        style={{
                            width: 24, height: 24, borderRadius: '50%',
                            backgroundColor: statusColor(statuses[i]),
                            color: statusTextColor(statuses[i]),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.65rem', fontWeight: 600,
                            border: statuses[i] === 'in-progress' ? '2px solid #ffc107' : 'none',
                            flexShrink: 0,
                        }}
                    >
                        {statuses[i] === 'complete'
                            ? <FontAwesomeIcon icon='fa-solid fa-check' style={{ fontSize: '0.55rem' }} />
                            : statuses[i] === 'rejected'
                                ? <FontAwesomeIcon icon='fa-solid fa-xmark' style={{ fontSize: '0.55rem' }} />
                                : i + 1}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

const UserRequestedItems = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    const [items, setItems] = useState([])
    const [links, setLinks] = useState([])
    const [pageUrl, setPageUrl] = useState(null)
    const [search, setSearch] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [type, setType] = useState('')
    const [categories, setCategories] = useState([])
    const [stats, setStats] = useState({ total: 0, agihan: 0, diterima: 0, ditolak: 0 })

    useEffect(() => {
        axios({ method: 'get', url: `${apiUrl}/user/mohon-items/categories` })
            .then(response => setCategories(response.data.categories))
        axios({ method: 'get', url: `${apiUrl}/user/requested-items/stats` })
            .then(response => setStats(response.data))
    }, [])

    useEffect(() => {
        setPageUrl(null)
    }, [search, categoryId, type])

    useEffect(() => {
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        if (categoryId) params.set('category_id', categoryId)
        if (type) params.set('type', type)

        const url = pageUrl
            ? `${pageUrl}${pageUrl.includes('?') ? '&' : '?'}${params.toString()}`
            : `${apiUrl}/user/requested-items?${params.toString()}`

        axios({ method: 'get', url })
            .then(response => {
                setItems(response.data.items.data)
                setLinks(response.data.items.links)
            })
    }, [search, categoryId, type, pageUrl])

    return (
        <Container>
            <div className='mb-4'>
                <h4 className='mb-2'>Peralatan</h4>
                <p className='text-muted mb-0'>Senarai peralatan yang telah anda mohon.</p>
            </div>

            <Row className='g-3 mb-4'>
                {[
                    { label: 'Jumlah Dimohon', value: stats.total, icon: 'fa-solid fa-file-pen', bg: 'primary' },
                    { label: 'Diluluskan Agihan', value: stats.agihan, icon: 'fa-solid fa-boxes-stacked', bg: 'info' },
                    { label: 'Telah Diterima', value: stats.diterima, icon: 'fa-solid fa-clipboard-check', bg: 'success' },
                    { label: 'Ditolak', value: stats.ditolak, icon: 'fa-solid fa-xmark', bg: 'danger' },
                ].map((card, i) => (
                    <Col xs={6} md={3} key={i}>
                        <Card className={`border-0 text-white bg-${card.bg}`}>
                            <Card.Body className='py-3'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{card.label}</div>
                                        <div className='fw-bold' style={{ fontSize: '1.5rem' }}>{card.value}</div>
                                    </div>
                                    <FontAwesomeIcon icon={card.icon} style={{ fontSize: '1.8rem', opacity: 0.3 }} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <hr />

            <Row className='g-2 mb-3' style={{ maxWidth: 700 }}>
                <Col>
                    <Form.Control
                        size='sm'
                        placeholder='Cari nama, peralatan...'
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
                <Col>
                    <Form.Select
                        size='sm'
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value=''>Semua Jenis</option>
                        <option value='new'>Baharu</option>
                        <option value='replacement'>Ganti</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Legend */}
            <div className='d-flex gap-3 mb-3' style={{ fontSize: '0.75rem' }}>
                {[
                    { label: 'Selesai', color: '#198754' },
                    { label: 'Dalam Proses', color: '#ffc107' },
                    { label: 'Ditolak', color: '#dc3545' },
                    { label: 'Belum', color: '#dee2e6' },
                ].map((item, i) => (
                    <div key={i} className='d-flex align-items-center gap-1'>
                        <div style={{
                            width: 14, height: 14, borderRadius: '50%',
                            backgroundColor: item.color, flexShrink: 0
                        }} />
                        <span className='text-muted'>{item.label}</span>
                    </div>
                ))}
            </div>

            <Table hover responsive>
                <thead className='table-light'>
                    <tr>
                        <th>No.</th>
                        <th>Rujukan Mohon</th>
                        <th>Peralatan</th>
                        <th>Jenis</th>
                        <th>Penerima</th>
                        <th>Lokasi</th>
                        <th>Tarikh</th>
                        <th className='text-center'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <TrackingModal
                                    mohonRequestId={item.mohon_request?.id}
                                    referenceNo={item.mohon_request?.reference_no ?? `#${item.mohon_request?.id}`}
                                />
                            </td>
                            <td>{item.category?.name ?? '-'}</td>
                            <td>
                                <Badge bg={item.type === 'new' ? 'success' : 'warning'}>
                                    {item.type === 'new' ? 'Baharu' : 'Ganti'}
                                </Badge>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.building_name}{item.location ? `, ${item.location}` : ''}</td>
                            <td>{item.created_at}</td>
                            <td className='text-center'>
                                <CompactStepper item={item} />
                            </td>
                        </tr>
                    ))}
                    {items?.length === 0 && (
                        <tr>
                            <td colSpan={8} className='text-center text-muted py-4'>Tiada rekod.</td>
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
        </Container>
    )
}

export default UserRequestedItems
