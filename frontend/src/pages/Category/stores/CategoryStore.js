import { create } from 'zustand'

const categories = {

    refresh: false,
    index_url :  process.env.REACT_APP_BACKEND_URL + '/categories/?page=1',
    store_url :  process.env.REACT_APP_BACKEND_URL + '/categories',
    update_url :  process.env.REACT_APP_BACKEND_URL + '/categories',
    delete_url :  process.env.REACT_APP_BACKEND_URL + '/categories',
}
const useCategoryStore = create( () => (categories)) // create store
export default useCategoryStore