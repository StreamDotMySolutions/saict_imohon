import { Link, useParams, useNavigate} from 'react-router-dom'
import useMohonStore from '../Mohon/store'
import { useState } from 'react'
import axios from '../../libs/axios'
import MohonItemIndex from './components/MohonItemIndex'

const MohonItem = () => {
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
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon'>Mohon</Link></li>
                    <li className="breadcrumb-item">{title}</li>
                    <li className="breadcrumb-item">Peralatan</li>
                </ol>
            </nav>
            <MohonItemIndex mohonRequestId={mohonRequestId} step={step} /> 
        </div>
    );
};

export default MohonItem;