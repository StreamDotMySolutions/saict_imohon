import { Link, useParams } from 'react-router-dom'
import useStore from './store'
import { useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Badge, Table, Col, Row, Button } from 'react-bootstrap'
import ViewModal from './modals/ViewModal'

const Index = () => {
  const { mohonRequestId } = useParams()
  const store = useStore()
  const [response, setResponse] = useState([])

  useEffect( () => {
    axios({
        'method' : 'get',
        'url' : `${store.mohonRequestUrl}/${mohonRequestId}`
        })
        .then( response => {
            console.log(response)
            setResponse(response.data.mohon)
        })
        .catch ( error => {
            console.warn(error)
        })
  },[mohonRequestId])


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/mohon'><Badge>Mohon</Badge></Link></li>
                    <li className="breadcrumb-item"><Link to={`/mohon/${mohonRequestId}`}><Badge>{mohonRequestId}</Badge>{' '}{response.title}</Link></li>
                    <li className="breadcrumb-item">Senarai agihan</li>
                </ol>
            </nav>


            {/* <img src="https://drive.google.com/thumbnail?id=1KxGsl4KE1RG_zaaCitJwgzcRsR1evK6G&sz=w500"></img> */}

            <Row>
                <Col>
                {response.mohon_distribution_requests?.length > 0 ?
                <>
                 { response.mohon_distribution_requests?.map( (distribution,index) => (
                    <>
                    <div className='p-3 border border-2 rounded mb-3'>
                        
                    <h3><Badge>{distribution.id}</Badge>{' '}{distribution.title}</h3>
                    <Table style={{'width':'500px'}}>
                        <tr>
                            <th>Maklumat</th>
                            <th>Pelulus</th>
                            <th>Tarikh</th>
                        </tr>
                        <tr>
                            <td>{distribution.description}</td>
                            <td>{distribution.user.email}</td>
                            <td>{distribution.created_at}</td>
                        </tr>
                    </Table>

                    <h5 className='mt-2'>Peralatan</h5>
                    <hr />
                    <Table>
                            <thead>
                                <tr>
                                    <th style={{ 'width': '20px'}}>ID</th>
                                    <th>Item</th>
                                    <th>Jenis</th>
                                    <th>Penerangan</th>
                                    <th>Status</th>
                                    <th>Tarikh Terima</th>
                                    <th style={{ 'width': '200px'}}>Tindakan</th>
                            
                                </tr>
                            </thead>

                            <tbody>
                                {distribution?.mohon_distribution_items?.map((item,index) => (
                                    <tr key={index}>
                                        <td> <span className="badge bg-primary">{item.id}</span></td>
                                        <td>{item.category?.name}</td>
                                        <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                                        <td>{item.description}</td>
                                        <td>
                                        {item.received_status == 1 ?
                                        <>
                                            Diterima 
                                        </>
                                        :
                                        <>
                                            Belum terima
                                        </>
                                        }

                                        </td>
                                        <td>
                                            {item.received_at}
                                        </td>
                                        <td>
                                           <ViewModal id={item.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </Table>
                    </div>       
                 </>
                 ))}
                 
                </>
                :
                <h5>Tiada Agihan</h5>
                }
                </Col>
            </Row>
            
        </div>
    );
};

export default Index;