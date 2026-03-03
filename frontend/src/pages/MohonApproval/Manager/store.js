import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useMohonStore  = create((set) => ({

    url: `${base_url}/manager/mohon-requests`,
    submitUrl: `${base_url}/manager/mohon-requests`,
    showUrl: `${base_url}/manager/mohon-requests`,
    mohonApproval: `${base_url}/manager/mohon-approvals`,
    managerApprovalUrl: `${base_url}/manager/mohon-approvals`,
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
