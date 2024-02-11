import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import useMohonStore from '../store'

const MohonIndex = () => {
    const store = useMohonStore()
    const [data,setData] = useState([]) // useState React Hook

    useEffect( () => {
        axios(
            {url: store.url} // eg GET http://localhost:8000/api/mohon/index
        )
        .then( response => {
          console.log(response)   // output to console 
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
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </Table>
        </div>
    );
};
export default MohonIndex;