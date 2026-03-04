import useAccountStore from '../stores/AccountStore'
import InlineEditing from './InlineEditing'
import { Form, Collapse, Card } from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AccountTab = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    const store = useAccountStore()
    const [togglePassword, setTogglePassword] = useState(false)

    return (
        <div className='mt-3'>
            <InlineEditing
                type='text'
                url={`${apiUrl}/global/account`}
                label='Alamat emel'
                placeholder='Sila letakkan alamat emel'
                fieldName='email'
                fieldValue={store?.account?.email}
            />

            <Card className='border-0 bg-light rounded-3 p-3 mt-3'>
                <div className='d-flex align-items-center justify-content-between mb-2'>
                    <span className='fw-semibold small'>
                        <FontAwesomeIcon icon='fa-solid fa-lock' className='me-2 text-muted' />
                        Kata Laluan
                    </span>
                    <Form.Check
                        type='switch'
                        id='password-toggle'
                        checked={togglePassword}
                        onChange={() => setTogglePassword(!togglePassword)}
                    />
                </div>

                <Collapse in={togglePassword}>
                    <div>
                        <InlineEditing
                            url={`${apiUrl}/global/account`}
                            label='Kata Laluan Baharu'
                            placeholder='Sila tetapkan kata laluan baharu'
                            fieldName='password'
                            type='password'
                        />
                    </div>
                </Collapse>
            </Card>
        </div>
    )
}

export default AccountTab;