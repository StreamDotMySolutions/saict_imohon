import { useEffect, useState } from 'react'
import { Badge, Card, Col, Container, Row, Spinner, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../libs/axios'

const StatCard = ({ icon, label, value, bg = 'primary', iconColor }) => (
    <Card className='h-100 border-0 shadow-sm'>
        <Card.Body className='d-flex align-items-center gap-3'>
            <div
                style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `var(--bs-${bg})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, opacity: 0.9,
                }}
            >
                <FontAwesomeIcon icon={icon} style={{ color: '#fff', fontSize: '1.2rem' }} />
            </div>
            <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.1 }}>{value ?? '–'}</div>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 2 }}>{label}</div>
            </div>
        </Card.Body>
    </Card>
)

const AdminDashboard = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios({ method: 'get', url: `${apiUrl}/admin/dashboard` })
            .then(res => { setData(res.data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    if (loading) return (
        <Container className='text-center py-5'>
            <Spinner animation='border' variant='primary' />
        </Container>
    )

    const u = data?.users ?? {}
    const inv = data?.inventory ?? {}
    const wf = data?.workflow ?? {}
    const ri = data?.requested_items ?? {}

    return (
        <Container>
            <h4 className='mb-1'>Dashboard</h4>
            <p className='text-muted'>Ringkasan aktiviti sistem.</p>
            <hr />

            {/* Row 1 — Users */}
            <p className='text-uppercase fw-semibold mb-2' style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.06em' }}>
                Pengguna
            </p>
            <Row className='g-3 mb-4'>
                <Col xs={6} md={4} lg={2}>
                    <StatCard icon='fa-solid fa-user' label='Pengguna' value={u.user} bg='primary' />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <StatCard icon='fa-solid fa-user-shield' label='Admin' value={u.admin} bg='danger' />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <StatCard icon='fa-solid fa-user-check' label='Pelulus 1' value={u.manager} bg='success' />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <StatCard icon='fa-solid fa-user-tie' label='Pelulus 2' value={u.boss} bg='warning' />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <StatCard icon='fa-solid fa-user-clock' label='Belum Aktif' value={u.pending} bg='secondary' />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <StatCard icon='fa-solid fa-building' label='Jabatan' value={u.departments} bg='info' />
                </Col>
            </Row>

            {/* Row 2 — Inventory */}
            <p className='text-uppercase fw-semibold mb-2' style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.06em' }}>
                Inventori
            </p>
            <Row className='g-3'>
                {/* Category breakdown */}
                <Col md={6}>
                    <Card className='h-100 border-0 shadow-sm'>
                        <Card.Body>
                            <Card.Title style={{ fontSize: '0.9rem', fontWeight: 600, color: '#555' }}>
                                <FontAwesomeIcon icon='fa-solid fa-computer' className='me-2' style={{ color: 'var(--bs-primary)' }} />
                                Jumlah Item mengikut Kategori
                            </Card.Title>
                            {inv.by_category?.length > 0 ? (
                                <Table size='sm' className='mt-2 mb-0'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Kategori</th>
                                            <th className='text-center'>Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inv.by_category.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.category}</td>
                                                <td className='text-center'>
                                                    <Badge bg='primary'>{row.total}</Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p className='text-muted mt-3' style={{ fontSize: '0.85rem' }}>Tiada rekod inventori.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Dicadangkan + Disahkan */}
                <Col md={6}>
                    <Row className='g-3 h-100'>
                        <Col xs={6}>
                            <StatCard
                                icon='fa-solid fa-clipboard-list'
                                label='Dicadangkan Agihan'
                                value={inv.dicadangkan}
                                bg='warning'
                            />
                        </Col>
                        <Col xs={6}>
                            <StatCard
                                icon='fa-solid fa-circle-check'
                                label='Disahkan Agihan'
                                value={inv.disahkan}
                                bg='success'
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Row 3 — Peralatan Dimohon */}
            <p className='text-uppercase fw-semibold mb-2 mt-4' style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.06em' }}>
                Peralatan Dimohon
            </p>
            <Row className='g-3'>
                <Col xs={6} md={3}>
                    <StatCard icon='fa-solid fa-file-pen' label='Jumlah Dimohon' value={ri.total} bg='primary' />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard icon='fa-solid fa-boxes-stacked' label='Diluluskan Agihan' value={ri.agihan} bg='info' />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard icon='fa-solid fa-clipboard-check' label='Telah Diterima' value={ri.diterima} bg='success' />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard icon='fa-solid fa-xmark' label='Ditolak' value={ri.ditolak} bg='danger' />
                </Col>
            </Row>

            {/* Row 4 — Workflow */}
            <p className='text-uppercase fw-semibold mb-2 mt-4' style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.06em' }}>
                Aliran Kerja
            </p>
            <Row className='g-3'>
                <Col xs={6} md={3}>
                    <StatCard
                        icon='fa-solid fa-file-pen'
                        label='Permohonan'
                        value={wf.permohonan}
                        bg='primary'
                    />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard
                        icon='fa-solid fa-truck'
                        label='Agihan'
                        value={wf.agihan}
                        bg='info'
                    />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard
                        icon='fa-solid fa-box-open'
                        label='Penghantaran'
                        value={wf.penghantaran}
                        bg='warning'
                    />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard
                        icon='fa-solid fa-handshake'
                        label='Penerimaan'
                        value={wf.penerimaan}
                        bg='success'
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminDashboard
