import { React, useState , useEffect} from 'react'
import axios from '../../libs/axios'
import {
    useParams, useSearchParams
  } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListItem from './ListItem';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
//import Card from 'react-bootstrap/esm/Card';
import { Helmet } from 'react-helmet-async';


const Candidate = () => {
    let { stateName } = useParams()
    const { regionCode } = useParams()
    let { regionName} = useParams()
    const { candidateId } = useParams()
    const [ candidate, setCandidate] = useState(null)
    const [ logs, setLogs] = useState([])

    //let { state, district, area, number, name } = useParams();

    // Convert to lowercase and replace spaces with hyphens
    const stateNameUrl = stateName.toLowerCase().replace(/ /g, '-');
    const regionNameUrl = regionName.toLowerCase().replace(/ /g, '-');
    /**
     * To fetch data from API
     * @param Int candidateId
     */
    // useEffect(() => {
    //     //Runs only on the first render
    //     getCandidateData(candidateId, setCandidate)
    // }, [candidateId])

    useEffect(() => {
       
        // loading for 1st time
       getCandidateData(candidateId, setCandidate, setLogs)
        
        const intervalId = setInterval(() => {
           getCandidateData(candidateId, setCandidate, setLogs)
        }, 1000 * 5) // in milliseconds

    

        return () => clearInterval(intervalId)
        
    }, [candidateId])
    

    const flag = (stateName) => {
        return (
            <img alt={stateName}  src={'/img/flags/' + stateNameUrl + '.png' }  className="img-fluid" width="60px" />
        )
    }


    return (
    <>

    <Container className="p-3">
   
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                    <FontAwesomeIcon icon="fas fa-home" />
            </Breadcrumb.Item>

            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" + stateNameUrl }}>
                {stateName.toLocaleUpperCase()}
            </Breadcrumb.Item>

            
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" + stateNameUrl  + "/" + regionCode + "/" + regionNameUrl }}>
                {regionCode} {regionName.toUpperCase()}
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Maklumat calon</Breadcrumb.Item>
        </Breadcrumb>
     

        <Row>
            <Col>
                <div className="card">
                    <div className="card-body">
                        <Row>
                            <Col>
                                {flag(stateName)}
                            </Col>
                            <Col >
                                <h5 className="card-title">{stateName.toUpperCase()} - {regionCode} {regionName.toUpperCase()}</h5>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
        
        <div className="card mt-3">
            <div className="card-body">
                { candidate ? 
                    <>

                        <Helmet>
                            <>
                            <title>PRN15 RTM -  {candidate?.candidate_name?.toUpperCase()} </title>
                            <meta 
                                name='description' 
                                content={`Calon pilihanraya kawasan ${regionCode} - ${regionName} negeri ${stateName}`}
                            />
                            <meta property="og:title" content={`${candidate?.candidate_name?.toUpperCase()} Calon pilihanraya kawasan ${regionCode} - ${regionName} negeri ${stateName}`} />
                            <meta property="og:url" content={ 'https://pilihanraya.rtm.gov.my/' + stateName + '/' + regionCode + '/' + regionName + '/' + candidate.id + '/' +  candidate.slug } />
                            <meta
                                property="og:image"
                                content={candidate.url ?? "https://pilihanraya.rtm.gov.my/img/logo_pru.png"}
                                />
                            </>
                        
                        </Helmet>
                        <Row>
                            <h2>{candidate.candidate_title?.toUpperCase()} {candidate.candidate_name?.toUpperCase()}</h2>
                        </Row>

                        <Row className='mt-3'>
                            
                            <Col md={3} className='mt-2'>
                                {candidate.url ? (
                                    <Image alt={candidate.candidate_name?.toUpperCase()} src={candidate.url} style={{ width:'200px', border: '1px solid #DCDCDC'}} thumbnails />
                                ) : (
                                    <Image alt={candidate.candidate_name?.toUpperCase()} src="/img/no-image.png" style={{ width:'200px', border: '1px solid #DCDCDC'}} thumbnails />
                                )}
                    
                                {/* {candidate.party_coalition_url ? (
                                    <Image alt={candidate.candidate_name?.toUpperCase()} src={candidate.party_coalition_url} style={{ width:'200px', border: '1px solid #DCDCDC'}} thumbnails />
                                ) : (
                                   <></>
                                )} */}
                          
                            </Col>


                            <Col md={8} className='mt-2'>
                                <ListItem item='Wakil' value={`${stateName?.toUpperCase()} - ${regionCode} - ${regionName?.toUpperCase()}`} />
                                <ListItem item='Parti' value={candidate.party_name?.toUpperCase()} />

                                { candidate.party_coalition_url ?
                                <ListItem item='Calon' value={<Image alt={candidate.candidate_name?.toUpperCase()} src={candidate.party_coalition_url} style={{ width:'70px', border: '1px solid #DCDCDC'}} thumbnails />} />
                                :
                                <ListItem item='Parti' value={candidate.party_coalition?.toUpperCase()} />
                                }
                            </Col>
                        </Row>
            
                    </>
                    : <p className='text-muted'>Belum ada pencalonan</p>
                }
            </div>
        </div>

        { logs && 
        <div className="card mt-3">
            <div className="card-body">
                <Row>
                    <Col><strong>KEMASKINI</strong></Col>
                    <Col><strong>JUMLAH UNDI</strong></Col>
                </Row>
                    
                { logs.map(log => 
              
                    <Row>
                        <Col>{log.last_updated}</Col>
                        <Col>{log.official_count}</Col>
                    </Row>
                    
                )}
                
            </div>
        </div>
        }
        </Container>
        
    </>
    )
}




/**
 * 
 * Get detailed Candidate data from API
 * and return as JSON
 * 
 * @param Int candidateId
 * @return JSON 
 * 
 */
function getCandidateData(candidateId, setCandidate, setLogs){
    //console.log(`get candidate from server - ${candidateId}`)
    axios({
        url:  `${process.env.REACT_APP_BACKEND_URL}/prn-nominations/${candidateId}/show-candidate-data`,   
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then( function(json){
        //console.log(json.data.logs)
        setCandidate(json.data.candidate)
        setLogs(json.data.logs)
    })
    .catch ( function(error){
        //console.log(error.response.data)
    })
}

export default Candidate