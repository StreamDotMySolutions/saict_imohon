import { create } from 'zustand'

const base_url = process.env.REACT_APP_BACKEND_URL

const useMohonItemStore = create((set, get) => ({
  mohonDistributionUrl: `${base_url}/admin/mohon-distribution`,
  mohonDistributionItemUrl: `${base_url}/admin/mohon-distribution-items`,
  mohonDistributionItemDeliveryUrl: `${base_url}/admin/mohon-distribution-item-deliveries`,
  bossApprovalUrl: `${base_url}/admin/mohon-distribution-approvals`,

  refresh: false,
  data: {},

  setRefresh: (val) => set({ refresh: val }),

  setValue: (fieldName, value) =>
    set(state => ({ data: { ...state.data, [fieldName]: { value } } })),

  getValue: (fieldName) => {
    const field = get().data[fieldName]
    return field ? field.value : null
  },

  reset: () => set({ data: {} }),
}))

export default useMohonItemStore
