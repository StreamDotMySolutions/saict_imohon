import React from 'react';
import { Form } from 'react-bootstrap';
import { InputText } from './include';
import useUserStore from '../../../stores/UserStore';

const UserProfile = () => {
    return (
        <Form>

        <InputText
                label='Nama penuh'
                placeholder='Nama penuh'
                type='text'
                field='name'
            />

        <InputText
                label='Jawatan'
                placeholder='Jawatan di RTM'
                type='text'
                field='occupation'
            />


        <InputText
            label='Nombor Kad Pengenalan'
            placeholder='Isi no kad pengenalan'
            type='text'
            field='nric'
        />

        <InputText
            label='Nombor telefon'
            placeholder='Nombor telefon'
            type='text'
            field='phone'
        />

        <InputText
            label='Alamat'
            placeholder='Isi alamat'
            as='textarea'
            field='address'
            rows={3}
        />
        </Form>
    );
};

export default UserProfile;