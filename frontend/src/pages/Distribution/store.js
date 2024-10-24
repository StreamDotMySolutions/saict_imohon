import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useStore  = create((set) => ({

    url: `${base_url}/distributions`,
    index_url:  `${base_url}/distributions`,
    store_url:  `${base_url}/distributions`,
    show_url:  `${base_url}/distributions`,
    destroy_url:  `${base_url}/distributions`,
    update_url:  `${base_url}/distributions`,
    application_url:  `${base_url}/applications`,

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

    getValue: (fieldName) => {
      const field = useStore.getState().data[fieldName];
      return field ? field.value : null;
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



}));

export default useStore;
