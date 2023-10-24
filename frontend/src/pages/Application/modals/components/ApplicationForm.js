import React from 'react'
import useApplicationStore from '../../stores/ApplicationStore'
import { Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ApplicationForm = () => {

    const store = useApplicationStore()
    const errors = store.errors

    return (
        <div>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-question"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Sila nyatakan tujuan permohonan'
                        name='description'
                        size='md' 
                        as="textarea" 
                        rows={4}
                        required 
                        isInvalid={errors?.hasOwnProperty('description')}
                        onChange={ (e) => useApplicationStore.setState({ description: { value: e.target.value}} )} 
                    />

                    {
                        errors?.hasOwnProperty('description') &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors.description ? errors.description : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
        </div>
    );
};

export default ApplicationForm;