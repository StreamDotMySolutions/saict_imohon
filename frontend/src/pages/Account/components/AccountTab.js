import { useState } from 'react'
import useAccountStore from '../stores/AccountStore'
import InlineEditing from './InlineEditing'

const AccountTab = () => {
    const store = useAccountStore()
    const [refresh, setRefresh] = useState(false)

    if(refresh){
        useAccountStore.setState({refresh: true})
        setRefresh(false)
    }
    
    return (
        <>
            <InlineEditing 
                store={useAccountStore()}
                fieldName='Nama' 
                fieldValue={store?.account?.profile?.name}
                setRefresh={setRefresh}
            />
            <InlineEditing 
                store={useAccountStore()}
                fieldName='Email' 
                fieldValue={store?.account?.email}
                setRefresh={setRefresh}
            />
        </>
    )
};

export default AccountTab;