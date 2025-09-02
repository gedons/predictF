// src/stores/adminQuotas.js
import { defineStore } from 'pinia'
import api from '../services/api'
import { useAuthStore } from './auth'

function authHeaders() {
  const auth = useAuthStore()
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
}

export const useAdminQuotasStore = defineStore('adminQuotas', {
  state: () => ({
    defaults: {},             
    userQuotasSample: [],   
    userQuotas: {},         
    users: [],              
    loading: false,
    error: null
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/admin/quotas/', { headers: authHeaders() })
        const data = res.data
        // Normalize defaults and sample
        this.defaults = data.defaults || {}
        this.userQuotasSample = data.user_quotas_sample || data.quotas?.filter(q => q.user_id !== 'default').slice(0,20) || []
        return data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async fetchUserQuotas(userId) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`/admin/quotas/user/${encodeURIComponent(userId)}`, { headers: authHeaders() })
        const data = res.data
        this.userQuotas = { ...this.userQuotas, [userId]: data.quotas || [] }
        return data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async fetchUsers(search = '', limit = 50, offset = 0) {
      this.loading = true
      this.error = null
      try {
        const params = {}
        if (search) params.search = search
        params.limit = limit
        params.offset = offset
        const res = await api.get('/admin/quotas/users/', { params, headers: authHeaders() })
        this.users = res.data.users || []
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async grantDefault(defaultObj = {}, applyToExisting = false) {
      this.loading = true
      this.error = null
      try {
        // defaultObj might be mapping or canonical; backend accepts mapping
        const res = await api.post('/admin/quotas/grant-default', defaultObj, {
          params: { apply_to_all: applyToExisting ? true : false },
          headers: { 'Content-Type': 'application/json', ...authHeaders() }
        })
        await this.fetchAll()
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async setUserQuota(userId, endpoint, limit, remaining = null, unlimited = false) {
      this.loading = true
      this.error = null
      try {
        const body = { endpoint, limit, remaining, unlimited }
        const res = await api.post(`/admin/quotas/user/${encodeURIComponent(userId)}/set`, body, {
          headers: { 'Content-Type': 'application/json', ...authHeaders() }
        })
        await this.fetchUserQuotas(userId)
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async updateUserQuota(userId, endpoint, limit, remaining = null, unlimited = false) {
      this.loading = true
      this.error = null
      try {
        const body = { endpoint, limit, remaining, unlimited }
        const res = await api.post(`/admin/quotas/user/${encodeURIComponent(userId)}/update`, body, {
          headers: { 'Content-Type': 'application/json', ...authHeaders() }
        })
        await this.fetchUserQuotas(userId)
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async deleteUserEndpointQuota(userId, endpoint) {
      this.loading = true
      this.error = null
      try {
        const epEncoded = encodeURIComponent(endpoint)
        const res = await api.delete(`/admin/quotas/user/${encodeURIComponent(userId)}/endpoint/${epEncoded}`, { headers: authHeaders() })
        await this.fetchUserQuotas(userId)
        return res.data
      } catch (e) {
        this.error = e.response?.data?.detail || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    async resetUserQuotas(userId, endpoint = null) {
      this.loading = true
      this.error = null
      try {
        const body = endpoint ? { endpoint } : {}
        const res = await api.post(`/admin/quotas/user/${encodeURIComponent(userId)}/reset`, body, {
          headers: { 'Content-Type': 'application/json', ...authHeaders() }
        })
        await this.fetchUserQuotas(userId)
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
