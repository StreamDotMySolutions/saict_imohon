import React, { useState } from 'react';
import axios from '../../libs/axios';
import useApplicationStore from './stores/ApplicationStore';

const ReceivedDashboard = () => {

    const store = useApplicationStore()
    const [data,setData] = useState([])

    console.log(store.statistics_url)

    axios( `${store.statistics_url}/pc/requested`)
    .then( response => {
        console.log(response)
        setData(response.data)
    })
    .catch( error => {
        console.warn(error)
    })

    return (
        <>
        <div className="d-flex">
            <div className="card text-dark bg-light mb-3 ms-3" >
                <div className="card-header text-center">PC</div>
                <div className="card-body text-center">
                    <h1>{data?.pc}</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 ms-3" >
                <div className="card-header text-center">NB</div>
                <div className="card-body text-center">
                    <h1>{data?.nb}</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 ms-3" >
                <div className="card-header text-center">PBWN</div>
                <div className="card-body text-center">
                    <h1>{data?.pbwn}</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 ms-3" >
                <div className="card-header text-center">PCN</div>
                <div className="card-body text-center">
                    <h1>{data?.pcn}</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 ms-3" >
                <div className="card-header text-center">Projektor</div>
                <div className="card-body text-center">
                    <h1>{data?.projektor}</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 ms-3" >
                <div className="card-header text-center">Webcam</div>
                <div className="card-body text-center">
                    <h1>{data?.webcam}</h1>
                </div>
            </div>


        </div>
        </>
    );
};

export default ReceivedDashboard;