import React from 'react';
import { Form, Button} from 'react-bootstrap';
import useCategoryStore from '../stores/CategoryStore';


const CategoryForm = () => {
    const category = useCategoryStore()

    return (
    
       
                <Form.Group>
          
                    <Form.Control
                        id='name'
                        type='text'
                        name='name'
                        autoComplete='off'
                        placeholder='Enter category name'
                        value={category.name?.value}
                        onClick={
                            (e) => { 
                                const data = {
                                    value:''
                                }
                                useCategoryStore.setState({name: data})}
                        }
                        onChange={(e) => { 
                            const data = {
                                value: e.target.value
                            }
                            useCategoryStore.setState({name: data})}
                            }
                        
                        isInvalid={category.name?.error} // Apply the is_invalid class when isValid is true
                    />
                    <Form.Control.Feedback type="invalid">
                        {category.name?.message}
                    </Form.Control.Feedback>
            
                </Form.Group>

             
   

    
    );
};

export default CategoryForm;