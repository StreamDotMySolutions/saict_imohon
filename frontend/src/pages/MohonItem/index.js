import { Link, useParams, useNavigate} from 'react-router-dom'
import useMohonStore from '../Mohon/store'
import { useState, useEffect } from 'react'
import axios from '../../libs/axios'
import MohonItemIndex from './components/MohonItemIndex'
import { Badge } from 'react-bootstrap'

const MohonItem = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL
  const { mohonRequestId } = useParams()
  const navigate = useNavigate()
  const store = useMohonStore()
  const [title, setTitle] = useState('')
  const [step, setStep] = useState('')

  useEffect(() => {
    axios({
      'method' : 'get',
      'url' : `${apiUrl}/user/mohon-requests/${mohonRequestId}`
    })
    .then( response => {
        let mohon = response.data.mohon
        setTitle(mohon.title)
        setStep(mohon.mohon_approval.step)
    })
    .catch ( error => {
        console.warn(error)
    })
  }, [mohonRequestId])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon'><Badge>Mohon</Badge></Link></li>
                    <li className="breadcrumb-item"><Link to={`/mohon/${mohonRequestId}`}>{title}</Link></li>
                    <li className="breadcrumb-item">Senarai peralatan</li>
                </ol>
            </nav>
        
            <MohonItemIndex mohonRequestId={mohonRequestId} step={step} /> 
        </div>
    );
};

export default MohonItem;