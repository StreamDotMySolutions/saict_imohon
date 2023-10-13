import {useEffect, useState } from 'react';
import useCategoryStore from './stores/CategoryStore';
import axios from '../../libs/axios';
import CategoryForm from './components/form';
import { Button, Col,Row,Form } from 'react-bootstrap';

const CategoryIndex = () => {
    const category = useCategoryStore()
    console.log(category?.name?.value)
    const [data, setData] = useState([])

    useEffect( () => {
        axios({
            url: category.index_url,  // user store API
            method: 'get', // method is POST
        })
        .then( response => {
            console.log(response.data)
            setData(response.data.categories)
            useCategoryStore.setState({refresh: false})
        })
    },[category.refresh])



    function handleSubmit(){
        const formData = new FormData();

        if (category?.name?.value) {
          formData.append('name', category.name.value);
        }

        if (category?.parent_id?.value) {
            formData.append('parent_id', category.parent_id.value);
        }

        console.log('submit')
        
        axios({
          url: category.store_url,
          method: 'post',
          data: formData,
        })
          .then((response) => {      
            useCategoryStore.setState({refresh: true})
          })
          .catch((error) => {
            console.error(error);
          });
    }

    const options = data?.map((category) => ({
        value: category.id,
        label: category.name,
      }));

    
   
    return (
        <div>
            <h1>Category</h1>
            <Row>

                <Col>
                
                    <Form.Select
                          onChange={(e) => { 
                                const data = {
                                    value: e.target.value
                                }
                                useCategoryStore.setState({parent_id: data})}
                            }
                    >
                        <option></option>
                        <CategoryDropdown data={data} />
                        {/* {data?.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}  */}

                    </Form.Select>

                    
                </Col>
                <Col xs={4}>
                    <CategoryForm />
                </Col>
                <Col>
                    <Button className="ml-2" onClick={handleSubmit}>Add</Button>
                </Col>
            </Row>
            <hr />
            {/* <ul>
                {data?.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))} 
            </ul> */}

            <CategoryTree data={data} />

   
        </div>
    );
};

function CategoryTree({ data }) {
    if (!data || data.length === 0) {
      return null; // No categories to render
    }
  
    return (
      <ul>
        {data.map((category) => (
          <li key={category.id}>
            {category.name}
            <CategoryTree data={category.children} /> {/* Recursively render child categories */}
          </li>
        ))}
      </ul>
    );
  }

  function CategoryDropdown({ data, depth = 0 }) {
    const indent = '__'.repeat(depth);
   
    return (
     <>
        {data.map((category) => (
          <option  key={category.id} value={category.id}>
           {indent}{' '}{category.name}
        
          </option>
        ))}
        {data.map((category) => (
          <CategoryDropdown key={category.id} data={category.children} depth={depth + 1} />
        ))}
    </>
    );
  }

  
export default CategoryIndex;