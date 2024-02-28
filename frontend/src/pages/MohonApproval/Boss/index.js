import { Link } from 'react-router-dom';
import Index from './components/Index';

const MohonApprovalByBoss = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-boss'>Agihan</Link></li>
                    <li className="breadcrumb-item">Senarai Permohonan agihan</li>
                </ol>
            </nav>
            <Index />
        </div>
    );
};

export default MohonApprovalByBoss;