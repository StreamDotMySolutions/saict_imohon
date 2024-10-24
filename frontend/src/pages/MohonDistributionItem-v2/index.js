import { Link, useParams, useNavigate} from 'react-router-dom'
import useMohonItemStore from './store'
import { useState } from 'react'
import axios from '../../libs/axios'
import MohonItemIndex from './components/MohonItemIndex'
import MohonDistributionItemIndex from './components/MohonDistributionItemIndex'
import { Alert, Badge, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MohonDistributionItem = () => {
  const { mohonDistributionRequestId } = useParams()
  const navigate = useNavigate()
  const store = useMohonItemStore()
  const [title, setTitle] = useState('')
  const [step, setStep] = useState('')
  const [mohonRequestId, setMohonRequestId] = useState('')
  const [response, setResponse] = useState([])

  axios({
    'method' : 'get',
    'url' : `${store.mohonDistributionUrl}/${mohonDistributionRequestId}`
    })
    .then( response => {
        //console.log('get mohon_approval')
        //console.log(response.data.mohon)
        setResponse(response.data.mohon)
        let mohon = response.data.mohon
        //setMohon(mohon.mohon_)
        //store.setValue('title', mohon.title) // set formValue
        setTitle(mohon.title)
        setStep(mohon.mohon_distribution_approval.step)
        setMohonRequestId(mohon.mohon_request_id)
        //store.setValue('description', mohon.description) // set formValue
    })
    .catch ( error => {
        console.warn(error)
    })

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/mohon-approval/by-admin" ><Badge>AGIHAN</Badge></Link></li>
                    <li className="breadcrumb-item">
                        <Link to={`/mohon-distribution-requests/${mohonRequestId}`}><Badge>{response.mohon_request?.id}</Badge>{' '}Senarai Agihan</Link>
                    </li>
                
                    <li className="breadcrumb-item"><Badge>{mohonDistributionRequestId}</Badge> Senarai Peralatan</li>
                </ol>
            </nav>
            {/* <MohonItemIndex mohonRequestId={mohonDistributionRequestId} step={step} />  */}
            <MohonDistributionItemIndex agihanRequestId={mohonDistributionRequestId} step={step} />
        </div>
    );
};

export default MohonDistributionItem;