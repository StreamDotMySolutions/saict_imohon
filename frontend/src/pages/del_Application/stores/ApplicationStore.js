import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useApplicationStore  = create((set) => ({

    url: `${base_url}/applications`,
    index_url:  `${base_url}/applications`,
    show_url:  `${base_url}/applications`,
    delete_url:  `${base_url}/applications`,
    edit_url:  `${base_url}/applications`,
    application_items_url:  `${base_url}/applications/items`,

    statistics_url:  `${base_url}/statistics`,

    refresh: false,
    errors: null,

    latestId: null,
    data: {},
    
    setValue: (fieldName, value) => {
      set((state) => ({
        data: {
          ...state.data,
          [fieldName]: { value },
        },
      }));
    },

    setError: (fieldName, error) => {
        set((state) => ({
          data: {
            ...state.data,
            [fieldName]: { error },
          },
        }));
    },
      
    emptyData: () => {
        set({ data: {} });
        set({ errors: {} });
    },

    getValue: (fieldName) => {
        const field = useApplicationStore.getState().data[fieldName];
        return field ? field.value : null;
    },


    // items: {},
    
    // addItem: (type, name, value) => {
    //   set((state) => ({
    //     items: {
    //       ...state.items,
    //       [type] :  {
    //                   [name]: { value },
    //                 }
    //     },
    //   }));
    // },


    // getItem: (type) => {
    //     const item = useApplicationStore.getState().items[type];
    //     return item ? item.value : null;
    // },
}));

export default useApplicationStore;
