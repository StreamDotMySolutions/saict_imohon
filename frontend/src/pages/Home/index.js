import React from 'react'
import { Outlet} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { NavLink} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Facebook from '../Socmed/Facebook';
import Youtube from '../Socmed/Youtube2';
import BannerCarousel from './components/Banner/BannerCarousel';



const Home = () => {
    return (
        <>
            <Container className="mt-3">
            <Row>
            <Container>
                <BannerCarousel />
            </Container>
            </Row>
            <Row>
            <Col lg={6} className="mt-3">
                <h3>Pilihan Raya Umum Ke-15</h3>
            </Col>
            </Row>

            <Container className="bg-light text-center">
            <Row>
                <Col lg={2} md={3} sm={4} xs={6} className="my-2">
                <NavLink as={NavLink} to="https://mypru15.rtm.gov.my/">
                    <img src="img/flags/Malaysia.png" className="img-fluid" width="30%" title="Malaysia" />
                </NavLink>
                </Col>
            </Row>
            </Container>

            <Row className="mt-5">
            <Col lg={6}>
                <h3>Pilihan Raya Umum DUN Ke-15</h3>
            </Col>
            </Row>

            <Container className="bg-light text-center">
            <Row>
                <Col lg={2} md={3} sm={4} xs={6} className="my-2">
                    <Nav.Link as={NavLink} to="/selangor">
                        <img src="/img/flags/selangor.png" className="img-fluid" width="30%" title="Selangor" />
                    </Nav.Link>
                </Col>
                <Col lg={2} md={3} sm={4} xs={6} className="my-2">
                    <Nav.Link as={NavLink} to="/pulau-pinang">
                        <img src="/img/flags/pulau-pinang.png" className="img-fluid" width="30%" title="PP" />
                    </Nav.Link>
                </Col>
                <Col lg={2} md={3} sm={4} xs={6} className="my-2">
                    <Nav.Link as={NavLink} to="/negeri-sembilan">
                        <img src="/img/flags/negeri-sembilan.png" className="img-fluid" width="30%" title="NS" />
                    </Nav.Link>
                </Col>
                <Col lg={2} md={3} sm={4} xs={6} className="my-2">
                    <Nav.Link as={NavLink} to="/kedah">
                        <img src="/img/flags/kedah.png" className="img-fluid" width="30%" title="Kedah" />
                    </Nav.Link>
                </Col>
                <Col lg={2} md={3} sm={4} xs={6} className="my-2">
                    <Nav.Link as={NavLink} to="/terengganu">
                        <img src="/img/flags/terengganu.png" className="img-fluid" width="30%" title="Terengganu" />
                    </Nav.Link>
                </Col>
                <Col lg={2} md={3} sm={4} xs={6} className="my-2">
                    <Nav.Link as={NavLink} to="/kelantan">
                        <img src="/img/flags/kelantan.png" className="img-fluid" width="30%" title="Kelantan" />
                    </Nav.Link>
                </Col>
            </Row>
            </Container>

            <hr className="featurette-divider" />

            {/* <Row>
            <Col lg={6}>
                <h3>Statistik Pencalonan</h3>
            </Col>
            </Row> */}

            {/* <Container>
            <div className="mb-4">Pakatan Harapan</div>
            <div className="progress mb-4" role="progressbar" aria-label="PH" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: "25px" }}>
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "65%", backgroundColor: "rgb(216, 35, 43)" }}></div>
            </div>

            <div className="mb-4">Perikatan Nasional</div>
            <div className="progress mb-4" role="progressbar" aria-label="PN" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: "25px" }}>
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "45%", backgroundColor: "rgb(0, 49, 82)" }}></div>
            </div>

            <div className="mb-4">Barisan Nasional</div>
            <div className="progress mb-4" role="progressbar" aria-label="Bn" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ height: "25px" }}>
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "25%", backgroundColor: "rgb(0, 0, 128)" }}></div>
            </div>
            </Container> */}

            {/* <hr className="featurette-divider" /> */}

            <Row>
            <Col lg={6}>
                <h3>Terkini</h3>
            </Col>
            </Row>

            <Container className="my-3">
                <Row>
                    <Col md={6}>
                        <Youtube />
                    </Col>
                    <Col md={6}>
                        <Facebook />
                    </Col>
                </Row>
            </Container>
        </Container>

        <Outlet />
        </>
    )
} 

export default Home