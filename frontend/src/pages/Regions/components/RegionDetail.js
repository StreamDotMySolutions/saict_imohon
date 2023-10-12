import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const RegionDetails = ({details}) => {

return(
    <Row>
        <Col>
            <ul class="list-group-flush">
                {/* <li className="list-group-item d-flex justify-content-between align-items-center">
                Pengundi berdaftar
                { details.registered_voters !== 0 &&
                    <span className="badge bg-primary rounded-pill">{ details.registered_voters }</span>
                }
                </li> */}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                Jumlah undi semasa
                { details.votes !== 0 &&    
                    <span className="badge bg-primary rounded-pill">{ details.votes }</span>
                }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                Peratusan mengundi
                { details.percentage !== null &&
                    <span className="badge bg-primary rounded-pill">{ details.percentage ?  details.percentage : 0 } %</span>
                }
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                Kemaskini 
                { details.last_updated !== null &&
                    <span className="badge bg-primary rounded-pill">{ details.last_updated ?  details.last_updated : null }</span>
                }
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                Majoriti 
                { details.majority !== null &&
                    <span className="badge bg-primary rounded-pill">{ details.majority ?  details.majority : null }</span>
                }
                </li>
            </ul>
        </Col>
    </Row>
    )
}
export default RegionDetails