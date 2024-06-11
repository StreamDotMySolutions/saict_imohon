import { Link, useParams, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Container,Tabs,Tab, Badge } from 'react-bootstrap'
import axios from '../../libs/axios'
import Index from './components/Index'
// import MohonRequest from './components/MohonRequest'
import MohonRequest from '../Mohon/components/MohonRequest'
import useStore from './store'

const MohonDistributionRequest = () => {

    const { mohonRequestId } = useParams()
    const navigate = useNavigate()
    const store = useStore()
    const [requests, setRequests] = useState([])
    const [title, setTitle] = useState('')
    const [step, setStep] = useState('')


    // console.log( `${store.mohonUrl}/${mohonRequestId}`)
    axios({
        'method' : 'get',
        'url' : `${store.mohonUrl}/${mohonRequestId}`
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
                    <li className="breadcrumb-item"><Link to='/mohon-approval/by-admin'><Badge>AGIHAN</Badge></Link></li>
                    <li className="breadcrumb-item"><Badge>{mohonRequestId}</Badge>{' '}{title}</li>
                    <li className="breadcrumb-item">Senarai Agihan</li>
                </ol>
            </nav>
            <Container className='p-1'>
                <Tabs
                    defaultActiveKey="mohon-distribution-requests"
                    id="userTab"
                    className="mb-3"
                    //onSelect={HandleTabChange}
                >
                    <Tab eventKey="mohon-distribution-requests" title="Agihan">
                        <Index />
                    </Tab>

                    <Tab eventKey="mohon-request" title="Permohonan">
                        <MohonRequest />
                    </Tab>
                
                </Tabs>
            </Container>

           
        </div>
    );
};

export default MohonDistributionRequest;