import { React, useState , useEffect} from 'react'
import axios from '../../../libs/axios'
import {
    useParams
  } from "react-router-dom";
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Container from 'react-bootstrap/esm/Container';
// import Col from 'react-bootstrap/esm/Col';
// import Row from 'react-bootstrap/esm/Row';

/**
 * @returns HTML
 */
const LatestCandidate = () => {

    const { stateName } = useParams();
    const [ candidates, setCandidates] = useState([])

    // 5 seconds interval
    useEffect(() => {
       
        // loading for 1st time
       getCandidates(stateName, setCandidates)
        
        const intervalId = setInterval(() => {
           getCandidates(stateName, setCandidates)
        }, 1000 * 5) // in milliseconds

        return () => clearInterval(intervalId)
        
    }, [stateName])


    //const candidateDataUrl = '/' + stateName + '/' + regionCode + '/' + regionName + '/'
    const candidateDataUrl = '/'

    // const listItems = candidates?.map( (candidate,index) =>
    
    //     <li key={candidate.candidate_id} className="list-group-item">
    //         {index+1}. &nbsp;

    //         { candidate.url !== null &&
    //             <img style={{'width':'50px'}} className="rounded" src={candidate.url} />
    //         }
    //         <Link to={ '/' + stateName + '/' + candidate.region_code + '/' + candidate.region_name + '/' + candidate.id + '/' +  candidate.slug }>
    //             <strong>{candidate.candidate_title?.toUpperCase()} {candidate.candidate_name?.toUpperCase()} </strong>
    //         </Link> calon #{candidate.candidate_entry} dari &nbsp;
    //         <Link to={ '/' + stateName + '/' + candidate.region_code + '/' + candidate.region_name } >
    //             <b>{candidate.region_name}</b>
    //         </Link>
           
    //         <br />
    //         <i><small><FontAwesomeIcon icon="fas fa-clock" /> Kemaskini {candidate.when}</small></i> 
    //     </li>
    // );

    const listItems = candidates?.map( (c,index) => 
       
            <Link key={c.id} className='list-group-item list-group-item-action' to={ '/' + stateName + '/' + c.region_code + '/' + c.region_name_slug + '/' + c.id + '/' +  c.slug }>
                
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{c.candidate_title?.toUpperCase()} {c.candidate_name?.toUpperCase()}</h5>
                 
                    {c.url ? (
                        <img style={{ width: '70px' }} className="rounded" src={c.url} />
                        ) : (
                        <img style={{ width: '70px' }} className="rounded" src="/img/no-image.png" />
                    )}
                  
                </div>
                <p class="mb-1">Calon #{c.candidate_entry} dari {c.party_name}.</p>
                    <small>
                    <Link to={ '/' + stateName + '/' + c.region_code + '/' + c.region_name } >
                        <b>{c.region_name}</b>
                    </Link>
                    <br />
                    <i><small><FontAwesomeIcon icon="fas fa-clock" /> Kemaskini {c.when}</small></i> 
                </small>
            </Link>
             


    )

    return (
    <>
        {/* <ul className="list-group col">
       
        </ul> */}

        <div class="list-group">
            {listItems}
        </div>
    </>
    )
}


/**
 * Get regions under given stateName
 */
function getCandidates(stateName,setCandidates){
    //console.log(`get candidates from server - ${stateName}-${regionCode}`)
    axios({
        url:  `${process.env.REACT_APP_BACKEND_URL}/dashboard/prn15/${stateName}/dashboard`,   
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then( function(json){
        //console.log(json.data.data.candidates)
        setCandidates(json.data.data.candidates)
    })
    .catch ( function(error){
        //console.log(error.response.data)
    })
}

export default LatestCandidate