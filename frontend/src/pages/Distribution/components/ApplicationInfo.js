import { useState, useEffect } from 'react'
import useStore from '../store'
import axios from '../../../libs/axios'
import { Col, Table } from 'react-bootstrap';

const ApplicationInfo = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const store = useStore()
    const errors = store.errors

    const applicationId = store.getValue('application_id') ? store.getValue('application_id') : null 

    useEffect( () => {
        setData(null)
        if(applicationId === null) return 
        setIsLoading(true)
        //console.log('triggered')
        axios(`${store.application_url}/${applicationId}`)
        .then( response => {
            setIsLoading(false)
            //console.log(response)
            setData(response.data)
        })
        .catch ( error => {
            setIsLoading(false)
            console.warn(error)
        })
    },[applicationId])

    return (
        <div>
            {isLoading ? <>Loading..</> : null}
            {data ?
            <>
                <Col xs={6}>
                    <Table>
                        <tr>
                            <th>Nama</th>
                            <td>{data?.application?.user?.name}</td>
                        </tr>
                        <tr>
                            <th>Jawatan</th>
                            <td>{data?.application?.user?.user_profile?.occupation}</td>
                        </tr>
                        <tr>
                            <th>Jabatan</th>
                            <td>{data?.application?.user?.user_profile?.user_department?.name} </td>
                        </tr>
                        <tr>
                            <th>Tarikh</th>
                            <td>{data?.application?.created_at_formatted}</td>
                        </tr>
                    </Table>
                    test
                </Col>
            </>
            :
            null
            }
        </div>
    );
};

export default ApplicationInfo