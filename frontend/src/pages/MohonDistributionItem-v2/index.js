import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../../libs/axios'
import MohonDistributionItemIndex from './components/MohonDistributionItemIndex'
import { Badge } from 'react-bootstrap'

const MohonDistributionItem = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL
  const { mohonDistributionRequestId } = useParams()
  const [mohonRequestId, setMohonRequestId] = useState('')

  useEffect(() => {
    axios({
      method: 'get',
      url: `${apiUrl}/admin/mohon-distribution/${mohonDistributionRequestId}`
    })
      .then(response => {
        setMohonRequestId(response.data.mohon.mohon_request_id)
      })
      .catch(error => {
        console.warn(error)
      })
  }, [mohonDistributionRequestId])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/mohon-approval/by-admin" ><Badge>AGIHAN</Badge></Link></li>
                    <li className="breadcrumb-item">
                        <Link to={`/mohon-distribution-requests/${mohonRequestId}`}>{' '}Senarai Agihan</Link>
                    </li>
                
                    <li className="breadcrumb-item"> Senarai Peralatan</li>
                </ol>
            </nav>
            <MohonDistributionItemIndex agihanRequestId={mohonDistributionRequestId} />
        </div>
    );
};

export default MohonDistributionItem;