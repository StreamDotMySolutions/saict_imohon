import useApplicationStore from '../../../../stores/ApplicationStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge,Button,Row,Col,Form, InputGroup } from 'react-bootstrap'
import { React, useState } from 'react';


export function Item({item}){
    const store = useApplicationStore()
    const errors = store.errors
    const fieldName = item + '_total'

    return(<>
                <InputGroup hasValidation>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-calculator"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder={ store.readonly === true ? '' : 'jumlah ?'}
                        value={ store.getValue(fieldName) ? store.getValue(fieldName) : '' }
                        name={fieldName}
                        size='md' 
                        readOnly={store.readonly}
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
                        placeholder={ store.readonly === true ? '' : 'Sila nyatakan tujuan permohonan peralatan ini'}
                        //value={store.data.description?.value ? store.data.description?.value : '' }
                        value={ store.getValue(fieldName) ? store.getValue(fieldName) : '' }
                        name={fieldName}
                        readOnly={store.readonly}
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
                    <div className="ms-3 mt-2">
                        <Form.Check
                            inline
                            disabled={store.readonly}
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
                            disabled={store.readonly}
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

export function  ItemDetail ({ item })  {

    const store = useApplicationStore();
    const total = store.getValue( item + '_total')
    const details = store.getValue('details')
    //console.log(details)
  
    const elements = [];
    for (let i = 0; i < total; i++) {
      elements.push(
        <div key={i} className='mb-2'>
          <Row>
            <Col className='col-1'>
              <Badge className='fs-3'>{i + 1}</Badge>
            </Col>
            <Col className='col-7'>
              <Form.Control
                as="textarea"
                placeholder={'Detail untuk item no #' + (i+1) }
                rows={2}
                //value={description[i]}
                onChange={(e) => {
                //   const newDescription = [...description];
                //   newDescription[i] = e.target.value;
                //   setDescription(newDescription);
                //   const data = {
                //             'item' : item,
                //             'description' : description
                //   }
                 
                //   store.setValue(item + '_items',data)

                //   const details = {
                //         'pc' : {
                //             [i+1] : e.target.value 
                //         }
                //   }
                //   store.setValue('details',details)

                let updatedDetails;
                if (details === null) {
                  updatedDetails = {
                    [item]: {
                      [i + 1]:  { 'description' : e.target.value}
                    }
                  };
                } else {
                  updatedDetails = {
                    ...details,
                    [item]: {
                      ...(details[item] || {}),
                      [i + 1]: { 'description' : e.target.value}
                    }
                  };
                }
                
                store.setValue('details', updatedDetails);

                }}
              />
            </Col>
          </Row>
        </div>
      );
    }
  
    return (
      <>
        {elements}
      </>
    );
}