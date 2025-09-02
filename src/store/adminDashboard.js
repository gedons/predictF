// src/stores/adminDashboard.js
import { defineStore } from 'pinia'
import api from '../services/api'
import { useAuthStore } from './auth'

function authHeaders() {
  const auth = useAuthStore()
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
}

export const useAdminDashboardStore = defineStore('adminDashboard', {
  state: () => ({
    summary: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchSummary() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/admin/summary', { headers: authHeaders() })
        this.summary = res.data
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    }
  }
})
