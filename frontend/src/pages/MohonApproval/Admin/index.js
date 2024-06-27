import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';
import { Alert, Badge, Button } from 'react-bootstrap';
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
            <MohonIndex />
        </div>
    );
};

export default MohonApprovalByAdmin;