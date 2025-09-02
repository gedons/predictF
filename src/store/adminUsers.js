// src/stores/adminUsers.js
import { defineStore } from 'pinia'
import api from '../services/api'
import { useAuthStore } from './auth'

function authHeaders() {
  const auth = useAuthStore()
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
}

export const useAdminUsersStore = defineStore('adminUsers', {
  state: () => ({
    users: [],
    total: 0,
    loading: false,
    error: null,
    q: '',
    limit: 50,
    offset: 0
  }),
  actions: {
    async fetchUsers({ q = '', limit = 50, offset = 0 } = {}) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/admin/users/', {
          params: { q: q || undefined, limit, offset },
          headers: authHeaders()
        })
        this.users = res.data.users || []
        this.total = res.data.total || 0
        this.q = q
        this.limit = limit
        this.offset = offset
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },
    async fetchUser(userId) {
      try {
        const res = await api.get(`/admin/users/${encodeURIComponent(userId)}`, {
          headers: authHeaders()
        })
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      }
    }
  }
})
