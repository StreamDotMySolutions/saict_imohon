import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';

const Mohon = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/mohon'>Mohon</Link></li>
                    <li class="breadcrumb-item">Senarai Permohonan</li>
                </ol>
            </nav>
            <MohonIndex />
        </div>
    );
};

export default Mohon;