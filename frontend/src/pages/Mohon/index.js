import { useState } from 'react';
import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';
import { Badge, Nav } from 'react-bootstrap';

const TABS = [
    { key: 'aktif',   label: 'Aktif',   bg: 'warning', text: 'dark'  },
    { key: 'selesai', label: 'Selesai', bg: 'success', text: 'white' },
    { key: 'gagal',   label: 'Gagal',   bg: 'danger',  text: 'white' },
];

const Mohon = () => {
    const [tab, setTab] = useState('aktif');

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon'><Badge>Mohon</Badge></Link></li>
                    <li className="breadcrumb-item">Senarai Permohonan</li>
                </ol>
            </nav>

            <Nav variant='tabs' className='mb-3'>
                {TABS.map(t => (
                    <Nav.Item key={t.key}>
                        <Nav.Link
                            active={tab === t.key}
                            onClick={() => setTab(t.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Badge bg={t.bg} text={t.text} className='me-1'>&nbsp;</Badge>
                            {t.label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            <MohonIndex key={tab} tab={tab} />
        </div>
    );
};

export default Mohon;
