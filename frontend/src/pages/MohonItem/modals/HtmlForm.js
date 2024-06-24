import { useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea, InputSelect, InputSelectRecursive } from './components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function HtmlForm({isLoading}) {

    const store = useMohonStore()
    const errors = store.errors
    const { mohonRequestId } = useParams()


    //const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [departments, setDepartments] = useState([])
  


    const types = [
      { id: 'new', name: 'Baharu' },
      { id: 'replacement', name: 'Ganti' }
    ];

    

    const  RecursiveDropdown = ({ data, selected, depth = 0 }) => {
      const indent = '_ _'.repeat(depth);
      
      return (
        <>
          {data?.map((item,index) => (
            <>
         
            {/* <option className={item.parent_id === null ? 'text-uppercase fw-bold' : ' text-uppercase'} key={index} value={item.id}> */}
            <option
              value={item.id}
              className={item.parent_id === null ? 'text-uppercase fw-bold' : 'text-uppercase'}
              key={index}
              disabled={item.parent_id === null}
              selected={selected == item.id} // Check if this item is selected
               >
              {depth != 0 && 'I'}{indent}{' '}{item.name}
            </option>
            <RecursiveDropdown data={item.children} selected={selected} depth={depth + 1} />
            </>
          ))}
    
      </>
      );
  }
  
    return (
      <>

            <Row className='mb-3'>
              <Col>
                <InputSelect 
                  fieldName='category_id' 
                  options = {store.getValue('categories')}
                  placeholder='Sila Pilih Peralatan'  
                  icon='fa-solid fa-computer'
                  isLoading={isLoading}
                />
              </Col>
              <Col>
                <InputSelect 
                  fieldName='type' 
                  options = {types}
                  placeholder='Sila Pilih Jenis'  
                  icon='fa-solid fa-info'
                  isLoading={isLoading}
                />
              </Col>

              
            </Row>

            <h5>Penerima Peralatan</h5>
            <Row className='mt-3'>
              <InputText 
                fieldName='name' 
                placeholder='Nama'  
                icon='fa-solid fa-user'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3 mb-3'>
              <InputText 
                fieldName='occupation' 
                placeholder='Jawatan'  
                icon='fa-solid fa-graduation-cap'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3 mb-3'>
              <InputText 
                fieldName='mobile' 
                placeholder='No Telefon (peribadi)'  
                icon='fa-solid fa-phone'
                isLoading={isLoading}
              />
            </Row>
                        
            <h5>Lokasi Penempatan Peralatan</h5>            
            <Row className='mt-3'>
              <InputSelectRecursive
                fieldName='department_id' 
                options = {departments}
                placeholder='Sila Pilih Jabatan'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
               >
                <RecursiveDropdown data={store.getValue('departments')} selected={store.getValue('department_id')} />
              </InputSelectRecursive>
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='building_name' 
                placeholder='Nama bangunan'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='building_level' 
                placeholder='Tingkat bangunan'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
              />
            </Row>

            {/* <Row className='mt-3'>
              <InputText 
                fieldName='section' 
                placeholder='Seksyen'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
              />
            </Row>

            <Row className='mt-3'>
              <InputText 
                fieldName='unit' 
                placeholder='Unit'  
                icon='fa-solid fa-building'
                isLoading={isLoading}
              />
            </Row> */}

  

            <Row className='mt-3 mb-3'>
              <InputText 
                fieldName='location' 
                placeholder='Lokasi peralatan'  
                icon='fa-solid fa-globe'
                isLoading={isLoading}
              />
            </Row>


            <h5>Justifikasi</h5>
            <InputTextarea
              fieldName='description' 
              placeholder='Sila lengkapkan justifikasi permohonan'  
              icon='fa-solid fa-pencil'
              rows='6'
              isLoading={isLoading}
            />
      
      </>
    );
  }

 
