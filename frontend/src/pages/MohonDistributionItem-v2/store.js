import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useMohonItemStore  = create((set) => ({

    url: `${base_url}/mohon-distribution-items`,
    submitUrl: `${base_url}/mohon-distribution-items`,

    mohonUrl: `${base_url}/mohon`,
    mohonDistributionUrl: `${base_url}/mohon-distribution`,
    mohonDistributionItemUrl: `${base_url}/mohon-distribution-items`,
    mohonDistributionItemDeliveryUrl: `${base_url}/mohon-distribution-item-deliveries`,
    bossApprovalUrl: `${base_url}/mohon-distribution-requests/by-admin`, // admin requesting to Boss
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
        const field = useMohonItemStore.getState().data[fieldName];
        return field ? field.value : null;
    },

}));

export default useMohonItemStore
