import useApplicationStore from '../../../../stores/ApplicationStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge,Button,Row,Col,Form, InputGroup } from 'react-bootstrap'
import { React, useState, useEffect} from 'react';


export function Item({item}){
    const store = useApplicationStore()
    const errors = store.errors
    const fieldName = item + '_total'
    const items = store.getValue('items')
    const value = items ? items[item + '_requested'] : null

    return(<>

                <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon="fa-solid fa-calculator"></FontAwesomeIcon></InputGroup.Text>
                    <Form.Control 
                        placeholder={ store.readonly === true ? '' : 'jumlah ?'}
                        value={ value ? value : store.getValue( item + '_total') }
                        name={fieldName}
                        size='md' 
                        readOnly={store.readonly}
                        required 
                        isInvalid={errors?.hasOwnProperty(fieldName)}
                        onChange={ (e) => { 
                          store.setValue(fieldName, e.target.value)                         
                        } }
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

export function ItemDetail ({ item })  {

    const store = useApplicationStore();
    const total = store.getValue( item + '_total')
    const details = store.getValue('details')

    const elements = [];
    for (let i = 0; i < total; i++) {

      // Initialize description if it's null or undefined
      const initialDescription = details?.[item]?.[i + 1]?.description || '';
      const initialType = details?.[item]?.[i + 1]?.type || '';
      const initialError = details?.[item]?.[i + 1]?.error || '';

      elements.push(
       
        <div key={i} className='mb-2'>
        <Row>
          <Col className='col-1'>
            <Badge className='fs-3'>{i + 1}</Badge>
          </Col>
          <Col className='col-7'>
            <Form.Control
              as="textarea"
              isInvalid={ !details?.[item]?.[i + 1]?.description }
              value={initialDescription}
              placeholder={'Detail untuk item no #' + (i + 1)}
              rows={2}
              onChange={(e) => {
                let updatedDetails = {
                  ...details,
                  [item]: {
                    ...(details?.[item] || {}),
                    [i + 1]: {
                      'description': e.target.value,
                      'type': details?.[item]?.[i + 1]?.type || 'new',
                    },
                  },
                };
                store.setValue('details', updatedDetails);
              }}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Baru"
              name={`type-${i}`} // Provide a unique name for each radio button
              isInvalid={ !details?.[item]?.[i + 1]?.type }
              value={initialType}
              checked={details?.[item]?.[i + 1]?.type === 'new'}
              onChange={(e) => {
                let updatedDetails = {
                  ...details,
                  [item]: {
                    ...(details?.[item] || {}),
                    [i + 1]: {
                      'description': details?.[item]?.[i + 1]?.description || '',
                      'type': 'new',
                    },
                  },
                };
                store.setValue('details', updatedDetails);
              }}
            />
            <Form.Check
              type="radio"
              label="Ganti"
              name={`type-${i}`} // Provide a unique name for each radio button
              isInvalid={ !details?.[item]?.[i + 1]?.type }
              value={initialType}
              checked={details?.[item]?.[i + 1]?.type === 'replace'}
              onChange={(e) => {
                let updatedDetails = {
                  ...details,
                  [item]: {
                    ...(details?.[item] || {}),
                    [i + 1]: {
                      'description': details?.[item]?.[i + 1]?.description || '',
                      'type': 'replace',
                    },
                  },
                };
                store.setValue('details', updatedDetails);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className='text-danger'>
            {details?.[item]?.[i + 1]?.error}
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

export function FilterItemBy({ itemToFilter }) {
  //console.log(itemToFilter)
  const store = useApplicationStore();
  const items = store.getValue('items');
  const data = items?.application_item_details;

  const [filteredItems, setFilteredItems] = useState(data); // Initially, show all items

  const handleFilter = (itemToFilter) => {
    if (itemToFilter) {
      const filteredData = data?.filter((item) => item.item === itemToFilter);
      setFilteredItems(filteredData);
    } else {
      // If no filter value is provided, show all items
      setFilteredItems(data);
    }
  };

  // Call the handleFilter function with the provided itemToFilter
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilter(itemToFilter);
    }, 1000); // Delay for 1 second (1000 milliseconds)
  
    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts or if itemToFilter changes before the delay completes
    };
  }, [itemToFilter]);
  

  return (
    <div>

        {filteredItems?.map((item) => (
          <Row key={item.id} className='mb-3'>
            <Col className='col-1'>
              <Badge className='fs-3'>{item.number}</Badge>
            </Col>
            <Col className='col-7'>
              <Form.Control
                defaultValue={item.description}
                rows={2}
                as="textarea"
                readOnly={'true'}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                readOnly={'true'}
                label="Baru"
                value="new"
                checked={item.type === 'new'}
              />
              <Form.Check
                type="radio"
                label="Ganti"
                value="replace"
                readOnly={'true'}
                checked={item.type === 'replace'}
              />

            </Col>
          </Row>
        ))}

    </div>
  );
}

