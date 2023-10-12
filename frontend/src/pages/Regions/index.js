import { React, useState , useEffect} from 'react'
import axios from '../../libs/axios'
import {
    useParams, useSearchParams
  } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link} from 'react-router-dom'
//import Nav from 'react-bootstrap/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import RegionDetails from './components/RegionDetail';
import Candidates from './components/Candidates';
import LatestNews from './components/LatestNews';

/**
 * @returns HTML
 */
const Regions = () => {
    let { stateName } = useParams()
    const { regionCode } = useParams()
    let { regionName} = useParams()
    const [ candidates, setCandidates] = useState([])
    const [ details, setDetails] = useState([])
    const [ logs, setLogs] = useState([])

    const stateNameUrl = stateName.toLowerCase().replace(/ /g, '-');
    const regionNameUrl = regionName.toLowerCase().replace(/ /g, '-');

    useEffect(() => {
       
        // loading for 1st time
       getData(stateName, regionCode, setCandidates, setDetails, setLogs)
        
        const intervalId = setInterval(() => {
           getData(stateName, regionCode, setCandidates, setDetails, setLogs)
        }, 1000 * 5) // in milliseconds

        return () => clearInterval(intervalId)
        
    }, [regionName])

    const flag = (stateName) => {
        return (
            <img alt={stateName}  src={'/img/flags/' + stateNameUrl + '.png' }  className="img-fluid" width="60px" />
        )
    }
    const candidateDataUrl = '/' + stateNameUrl + '/' + regionCode + '/' + regionNameUrl + '/'

    return (
    <>
        <Container className='p-3'>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                    <FontAwesomeIcon icon="fas fa-home" />
                </Breadcrumb.Item>

                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" + stateNameUrl }}>
                    {stateName.toUpperCase()}
                </Breadcrumb.Item>

                <Breadcrumb.Item active>{regionCode} {regionName.toUpperCase()}</Breadcrumb.Item>
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

            <Row>
                <Col  className="order-sm-2" sm={8}>
                    <div className="card mt-3">
                        <div className="card-header">
                            NAMA CALON
                        </div>
                        <div className="card-body">
                            <Candidates 
                                candidates={candidates} 
                                candidateDataUrl={candidateDataUrl}
                            />
                        </div>
                    </div>
                </Col>
                <Col className="order-sm-1 mt-3">
                    <div className="card">
                        <div className="card-header">
                            Maklumat kawasan
                        </div>
                        <div className="card-body">
                            <RegionDetails details={details} />
                        </div>
                    </div>
                       
                    <div className="card mt-3">
                        <div className="card-header">
                            Maklumat terkini
                        </div>
                        <div className="card-body">
                            <LatestNews logs={logs} />
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    </>
    )
}



/**
 * Get regions under given stateName
 */
function getData(stateName,regionCode,setCandidates, setDetails, setLogs){
    //console.log(`get candidates from server - ${stateName}-${regionCode}`)
    axios({
        url:  `${process.env.REACT_APP_BACKEND_URL}/prn-variables/states/${stateName}/code/${regionCode}/get-candidates-data`,   
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then( function(json){
        //console.log(json.data)
        setLogs(json.data.logs)
        setDetails(json.data.details)
        setCandidates(json.data.candidates)
    })
    .catch ( function(error){
        //console.log(error.response.data)
    })
}

export default Regions