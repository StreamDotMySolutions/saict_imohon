import React, { useState, useEffect } from 'react';
import axios from '../../libs/axios';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import LatestCandidate from './components/LatestCandidate';

const States = () => {
    const { stateName } = useParams();
    const [regions, setRegions] = useState([]);
    const [parties, setParties] = useState([]);
    const [candidates, setCandidates] = useState(0);

    useEffect(() => {
        getRegions(stateName, setRegions,setParties, setCandidates);
    }, [stateName]);

    const map = (stateName) => {
        return (
            <img alt={stateName} src={'/img/map/' + stateName + '.png'} className='img-fluid' width="100%" />
        )
    }

    const flag = (stateName) => {
        return (
        <img alt={stateName} src={'/img/flags/' + stateName + '.png' }  className="img-fluid" width="70px" />
        )
    }

    const renderParty = () => {
        if (parties.length === 0) {
            return <p></p>;
        }

        return (
        <>

        <div className="card-group">
            <div className="row row-cols-8">
                {parties.map((party) => (
                    <>
                        {party.total > 0 &&
                            <div key={party.title} className="col mb-4">
                                <div className="card text-center">
                                    <div className="card-body">
                                        <h1 className="card-title">{party.total}</h1>
                                        <p className="card-text">{party.title}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                ))}
            </div>
        </div>
        </>
        )
    }

    const renderTable = () => {
        if (regions.length === 0) {
            return <p></p>;
        }

        return (
            <>
            {/* <span className='mb-2'>Jumlah calon : <strong>{candidates} orang</strong></span> */}
            
            <button type="button" style={{ 'textDecoration':'none' }} className="mb-3 btn btn-light">
                Jumlah Calon  <span className="badge bg-secondary">{candidates}</span>
            </button>

            <Table className='mt-1'striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center" style={{width:'10px'}}>Kod</th>
                        <th>Nama Kawasan</th>
                        <th className="text-center" style={{width:'150px'}}>Calon</th>
                        <th style={{width:'20px'}}></th>
                    </tr>
                </thead>
                <tbody>
                    {regions.map((region) => (
                    <tr key={region.name}>
                        <td className="text-center">{region.code}</td>
                        <td>
                            <NavLink to={`${region.code}/${region.slug}`} className="text-decoration-none text-dark">
                                {region.name}
                            </NavLink>
                        </td>
                        <td className="text-center">
                            {region.prn_nominations_count !== 0 && (
                            <NavLink to={`${region.code}/${region.slug}`} className="text-decoration-none text-dark">
                                <strong>{region.prn_nominations_count}</strong> calon 
                            </NavLink>
                            )}
                        </td>
                        <td>
                            <NavLink to={`${region.code}/${region.slug}`} className="text-decoration-none text-dark">
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                            </NavLink>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            </>
        );
    }; // renderTable()

    return (
        <>
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                    <FontAwesomeIcon icon="fas fa-home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{stateName.toUpperCase()}</Breadcrumb.Item>
            </Breadcrumb>
            <Row className='justify-content-end'>
                <Col md={1} className='mt-2'> 
                    {flag(stateName)}
                </Col>
                <Col md={6}>
                    <h1>
                        {stateName.toUpperCase()}
                    </h1>
                </Col>
                <hr className="featurette-divider mt-3" />
            </Row>
            <Row>
                <Col md={6}>
                    <Card className='bg-light mb-3'>
                        <div className="d-flex justify-content-center">
                            {map(stateName)}
                        </div>
                    </Card>
                    {renderParty()}
                    {renderTable()}
           
                </Col>
                <Col md={6}>
   
                    <Card className='bg-light '>
                     
                        <LatestCandidate />
                       
                    </Card>                    
                </Col>
            </Row>

        </Container>
        </>
    );
};

function getRegions(stateName, setRegions,setParties, setCandidates) {
    axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/prn-variables/states/${stateName}/get-region-data`,
        method: 'get',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then((response) => {
        setCandidates(response.data.candidates);
        setRegions(response.data.regions);
        setParties(response.data.parties);
        //console.log(response);
    })
    .catch((error) => {
        console.log(error.response.data);
    });
}

export default States;
