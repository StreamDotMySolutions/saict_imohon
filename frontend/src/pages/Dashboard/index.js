import { React } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LatestCandidate from './components/LatestCandidate'
import LatestRegion from './components/LatestRegion'
import Container from "react-bootstrap/Container";

const Dashboard = () => {
    return (
    <>
    <Container>
        <Breadcrumb >
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                <FontAwesomeIcon icon="fas fa-home" />
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
     
        <LatestCandidate />
        <LatestRegion />
    </Container>
    </>
    )
}
export default Dashboard