import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../libs/axios'

const MohonIndex = () => {
    const store = useMohonStore()
    const [mohons, setMohons] = useState([])

    useEffect( () => {
        // modified axios to prepend Bearer Token on header
        axios( 
            {
                method: 'get', // method is GET
                url: store.url // eg GET http://localhost:8000/api/mohon/index
            } 
        )
        .then( response => { // response block
          //console.log(response.data.mohons.data)   // output to console  
          setMohons(response.data.mohons) // assign data to const = mohons
          store.setValue('refresh', false ) // set MohonIndex listener back to FALSE
        })
        .catch( error => { // error block
          console.warn(error) // output to console
        })
      },
      [store.getValue('refresh')] // useEffect() listener, will trigger on value update
    ) // useEffect()

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th style={{ 'width': '20px'}}>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                {mohons?.data?.map((mohon,index) => (
                    <tr key={index}>
                        <td>{mohon.id}</td>
                        <td>{mohon.title}</td>
                        <td>{mohon.description}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};
export default MohonIndex;