import { Link, useParams, useNavigate} from 'react-router-dom'
import useMohonItemStore from './store'
import { useState } from 'react'
import axios from '../../libs/axios'
import MohonItemIndex from './components/MohonItemIndex'

const MohonDistributionItem = () => {
  const { mohonDistributionRequestId } = useParams()
  const navigate = useNavigate()
  const store = useMohonItemStore()
  const [title, setTitle] = useState('')
  const [step, setStep] = useState('')

  axios({
    'method' : 'get',
    'url' : `${store.mohonDistributionUrl}/${mohonDistributionRequestId}`
    })
    .then( response => {
        //console.log('get mohon_approval')
        //console.log(response.data)
        let mohon = response.data.mohon
        //store.setValue('title', mohon.title) // set formValue
        setTitle(mohon.title)
        setStep(mohon.mohon_distribution_approval.step)
        //store.setValue('description', mohon.description) // set formValue
    })
    .catch ( error => {
        console.warn(error)
    })

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link onClick={() => navigate(-1)} >Mohon</Link></li>
                    <li class="breadcrumb-item">{title}</li>
                </ol>
            </nav>
            <MohonItemIndex mohonRequestId={mohonDistributionRequestId} step={step} /> 
        </div>
    );
};

export default MohonDistributionItem;