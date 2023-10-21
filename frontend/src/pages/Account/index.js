import React, { useEffect } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap' 
import axios from '../../libs/axios'
import useAccountStore from './stores/AccountStore'
import AccountTab from './components/AccountTab'

const Account = () => {
    const store = useAccountStore()
    useEffect( () => fetchData(store), [])
    
    return (
        <>
        {
        store?.account?.email == null ? '...loading' : (
            <Container>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Account">
                    <AccountTab />
                </Tab>
                <Tab eventKey={2} title="Profile">
                    Tab 2 content
                </Tab>
                <Tab eventKey={3} title="Department">
                    Tab 3 content
                </Tab>
            </Tabs>
            </Container>
            )
        }

        </>
    )
}

function fetchData(store){
    console.log('fetch')
    axios({
        url: store.show_url
    })
    .then( response => {
        //console.log(response.data)
        useAccountStore.setState({account: response.data.account})
        useAccountStore.setState({refresh: false})
    })
    .catch( error => {
        console.error(error)
    })
}

export default Account;