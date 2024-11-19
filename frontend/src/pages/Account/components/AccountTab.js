import useAccountStore from '../stores/AccountStore'
import InlineEditing from './InlineEditing'
import { Form,Collapse } from 'react-bootstrap'
import {useState} from 'react'
import { Row } from 'react-bootstrap'

const AccountTab = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    const store = useAccountStore()
    const [togglePassword, setTogglePassword] = useState(false)
    
    return (
        <>

        <Row className='col-6 p-3'>
            <InlineEditing 
                type='text'
                url={`${apiUrl}/global/account`}
                label='Alamat emel'
                placeholder='Sila letakkan alamat emel'
                fieldName='email' 
                fieldValue={store?.account?.email}
            />

            <Form.Check // prettier-ignore
                className='mt-4 mb-3'
                type="switch"
                id="custom-switch"
                label="Tetapkan kata laluan"
                onChange={() => setTogglePassword(!togglePassword)}
            />

            <Collapse in={togglePassword}>
                <div>
                <InlineEditing
                    url={`${apiUrl}/global/account`}
                    label="Password"
                    placeholder="Sila tetapkan kata laluan baharu"
                    fieldName="password"
                />

                </div>
            </Collapse>

        </Row>
        </>
    )
};

export default AccountTab;