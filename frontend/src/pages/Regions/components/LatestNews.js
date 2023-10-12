import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const LatestNews = ({ logs }) => {
    if (!Array.isArray(logs)) {
        return <p></p>;
    }
    const listItems = logs.map((log) => (
        <Row key={log.id}>
            <Col md={3}>
                <span className='text-muted'><small>{log.last_updated}</small></span>
            </Col>
            <Col>
                <p className='text-muted' style={{ fontSize: '9pt' }}>
                    <strong className='text-primary'>{log.status}</strong> {' - '}
                    {log.candidate_coalition && (
                        <span>
                            Calon dari Parti <strong>{log.candidate_coalition}</strong>, {' '}
                        </span>
                    )}

                    {log.candidate_name && (
                        <span>
                            <strong>{log.candidate_name}</strong>{' '}
                        </span>
                    )}

                    {log.candidate_votes && (
                        <span>
                            mengumpul <strong>{log.candidate_votes}</strong> undi ( majoriti <strong>{log.majority}</strong> undi )
                        </span>
                    )}
                </p>
            </Col>
        </Row>
    ));

    return <>{listItems}</>;
};


export default LatestNews