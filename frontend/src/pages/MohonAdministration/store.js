import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useMohonStore  = create((set) => ({

    url: `${base_url}/administrations/mohon`,
    submitUrl: `${base_url}/administrations/mohon`,
    mohonRequestUrl: `${base_url}/administrations/mohon`,
    mohonApproval: `${base_url}/mohon-approval`,
    userApprovalUrl: `${base_url}/mohon-approval/by-user`,
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
        const field = useMohonStore.getState().data[fieldName];
        return field ? field.value : null;
    },

}));

export default useMohonStore