import React, { useState } from 'react';
import { Form, FormControl, Button, Container, Tabs, Tab } from 'react-bootstrap';
import useUserStore from '../../stores/UserStore'; 
import UserDepartment from './components/UserDepartment';

function UserForm() {
    const user = useUserStore()
    
    return (
    <Container>

    <Tabs
      defaultActiveKey="user"
      id="UserTab"
      className="mb-3"
    >
      <Tab eventKey="user" title="Akaun">
        <Form>
            <InputText
                label='Email'
                placeholder={'Alamat email'}
                type='text'
                field='email'
            />


            <InputText
                label='Password'
                placeholder={'Password'}
                type='password'
                field='password'
            />
        </Form>
      </Tab>
      <Tab eventKey="profile" title="Profil" >
      <Form>

        <InputText
                label='Nama penuh'
                placeholder={'Nama penuh'}
                type='text'
                field='name'
            />

        <InputText
                label='Jawatan'
                placeholder={'Nama penuh'}
                type='text'
                field='occupation'
            />


        <InputText
            label='Nombor Kad Pengenalan'
            placeholder={'Isi no kad pengenalan'}
            type='text'
            field='nric'
        />

        <InputText
            label='Nombor telefon'
            placeholder={'Nombor telefon'}
            type='text'
            field='nric'
        />

        <InputText
            label='Alamat 1'
            placeholder='Isi alamat'
            as='textarea'
            field='nric'
            rows={3}
        />
        </Form>
      </Tab>
      <Tab eventKey="department" title="Jabatan" >
        <UserDepartment /> 
      </Tab>
    </Tabs>
        
    </Container>
    );
}

export default UserForm;

function InputText({
    label,
    placeholder,
    field,
    type,
    as,
    rows
}){
    const user = useUserStore()
    return(
        <Form.Group className='mb-3'>
        <Form.Label>{label}</Form.Label>
        <FormControl
            type={type}
            as={as}
            rows={rows}
            name={field}
            autocomplete='off'
            placeholder={placeholder}
            value={user[field]?.value}
            onChange={(e) => { 
                const data = {
                    value: e.target.value
                }
                useUserStore.setState({[field]: data})}
                }
            isInvalid={user[field]?.error} // Apply the is_invalid class when isValid is true
        />
        <Form.Control.Feedback type="invalid">
            {user[field]?.message}
        </Form.Control.Feedback>
        </Form.Group>
    )
}
