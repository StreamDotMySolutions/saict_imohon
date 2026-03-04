import { useState } from 'react';
import { Link } from 'react-router-dom';
import Index from './components/Index';
import { Badge, Nav } from 'react-bootstrap';

const TABS = [
    { key: 'pending',  label: 'Menunggu', bg: 'warning', text: 'dark'  },
    { key: 'approved', label: 'Lulus',    bg: 'success', text: 'white' },
    { key: 'rejected', label: 'Gagal',    bg: 'danger',  text: 'white' },
];

const MohonApprovalByBoss = () => {
    const [tab, setTab] = useState('pending');

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-boss'><Badge>AGIHAN</Badge></Link></li>
                    <li className="breadcrumb-item">Senarai permohonan agihan</li>
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

            <Index key={tab} status={tab} />
        </div>
    );
};

export default MohonApprovalByBoss;
