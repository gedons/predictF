import { defineStore } from 'pinia'
import api from '../services/api'

export const useQuotasStore = defineStore('quotas', {
  state: () => ({ quotas: [] }),
  actions: {
    async fetchMyQuotas() {
      const r = await api.get('/me/quotas')
      this.quotas = r.data
      return this.quotas
    }
  }
})
