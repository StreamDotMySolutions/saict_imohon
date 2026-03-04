import useAccountStore from '../stores/AccountStore'
import InlineEditing from './InlineEditing'
import { Form, Row, Col } from 'react-bootstrap'

const ProfileTab = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const store = useAccountStore()

    return (
        <div className='mt-3'>
            <Row className='g-3'>
                <Col md={6}>
                    {/* Disabled field - Nama */}
                    <Form.Group className='mb-3'>
                        <Form.Label className='fw-semibold text-muted small'>Nama</Form.Label>
                        <Form.Control
                            type='text'
                            disabled
                            value={store?.account?.name}
                        />
                    </Form.Group>

                    {/* Editable - Jawatan */}
                    <InlineEditing
                        url={`${apiUrl}/global/account`}
                        label='Jawatan'
                        placeholder='Sila letakkan jawatan anda'
                        fieldName='occupation'
                        fieldValue={store?.account?.profile?.occupation}
                    />

                    {/* Disabled field - No Kad Pengenalan */}
                    <Form.Group className='mb-3'>
                        <Form.Label className='fw-semibold text-muted small'>No Kad Pengenalan</Form.Label>
                        <Form.Control
                            type='text'
                            disabled
                            value={store?.account?.nric}
                        />
                    </Form.Group>

                    {/* Editable - No Telefon */}
                    <InlineEditing
                        url={`${apiUrl}/global/account`}
                        label='No Telefon'
                        placeholder='Sila letakkan no telefon anda'
                        fieldName='phone'
                        fieldValue={store?.account?.profile?.phone}
                    />
                </Col>

                <Col md={6}>
                    {/* Editable - Tingkat */}
                    <InlineEditing
                        url={`${apiUrl}/global/account`}
                        label='Tingkat'
                        placeholder='Tingkat bangunan'
                        fieldName='level'
                        fieldValue={store?.account?.profile?.level}
                    />

                    {/* Editable - Nama Bangunan */}
                    <InlineEditing
                        url={`${apiUrl}/global/account`}
                        label='Nama Bangunan'
                        placeholder='Nama bangunan'
                        fieldName='building'
                        fieldValue={store?.account?.profile?.building}
                    />

                    {/* Editable - Alamat */}
                    <InlineEditing
                        url={`${apiUrl}/global/account`}
                        as='textarea'
                        rows='5'
                        label='Alamat'
                        placeholder='Sila letakkan alamat anda'
                        fieldName='address'
                        fieldValue={store?.account?.profile?.address}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ProfileTab;
