import useAccountStore from '../stores/AccountStore'
import InlineEditing from './InlineEditing'
import { Form,Collapse, Row, Col } from 'react-bootstrap'
import {useState} from 'react'

const ProfileTab = () => {
    const store = useAccountStore()
    const [togglePassword, setTogglePassword] = useState(false)
    
    return (
        <>
        <Row className='p-3'>
            <Col className='col-4'>

                <InlineEditing 
                    url={store.update_url}
                    label='Nama penuh'
                    placeholder='Sila letakkan nama anda'
                    fieldName='name' 
                    fieldValue={store?.account?.name}
                />

                <InlineEditing 
                    url={store.update_url}
                    label='Jawatan'
                    placeholder='Sila letakkan jawatan anda'
                    fieldName='occupation' 
                    fieldValue={store?.account?.profile?.occupation}
                />

                <InlineEditing 
                    url={store.update_url}
                    label='No kad pengenalan'
                    placeholder='Sila letakkan no kad pengenalan anda'
                    fieldName='nric' 
                    //fieldValue={store?.account?.profile?.nric}
                    fieldValue={store?.account?.nric}
                />

                <InlineEditing 
                    url={store.update_url}
                    label='No telefon'
                    placeholder='Sila letakkan no telefon pengenalan anda'
                    fieldName='phone' 
                    fieldValue={store?.account?.profile?.phone}
                />
            </Col>
            <Col className='col-1'></Col>
            <Col className='col-6'>


                <InlineEditing 
                    url={store.update_url}
                    label='Tingkat'
                    placeholder='Tingkat bangunan'
                    fieldName='level' 
                    fieldValue={store?.account?.profile?.level}
                />

                <InlineEditing 
                    url={store.update_url}
                    label='Nama Bangunan'
                    placeholder='Nama bangunan'
                    fieldName='building' 
                    fieldValue={store?.account?.profile?.building}
                />

                <InlineEditing 
                    url={store.update_url}
                    as='textarea'
                    rows='5'
                    label='Alamat '
                    placeholder='Sila letakkan alamat anda'
                    fieldName='address' 
                    fieldValue={store?.account?.profile?.address}
                />
            </Col>
        </Row>
         


          
        </>
    )
};

export default ProfileTab;