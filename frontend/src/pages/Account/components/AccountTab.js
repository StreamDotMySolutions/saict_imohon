import { useState } from 'react'
import useAccountStore from '../stores/AccountStore'
import InlineEditing from './InlineEditing'

const AccountTab = () => {
    const store = useAccountStore()
    // const [refresh, setRefresh] = useState(false)

    // if(refresh){
    //     useAccountStore.setState({refresh: true})
    //     setRefresh(false)
    // }
    
    return (
        <>
          <InlineEditing 
                url={store.update_url}
                label='Nama penuh'
                placeholder='Sila letakkan nama anda'
                fieldName='name' 
                fieldValue={store?.account?.profile?.name}
            />

            <InlineEditing 
                url={store.update_url}
                label='Alamat Email'
                placeholder='Sila letakkan alamat email'
                fieldName='email' 
                fieldValue={store?.account?.email}
            />
        </>
    )
};

export default AccountTab;