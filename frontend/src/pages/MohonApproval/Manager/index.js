import { Link } from 'react-router-dom';
import MohonIndex from './components/MohonIndex';
import { Badge } from 'react-bootstrap';
import { Container,Tabs,Tab } from 'react-bootstrap';


const MohonApprovalByManager = () => {

    const HandleTabChange = (key) => {
        //console.log(key)
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-manager'><Badge>Mohon</Badge></Link></li>
                    <li className="breadcrumb-item">Senarai Permohonan</li>
                </ol>
            </nav>
            
            <Container className='p-1'>
        <Tabs
          defaultActiveKey="pending"
          id="userTab"
          className="mb-3"
          onSelect={HandleTabChange}
        >
            <Tab eventKey="pending" title="Menunggu">
                <MohonIndex status='pending'/>    
            </Tab>

            <Tab eventKey="approved" title="Lulus">
                <MohonIndex  status='approved' />    
            </Tab>

            <Tab eventKey="rejected" title="Gagal">
                <MohonIndex  status='rejected' />    
            </Tab>

          
         
        </Tabs>
      </Container>
        </div>
    );
};

export default MohonApprovalByManager;