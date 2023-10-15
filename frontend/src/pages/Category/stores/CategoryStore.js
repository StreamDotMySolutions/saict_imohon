import { create } from 'zustand'

const base_url =  process.env.REACT_APP_BACKEND_URL

const categories = {

    refresh: false,
    base_url :  base_url,
    index_url :  base_url + '/categories/?page=1',
    store_url :  base_url + '/categories',
    update_url :  base_url + '/categories',
    delete_url :  base_url + '/categories',
    ordering_url :  base_url + '/categories/ordering',
}
const useCategoryStore = create( () => (categories)) // create store
export default useCategoryStore