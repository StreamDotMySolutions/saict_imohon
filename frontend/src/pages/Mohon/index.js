import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';
import MohonDashboard from './components/MohonDashboard';
import { Badge, Nav, Container, Row, Col } from 'react-bootstrap';
import axios from '../../libs/axios';
import CreateModal from './modals/CreateModal';

const TABS = [
    { key: 'papan-pemuka', label: 'Papan Pemuka' },
    { key: 'aktif',   label: 'Aktif',   bg: 'warning', text: 'dark'  },
    { key: 'selesai', label: 'Selesai', bg: 'success', text: 'white' },
    { key: 'gagal',   label: 'Gagal',   bg: 'danger',  text: 'white' },
];

const Mohon = () => {
    const [tab, setTab] = useState('papan-pemuka');
    const [stats, setStats] = useState(null);
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        axios({ method: 'get', url: `${apiUrl}/user/mohon-requests/stats` })
            .then(r => setStats(r.data.stats))
            .catch(error => console.warn(error));
    }, []);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon'><Badge>Mohon</Badge></Link></li>
                    <li className="breadcrumb-item">Senarai Permohonan</li>
                </ol>
            </nav>

            <Container>
                {/* Page header */}
                <Row className='align-items-center mb-3'>
                    <Col>
                        <h3 className='mb-0'>Permohonan Saya</h3>
                        <small className='text-muted'>Senarai semua permohonan peralatan yang telah anda buat.</small>
                    </Col>
                    <Col xs='auto'>
                        {tab !== 'papan-pemuka' && <CreateModal />}
                    </Col>
                </Row>
                <hr />
            </Container>

            <Nav variant='tabs' className='mb-3'>
                {TABS.map(t => (
                    <Nav.Item key={t.key}>
                        <Nav.Link
                            active={tab === t.key}
                            onClick={() => setTab(t.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            {t.bg && <Badge bg={t.bg} text={t.text} className='me-1'>&nbsp;</Badge>}
                            {t.label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            {tab === 'papan-pemuka' && <Container><MohonDashboard stats={stats} /></Container>}
            {tab !== 'papan-pemuka' && <MohonIndex key={tab} tab={tab} />}
        </div>
    );
};

export default Mohon;
