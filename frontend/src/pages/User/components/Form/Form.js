import React, { useState } from 'react';
import { Form, FormControl, Button, Container } from 'react-bootstrap';
import useUserStore from '../../stores/UserStore'; 

function UserForm() {
    const user = useUserStore()
    
    return (
        <Container>
        {/* <Form >
            <Form.Group controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <FormControl
                type="text"
                placeholder="Enter officer name"
                value={user.name?.value}
                onChange={(e) => { 
                    const data = {
                        value: e.target.value
                    }
                    useUserStore.setState({name: data})}
                    }
                isInvalid={user.name?.error} // Apply the is_invalid class when isValid is true
            />
            <Form.Control.Feedback type="invalid">
                {user.name?.message}
            </Form.Control.Feedback>
            </Form.Group>
        </Form> */}
<Form>
            <InputText
                label='Officer Name'
                placeholder={'Enter officer name'}
                type='text'
                field='name'
            />

            <InputText
                label='Officer Email'
                placeholder={'Enter officer email'}
                type='text'
                field='email'
            />


            <InputText
                label='Officer NRIC Number'
                placeholder={'Enter NRIC number'}
                type='text'
                field='nric'
            />

            <InputText
                label='Officer Password'
                placeholder={'Enter officer password'}
                type='password'
                field='password'
            />
</Form>
        </Container>
    );
}

export default UserForm;


function InputText({
    label,
    placeholder,
    field,
    type
}){
    const user = useUserStore()
    return(
        <Form.Group>
        <Form.Label>{label}</Form.Label>
        <FormControl
            type={type}
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
