import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MOBILE_BREAKPOINT = 768; // Bootstrap md

const RoleLayout = ({ TopNavBar, Footer }) => {
  const mode = process.env.REACT_APP_MODE;
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (mode !== 'production') {
    return (
      <Container>
        <div className="d-flex justify-content-center">
          <img alt="maintenance" src="img/maintainance.jpg" className="img-fluid" width="50%" />
        </div>
        <Row>
          <h2 className="text-center mt-3">Laman Web Dalam Penyelengaraan</h2>
        </Row>
      </Container>
    );
  }

  if (isMobile) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Alert variant="warning" className="text-center p-4">
          <FontAwesomeIcon icon="fa-solid fa-desktop" style={{ fontSize: '2.5rem' }} className="mb-3 d-block mx-auto" />
          <Alert.Heading>Paparan Desktop Disyorkan</Alert.Heading>
          <p className="mb-0">
            Sistem ini lebih sesuai dilihat menggunakan komputer atau tablet.<br />
            Sila guna peranti desktop untuk pengalaman terbaik.
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <TopNavBar />
      <Container fluid className="p-1 mt-5">
        <hr />
        <Col lg={12}>
          <Container className="mt-3 mb-3">
            <Outlet />
          </Container>
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default RoleLayout;
