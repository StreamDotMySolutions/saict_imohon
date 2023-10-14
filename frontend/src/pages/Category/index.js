import {useEffect, useState } from 'react';
import useCategoryStore from './stores/CategoryStore';
import axios from '../../libs/axios';
import CategoryForm from './components/form';
import { Button, Col,Row,Form, Toast} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryIndex = () => {
    const category = useCategoryStore()
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
                        <option>Choose Parent</option>
                        <option>------------</option>
                        <CategoryDropdown data={data} />
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
          <li className='p-2' key={category.id}>
            {/* <Button variant='light' size='sm' className='text-uppercase border border-1'>{category.name}</Button>  */}

            <CategoryItem category={category} />           
            <CategoryTree data={category.children} /> {/* Recursively render child categories */}
          </li>
        ))}
      </ul>
    );
  }

function CategoryDropdown({ data, depth = 0 }) {
  const indent = '_ _'.repeat(depth);
  
  return (
    <>
      {data.map((category,index) => (
        <>
     
        <option className={category.parent_id === null ? 'text-uppercase fw-bold' : ' text-uppercase'} key={index} value={category.id}>
          {depth != 0 && 'I'}{indent}{' '}{category.name}
        </option>
        <CategoryDropdown data={category.children} depth={depth + 1} />
        </>
      ))}

  </>
  );
}


function CategoryItem({ category }) {

  const [isEditing, setIsEditing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(category.name);

  const showNotificationFor2Seconds = () => {
    setShowNotification(true);
  
    // After 2 seconds, hide the notification
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = (id) => {

    const store = useCategoryStore.getState()
    const formData = new FormData();


    formData.append('_method', 'delete');
    
    axios({
      url: `${store.delete_url}/${id}`,
      method: 'post',
      data: formData,
    })
      .then((response) => {      
        useCategoryStore.setState({refresh: true})
        showNotificationFor2Seconds()
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  const handleSaveClick = (id) => {
    // Save the updated category name, e.g., send an API request
    const store = useCategoryStore.getState()
    console.log(`Saving category name: ${newCategoryName}`);

    // Send to server
    const formData = new FormData();

    formData.append('_method', 'put');
    formData.append('name', newCategoryName);
    
    axios({
      url: `${store.update_url}/${id}`,
      method: 'post',
      data: formData,
    })
      .then((response) => {      
        useCategoryStore.setState({refresh: true})
        showNotificationFor2Seconds()
      })
      .catch((error) => {
        console.error(error);
      });
    

    // Exit the editing mode
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <input
            style={{ backgroundColor: 'lightyellow'}}
            className='p-1 border border-1 me-1' 
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={ () => handleSaveClick(category.id) } variant='light' size='sm'><FontAwesomeIcon icon="fa-solid fa-save" /></Button> 
          <Button onClick={handleCancelClick} variant='light' size='sm'><FontAwesomeIcon icon="fa-solid fa-times" /></Button> 
        </>
      ) : (
        <>
        <Button
          variant='light'
          size='sm'
          className='text-uppercase border border-1'
        >
          {category.name}
        </Button>
        <Button onClick={handleEditClick} variant='light' size='sm'><FontAwesomeIcon icon="fa-solid fa-edit" /></Button> 
        
        {' '}
        <Button onClick={ () => handleDeleteClick(category.id) } variant='light' size='sm'><FontAwesomeIcon icon="fa-solid fa-trash" /></Button> 

        {showNotification && (
          <Toast
            onClose={() => setShowNotification(false)}
            show={showNotification}
            delay={2000}
            bg='dark'
            autohide
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Toast.Header className='bg-light'>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body className='text-light'>success</Toast.Body>
          </Toast>
        )}
        </>
      )}
      
    </>
  );
}

export default CategoryIndex;