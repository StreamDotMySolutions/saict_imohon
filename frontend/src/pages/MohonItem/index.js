import { Link, useParams, useNavigate} from 'react-router-dom'
import useMohonStore from '../Mohon/store'
import { useState, useEffect } from 'react'
import axios from '../../libs/axios'
import MohonItemIndex from './components/MohonItemIndex'
import MohonItemDashboard from './components/MohonItemDashboard'
import { Badge, Nav, Container } from 'react-bootstrap'

const TABS = [
    { key: 'papan-pemuka', label: 'Papan Pemuka' },
    { key: 'senarai',      label: 'Senarai Peralatan' },
];

const MohonItem = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL
  const { mohonRequestId } = useParams()
  const navigate = useNavigate()
  const store = useMohonStore()
  const [title, setTitle] = useState('')
  const [step, setStep] = useState('')
  const [tab, setTab] = useState('papan-pemuka')
  const [stats, setStats] = useState(null)

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

  useEffect(() => {
    axios({
      'method' : 'get',
      'url' : `${apiUrl}/user/mohon-items/${mohonRequestId}/stats`
    })
    .then( response => {
        setStats(response.data.stats)
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

            <Nav variant='tabs' className='mb-3'>
                {TABS.map(t => (
                    <Nav.Item key={t.key}>
                        <Nav.Link
                            active={tab === t.key}
                            onClick={() => setTab(t.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            {t.key === 'papan-pemuka' && <Badge bg='info' className='me-1'>&nbsp;</Badge>}
                            {t.label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            {tab === 'papan-pemuka' && <Container><MohonItemDashboard stats={stats} /></Container>}
            {tab === 'senarai' && <MohonItemIndex key={tab} mohonRequestId={mohonRequestId} step={step} />}
        </div>
    );
};

export default MohonItem;