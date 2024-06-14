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
            //console.log(response)
            setResponse(response.data.mohon)
        })
        .catch ( error => {
            console.warn(error)
        })
  },[mohonRequestId, store.getValue('refresh')])


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
                
                    <div className='p-3 border border-2 rounded mb-3' key ={index}>
             

                        <h2 className='mt-2'><Badge>{distribution.id}</Badge>{' '}Peralatan Agihan</h2>
                    
                        <Table>
                                <thead>
                                    <tr>
                                        <th style={{ 'width': '20px'}}>ID</th>
                                        <th>Peralatan</th>
                                        <th>Jenis</th>
                                        <th className='text-center'>Pemohon</th>
                                      
                                        <th className='text-center'>Jangkamasa Penghantaran</th>
                                      
                                        <th className='text-center'>Status Penerimaan</th>
                                        <th className='text-center'>Tarikh Pengesahan Penerimaan</th>
                                        <th className='text-center' style={{ 'width': '200px'}}>Tindakan</th>
                                
                                    </tr>
                                </thead>

                                <tbody>
                                    {distribution?.mohon_distribution_items?.map((item,index) => (
                                        <tr key={index}>
                                            <td> <span className="badge bg-primary">{item.id}</span></td>
                                            <td>{item.category?.name}</td>
                                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                                            <td className='text-center'>{item.mohon_item?.name}</td>
                                            
                                            <td className='text-center'>

                                            {item.mohon_distribution_item_delivery != null ?
                                            <Table className='rounded border ' style={{backgroundColor:"#f0f0f0"}}>
                                                    <thead>
                                                        <tr>
                                                            <th>Tarikh Mula</th>
                                                            <th>Tarikh Tamat</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{item.mohon_distribution_item_delivery?.date_start}</td>
                                                            <td>{item.mohon_distribution_item_delivery?.date_end}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            :
                                            <>Belum dibuat</>
                                            }
                                            </td>
                                          
                                            <td className='text-center'>
                                                {item.mohon_distribution_item_acceptance != null ?
                                                <>
                                                    Diterima 
                                                </>
                                                :
                                                <>
                                                    Belum terima
                                                </>
                                                }

                                            </td>
                                            <td  className='text-center'>
                                                {item.mohon_distribution_item_acceptance?.created_at}
                                            </td>
                                            <td  className='text-center'>
                                                {!item.mohon_distribution_item_acceptance?.created_at ?
                                                <>
                                                    {item.mohon_distribution_item_delivery != null ?
                                                    <ViewModal id={item.id} />
                                                    :
                                                    <Button size="sm" variant="info" disabled>
                                                        Pengesahan
                                                    </Button>
                                                    }
                                                </> 
                                                :
                                                <Badge>Telah disahkan pada {item.mohon_distribution_item_acceptance?.created_at}</Badge>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                        </Table>
                    </div>       
                
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