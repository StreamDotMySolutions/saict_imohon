import React from 'react'
import useApplicationStore from '../../../stores/ApplicationStore'
import { Row,Col,Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DescriptionTab = () => {

    return (
        <div>
            <Row>
                <Description />
            </Row>
        </div>
    );
};

export default DescriptionTab;

function Type(){
    const store = useApplicationStore()
    const errors = store.errors

    return(<>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-info"></FontAwesomeIcon></InputGroup.Text>
                    <div className="mb-3 ms-3 mt-2">
                        <Form.Check
                            inline
                            checked={store.getValue('type') === 'new' ? true : false }
                            readOnly={store.readonly}
                            isInvalid={errors?.hasOwnProperty('type')}
                            label="Baharu"
                            name="type"
                            type='radio'
                            id='item-new'
                            onChange={ (e) => store.setValue('type', 'new')  }
                        />
                        <Form.Check
                            inline
                            checked={store.getValue('type') === 'replace' ? true : false }
                            isInvalid={errors?.hasOwnProperty('type')}
                            label="Ganti"
                            name="type"
                            type='radio'
                            id='item-replace'
                            onChange={ (e) => store.setValue('type', 'replace')  }
                        />
                    </div>

                    {
                        errors?.hasOwnProperty('type') &&
                            (<>
                                <Form.Control type="hidden" required isInvalid />
                                <Form.Control.Feedback type="invalid">   
                                { errors.type ? errors.type : null }
                                </Form.Control.Feedback>
                            </>)
                    }  
                </InputGroup>
            </>)
}

function Description(){
    const store = useApplicationStore()
    const errors = store.errors

    return(<>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-question"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Sila nyatakan tujuan permohonan'
                        readOnly={store.readonly}
                        //value={store.data.description?.value ? store.data.description?.value : '' }
                        value={ store.getValue('description') ? store.getValue('description') : '' }
                        name='description'
                        size='md' 
                        as="textarea" 
                        rows={6}
                        required 
                        isInvalid={errors?.hasOwnProperty('description')}
                        //onChange={ (e) => useApplicationStore.setState({ description: { value: e.target.value}} )} 
                        onChange={ (e) => store.setValue('description', e.target.value)  }
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
            </>)
}