import { Link, useParams, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Table,Pagination, Button } from 'react-bootstrap'
import axios from '../../libs/axios'
import MohonIndex from './components/MohonIndex'
import useStore from './store'

const MohonDistributionRequest = () => {

    const { mohonRequestId } = useParams()
    const navigate = useNavigate()
    const store = useStore()
    const [requests, setRequests] = useState([])
    const [title, setTitle] = useState('')
    const [step, setStep] = useState('')

   
    axios({
        'method' : 'get',
        'url' : `${store.mohonRequestUrl}/${mohonRequestId}`
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
                    <li class="breadcrumb-item"><Link to='/mohon'>Mohon</Link></li>
                    <li class="breadcrumb-item">{title}</li>
                    <li class="breadcrumb-item">Senarai Permohonan Agihan</li>
                </ol>
            </nav>
            {/* <MohonIndex /> */}
        </div>
    );
};

export default MohonDistributionRequest;