import { Link } from 'react-router-dom';
import Index from './components/Index';
import { Badge } from 'react-bootstrap';

const MohonApprovalByBoss = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-boss'><Badge>AGIHAN</Badge></Link></li>
                    <li className="breadcrumb-item">Senarai permohonan agihan</li>
                </ol>
            </nav>
            <Index />
        </div>
    );
};

export default MohonApprovalByBoss;