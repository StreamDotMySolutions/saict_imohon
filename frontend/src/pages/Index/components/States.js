import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
const States = (state) => {
    //console.log(state)
  

    const listItems = state.data.latest?.map( (item) => 
        <li>
           <Row>
                <Col>
                    {item.region_code} - {item.region_name}
                </Col>
                <Col>
                    {item.last_updated} 
                </Col>
           </Row>
        </li>
    )

    
    return (
    <>
    <Nav.Link  className='list-group-item-action' as={NavLink} to={`/${state.data.slug}`}>
    <Card className='m-1'>
        <Card.Body>
            <Card.Title>
            <img
                src={`/img/flags/${state.data.slug}.png`}
                className="img-fluid"
                width="40px"
                title="Selangor"
                alt={state.data.name} // Don't forget to add an alt attribute for accessibility
            />
                {' '}
                {state.data.name}
                </Card.Title>
            <Row>
                <Col>
                    <ul className="list-group">
          
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                        Calon bertanding
                            <span className="badge bg-primary rounded-pill">{state.data.candidates}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                            Undi sehingga kini
                            <span className="badge bg-primary rounded-pill">{state.data.votes}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                            Jumlah kerusi
                            <span className="badge bg-primary rounded-pill">{state.data.regions}</span>
                        </li>
           
                    </ul>
                </Col>

                <Row>
                    <Col>
                        <ol className='mt-3 text-muted'>
                            {listItems}
                        </ol>
                    </Col>
                </Row>
           
            </Row>
            

        </Card.Body>
    </Card>
    </Nav.Link>

    </>
    )
}
export default States