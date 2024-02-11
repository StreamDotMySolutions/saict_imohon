import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import useMohonStore from '../store'
import axios from '../../../libs/axios'

const MohonIndex = () => {
    const store = useMohonStore()
    const [data,setData] = useState([]) // useState React Hook
    const applications = data?.data?.applications
    const [mohons, setMohons] = useState([])

    useEffect( () => {
        axios(
            {url: store.url} // eg GET http://localhost:8000/api/mohon/index
        )
        .then( response => {
          //console.log(response.data.mohons.data)   // output to console 
          setData(response)  
          setMohons(response.data.mohons)
          //useApplicationStore.setState({ refresh: false})
        })
        .catch( error => {
          console.warn(error) // output to console
        })
      },[])

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