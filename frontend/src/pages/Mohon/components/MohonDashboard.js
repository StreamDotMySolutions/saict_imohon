import { Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StatCard = ({ icon, label, value, bg = 'primary' }) => (
    <Card className='h-100 border-0 shadow-sm'>
        <Card.Body className='d-flex align-items-center gap-3'>
            <div style={{ width: 48, height: 48, borderRadius: 12,
                          background: `var(--bs-${bg})`, display: 'flex',
                          alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={icon} style={{ color: '#fff', fontSize: '1.2rem' }} />
            </div>
            <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{value ?? '–'}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>{label}</div>
            </div>
        </Card.Body>
    </Card>
)

const MohonDashboard = ({ stats }) => (
    <Row className='g-3'>
        <Col xs={6} md={3}>
            <StatCard icon='fa-solid fa-list' label='Jumlah Permohonan' value={stats?.total} bg='primary' />
        </Col>
        <Col xs={6} md={3}>
            <StatCard icon='fa-solid fa-clock' label='Aktif' value={stats?.aktif} bg='warning' />
        </Col>
        <Col xs={6} md={3}>
            <StatCard icon='fa-solid fa-check-circle' label='Selesai' value={stats?.selesai} bg='success' />
        </Col>
        <Col xs={6} md={3}>
            <StatCard icon='fa-solid fa-times-circle' label='Gagal' value={stats?.gagal} bg='danger' />
        </Col>
    </Row>
)

export default MohonDashboard
