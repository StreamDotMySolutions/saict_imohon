import { Link, useParams, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Container,Tabs,Tab, Badge, Alert, Button } from 'react-bootstrap'
import axios from '../../libs/axios'
import Index from './components/Index'
// import MohonRequest from './components/MohonRequest'
import MohonRequest from '../Mohon/components/MohonRequest'
import useStore from './store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                    <li className="breadcrumb-item"><Badge>{mohonRequestId}</Badge> Senarai Agihan</li>
                </ol>
            </nav>

            <Alert variant='warning'>
                <FontAwesomeIcon icon={'fas fa-info'} style={{fontSize: '1.5rem'}} /> Maklumat <br />
                <hr />
                {' '}
                <ol>
                    <li>
                       Tab <strong>Agihan</strong> ialah untuk senarai Agihan yang ingin dibuat terhadap permohonan <Badge>{mohonRequestId}</Badge>
                    </li>
                    <li>
                        Setiap <strong>Agihan</strong> akan mempunyai set peralatan tersendiri. Bayangkan permohonan mohon 20 unit PC,
                        tapi memerlukan 2 batch Agihan yang berjumlah 10 PC setiap satu, maka ia boleh dipecahkan kepada 2 Batch Agihan.
                    </li>
                    <li>
                        Tab <strong>Permohonan</strong> ialah untuk melihat maklumat permohonan <Badge>{mohonRequestId}</Badge>.
                    </li>
             
             
                    <li>
                    Butang <Button className={'bg-light text-dark'} size={'sm'} variant='primary'>Tambah</Button> untuk mencipta Agihan. Selepas itu anda kena masukkan peralatan yang ingin diagih.
                    </li>
                    <li>
                    Butang <Button className={'bg-light text-dark mt-2'} size={'sm'} variant='danger'>Hapus</Button> untuk menghapuskan Agihan yang telah dibuat tapi belum dimohon ke Pelulus-2.
                    </li>

                    <li>
                    Butang <Button className={'bg-light text-dark mt-2'} size={'sm'} variant='dark'>Peralatan</Button> untuk megurus peralatan yang disusun di bawah Agihan.
                    </li>

                    <li>
                        <strong>Jumlah Peralatan</strong> mewakili jumlah peralatan terkumpul dalam setiap Agihan. Setiap Agihan akan mempunyai jumlah peralatan masing-masing.
                    </li>
                    <li>
                        <strong>Tarikh</strong> mewakili bila Agihan dicipta.
                    </li>
                    <li>
                        Untuk mengesahkan permohonan <strong>Agihan</strong>, klik butang <Button className={'bg-light text-dark'} size={'sm'} variant='dark'>Peralatan</Button> dan Mohon selepas menambah peralatan.
                    </li>
                </ol>
            </Alert>
            <Container className='p-1'>
                {/* <Tabs
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
                
                </Tabs> */}
                <Index />
            </Container>

           
        </div>
    );
};

export default MohonDistributionRequest;