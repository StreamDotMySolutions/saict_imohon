import { Link, useParams, useNavigate} from 'react-router-dom'
import useMohonStore from '../Mohon/store'
import { useState } from 'react'
import axios from '../../libs/axios'
import MohonItemIndex from './components/MohonItemIndex'

const MohonDistribution = () => {
  const { mohonRequestId } = useParams() 
  const navigate = useNavigate()
  const store = useMohonStore()
  const [title, setTitle] = useState('')
  const [step, setStep] = useState('')

  axios({
    'method' : 'get',
    'url' : `${store.submitUrl}/${mohonRequestId}`
    })
    .then( response => {
        //console.log('get mohon_approval')
        //console.log(response.data)
        let mohon = response.data.mohon
        //store.setValue('title', mohon.title) // set formValue
        setTitle(mohon.title)
        setStep(mohon.mohon_approval.step)
        //store.setValue('description', mohon.description) // set formValue
    })
    .catch ( error => {
        console.warn(error)
    })

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link onClick={() => navigate(-1)}>Mohon</Link></li>
                    <li class="breadcrumb-item">{title}</li>
                    <li class="breadcrumb-item">Senarai Agihan</li>
                </ol>
            </nav>
            <MohonItemIndex mohonRequestId={mohonRequestId} step={step} /> 
        </div>
    );
};

export default MohonDistribution;