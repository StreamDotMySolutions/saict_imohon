import { Link } from 'react-router-dom';
import Index from './components/Index';
import { Badge, Tab, Tabs } from 'react-bootstrap';

const MohonApprovalByBoss = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-boss'><Badge>AGIHAN</Badge></Link></li>
                    <li className="breadcrumb-item">Senarai permohonan agihan</li>
                </ol>
            </nav>

            <Tabs
                 defaultActiveKey="pending"
            >
                <Tab eventKey="pending" title="Menunggu Kelulusan">
                    <Index status={'pending'} />
                </Tab>
                <Tab eventKey="approved" title="Lulus">
                    <Index status={'approved'} />
                </Tab>
                <Tab eventKey="rejected" title="Gagal">
                    <Index status={'rejected'} />
                </Tab>
            </Tabs>
           
        </div>
    );
};

export default MohonApprovalByBoss;