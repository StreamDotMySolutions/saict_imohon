import { create } from 'zustand'


const content = {

    title: 'default',

}
const useStore = create( () => (content)) // create store
export default useStore