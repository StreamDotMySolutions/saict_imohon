import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useStore  = create((set) => ({

    url: `${base_url}/distribution-approvals`,
    index_url:  `${base_url}/distribution-approvals`,
    store_url:  `${base_url}/distribution-approvals`,
    show_url:  `${base_url}/distribution-approvals`,
    destroy_url:  `${base_url}/distribution-approvals`,
    update_url:  `${base_url}/distribution-approvals`,

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
