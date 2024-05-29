import { useState, useEffect} from 'react'
import { Table,Alert,Row,Col, Button, ProgressBar,Modal,Form} from 'react-bootstrap'
import { InputText, InputTextarea } from '../modals/components/Inputs'
import axios from '../../../libs/axios'
import useMohonStore from '../store'

export default function MohonData({id}) {

    const store = useMohonStore()
    useEffect( () => {
      store.setValue('title', '') // set formValue
      store.setValue('user', '') // set formValue
      store.setValue('department', '') // set formValue
      store.setValue('description', '') // set formValue
      store.setValue('items', []) // set formValue
        axios({
            'method' : 'get',
            'url' : `${store.mohonRequestUrl}/${id}`
        })
        .then( response => {
          let mohon = response.data.mohon
          store.setValue('title', mohon.title) // set formValue
          store.setValue('user', mohon.user.name) // set formValue
          store.setValue('department', mohon.user.user_profile.user_department.name) // set formValue
          store.setValue('description', mohon.description) // set formValue
          store.setValue('items', mohon.mohon_items) // set formValue
        })
        .catch ( error => {
          console.warn(error)
        })
    },[id])

  
    return (
      <>
  
          <InputText 
              fieldName='user' 
              placeholder='Pemohon'  
              icon='fa-solid fa-user'
              isLoading={'true'}
            />
            <br />
            <InputText 
              fieldName='department' 
              placeholder='Jabatan'  
              icon='fa-solid fa-building'
              isLoading={'true'}
            />
            {/* <br />
            <InputText 
              fieldName='title' 
              placeholder='Tajuk permohonan'  
              icon='fa-solid fa-pencil'
              isLoading={'true'}
            />
            <br />
            <InputTextarea
              fieldName='description' 
              placeholder='Maklumat tambahan'  
              icon='fa-solid fa-question'
              rows='6'
              isLoading={'true'}
            />
            <br /> */}
            <br />
            <h5>Maklumat Peralatan</h5>
            <Table className='mt-3'>
                <thead>
                    <tr>
                        <th style={{ 'width': '20px'}}>ID</th>
                        <th>Item</th>
                        <th>Jenis</th>
                        <th>Maklumat Tambahan</th>
                    </tr>
                </thead>

                <tbody>
                    {store.getValue('items')?.map((item,index) => (
                        <tr key={index}>
                            <td> <span className="badge bg-primary">{item.id}</span></td>
                            <td>{item.category?.name}</td>
                            <td>{item.type === 'new' ? 'Baharu' : 'Ganti'}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
       
      </>
    );
  }