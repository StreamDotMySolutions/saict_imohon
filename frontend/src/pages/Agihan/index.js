import { Link, useParams } from 'react-router-dom'
import useStore from './store'
import { useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Badge, Table, Col, Row } from 'react-bootstrap'

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
                <Col className="m-2 p-3 border border-1">
                    {response.mohon_distribution_requests?.length > 0 ?
                    <>
                    <h5>Agihan</h5>
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th className='text-center'>Items</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            { response.mohon_distribution_requests?.map( (request,index) => (
                                <tr>
                                    <td>{request.id}</td>
                                    <td>{request.title}</td>
                                    <td>{request.description}</td>
                                    <td className='text-center'>{request.mohon_distribution_items_count}</td>
                                    <td>{request.created_at}</td>
                                </tr>
                
                            ))}
              
                        </tbody>
                    </Table>
                    </>
                    :
                    <h5>Tiada agihan</h5>
                    }

                    

                </Col>
                {/* <Col className="m-2 border border-1">
                
                </Col> */}
            </Row>
            
        </div>
    );
};

export default Index;