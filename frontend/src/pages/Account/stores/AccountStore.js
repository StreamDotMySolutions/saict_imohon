import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const account = {
    refresh: false,
    store_url :  `${base_url}/account`,
    show_url :  `${base_url}/account`,
    update_url :  `${base_url}/account`,
    value: null
}
const useAccountStore = create( () => (account)) // create store
export default useAccountStore