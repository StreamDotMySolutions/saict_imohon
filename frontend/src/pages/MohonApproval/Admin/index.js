import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';


const MohonApprovalByAdmin = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-manager'>Mohon</Link></li>
                    <li className="breadcrumb-item">Senarai Permohonan</li>
                </ol>
            </nav>
            <MohonIndex />
        </div>
    );
};

export default MohonApprovalByAdmin;