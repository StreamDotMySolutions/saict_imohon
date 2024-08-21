import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';
import { Alert, Badge, Button, Tab, Tabs } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MohonApprovalByAdmin = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-admin'><Badge>PERMOHONAN</Badge></Link></li>
                    <li className="breadcrumb-item">Senarai Permohonan</li>
                </ol>
            </nav>

            <Tabs
                defaultActiveKey="mohon_pending"
                className="mb-3"
                >
                <Tab eventKey="mohon_pending" title="Baharu">
                    <MohonIndex />
                </Tab>
                <Tab eventKey="mohon_approved" title="Lulus">
                    <MohonIndex />
                </Tab>
                <Tab eventKey="mohon_rejected" title="Gagal">
                    <MohonIndex />
                </Tab>

                <Tab eventKey="mohon_with_approved_agihan" title="Agihan">
                    <MohonIndex />
                </Tab>
         
            </Tabs>
            
         
        </div>
    );
};

export default MohonApprovalByAdmin;