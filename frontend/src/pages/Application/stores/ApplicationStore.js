import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const application = {

    url :  `${base_url}/applications`, 
    refresh: false, // trigger for useEffect()
    errors : null, // error 422 from Laravel

    // formData
    description : {
        value:null, // user keyed in 
    },

    type : {
        value:null, // user keyed in 
    }
}

const useApplicationStore= create( () => (application) ) // create store
export default useApplicationStore