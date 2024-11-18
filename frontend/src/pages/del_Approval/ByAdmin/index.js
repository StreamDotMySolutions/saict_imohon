import Container from 'react-bootstrap/Container'
import { React} from 'react'
import { Tabs,Tab, Row } from 'react-bootstrap'
import Applications from './Applications'

export default function ApprovalByAdmin () {
 
    const HandleTabChange = (key) => {
        console.log(key)
    }

    return (
      <Container className='p-1'>
        <Tabs
          defaultActiveKey="pending"
          id="userTab"
          className="mb-3"
          onSelect={HandleTabChange}
        >
            <Tab eventKey="pending" title="Permohonan Baharu">
               <Row className='p-3'><Applications status={'pending'} /></Row>
            </Tab>

            <Tab eventKey="approved" title="LULUS">
                <Row className='p-3'><Applications status={'approved'} /></Row>
            </Tab>
            <Tab eventKey="rejected" title="GAGAL">
                <Row className='p-3'><Applications status={'rejected'} /></Row>
            </Tab>
       
        </Tabs>
      </Container>
    )
} 