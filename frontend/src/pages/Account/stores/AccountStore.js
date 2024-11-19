import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const account = {
   
    store_url :  `${base_url}/global/account`,
    show_url :  `${base_url}/global/account`,
    update_url :  `${base_url}/global.account`,
    refresh: false,
    email : null,
}
const useAccountStore = create( () => (account)) // create store
export default useAccountStore