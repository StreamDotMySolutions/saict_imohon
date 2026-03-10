import { useState } from 'react';
import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';
import { Badge, Nav } from 'react-bootstrap';

const TABS = [
    { key: 'pending',  label: 'Baharu', bg: 'warning', text: 'dark'  },
    { key: 'approved', label: 'Lulus',  bg: 'success', text: 'white' },
    { key: 'rejected', label: 'Gagal',  bg: 'danger',  text: 'white' },
];

const MohonApprovalByAdmin = () => {
    const [tab, setTab] = useState('pending');

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-admin'><Badge>PERMOHONAN</Badge></Link></li>
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

            <MohonIndex key={tab} status={tab} />
        </div>
    );
};

export default MohonApprovalByAdmin;
