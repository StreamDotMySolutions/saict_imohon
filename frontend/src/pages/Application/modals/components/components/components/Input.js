import useApplicationStore from '../../../../stores/ApplicationStore'
import { Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Item({item}){
    const store = useApplicationStore()
    const errors = store.errors
    const fieldName = item
    return(<>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-calculator"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Sila nyatakan jumlah unit'
                        value={ store.getValue(fieldName) ? store.getValue(fieldName) : '' }
                        name={fieldName}
                        size='md' 
                    
                        required 
                        isInvalid={errors?.hasOwnProperty(fieldName)}
                        onChange={ (e) => store.setValue(fieldName, e.target.value)  }
                    />

                    {
                        errors?.hasOwnProperty(fieldName) &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors[fieldName] ? errors[fieldName] : null }
                                </Form.Control.Feedback>
                            )
                    }  
                </InputGroup>
            </>)
}

export function Description({item}){
    const fieldName = item + '_description'
    const store = useApplicationStore()
    const errors = store.errors

    return(<>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-question"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder='Sila nyatakan tujuan permohonan'
                        //value={store.data.description?.value ? store.data.description?.value : '' }
                        value={ store.getValue(fieldName) ? store.getValue(fieldName) : '' }
                        name={fieldName}
                        size='md' 
                        as="textarea" 
                        rows={4}
                        required 
                        isInvalid={errors?.hasOwnProperty(fieldName)}
                        onChange={ (e) => store.setValue(fieldName, e.target.value)  }
                    />
                    {
                        errors?.hasOwnProperty(fieldName) &&
                            (
                                <Form.Control.Feedback type="invalid">   
                                { errors[fieldName] ? errors[fieldName] : null }
                                </Form.Control.Feedback>
                            )
                    }   
                </InputGroup>
            </>)
}

export function Type({item}){
    const fieldName = item + '_type'
    const store = useApplicationStore()
    const errors = store.errors

    return(<>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-info"></FontAwesomeIcon></InputGroup.Text>
                    <div className="mb-3 ms-3 mt-2">
                        <Form.Check
                            inline
                           
                            checked={store.getValue(fieldName) === 'new' ? true : false }
                            
                            isInvalid={errors?.hasOwnProperty(fieldName)}
                            label="Baharu"
                            name={fieldName}
                            type='checkbox'
                            id='item-new'
                            onChange={ (e) => store.setValue(fieldName, 'new')  }
                        />
                        <Form.Check
                            inline
                            checked={store.getValue(fieldName) === 'replace' ? true : false }
                            isInvalid={errors?.hasOwnProperty(fieldName)}
                            label="Ganti"
                            name={fieldName}
                            type='checkbox'
                            id='item-replace'
                            onChange={ (e) => store.setValue(fieldName, 'replace')  }
                        />
                    </div>

                    {
                        errors?.hasOwnProperty(fieldName) &&
                            (
                                <Form.Control.Feedback className='text-danger' type="is-invalid">   
                                <input type='hidden' className='is-invalid' />
                                { errors[fieldName] ? errors[fieldName] : null }
                                </Form.Control.Feedback>
                            )
                    } 
                </InputGroup>
            </>)
}