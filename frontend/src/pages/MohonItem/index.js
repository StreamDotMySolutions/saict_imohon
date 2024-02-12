import { Link, useParams, useNavigate} from 'react-router-dom'
import useMohonStore from '../Mohon/store'
import { useState } from 'react'
import axios from '../../libs/axios'
import MohonItemIndex from './components/MohonItemIndex'

const MohonItem = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const store = useMohonStore()
  const [title, setTitle] = useState('')

  axios({
    'method' : 'get',
    'url' : `${store.submitUrl}/${id}`
    })
    .then( response => {
        //console.log(response.data)
        let mohon = response.data.mohon
        //store.setValue('title', mohon.title) // set formValue
        setTitle(mohon.title)
        //store.setValue('description', mohon.description) // set formValue
    })
    .catch ( error => {
        console.warn(error)
    })

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link onClick={() => navigate(-1)} >Mohon</Link></li>
                    <li class="breadcrumb-item">{title}</li>
                </ol>
            </nav>
    
            <MohonItemIndex id={id} /> 
        </div>
    );
};

export default MohonItem;