// src/stores/cacheStats.js
import { defineStore } from 'pinia'
import api from '../services/api'
import { useAuthStore } from '../store/auth'

export const useCacheStatsStore = defineStore('cacheStats', {
  state: () => ({
    loading: false,
    error: null,
    cache_enabled: false,
    total_entries: 0,
    entries_last_24h: 0,
    entries_last_7d: 0,
    last_entry: null
  }),
  getters: {
    lastEntryIso: (state) => state.last_entry ? new Date(state.last_entry).toISOString() : null,
    humanLastEntry: (state) => state.last_entry ? new Date(state.last_entry).toLocaleString() : 'N/A'
  },
  actions: {
    buildHeaders() {
      const auth = useAuthStore()
      return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
    },

    async fetchStats() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/predict/cache/stats', { headers: this.buildHeaders() })
        const data = res.data || {}
        this.cache_enabled = !!data.cache_enabled
        this.total_entries = data.total_entries ?? 0
        this.entries_last_24h = data.entries_last_24h ?? 0
        this.entries_last_7d = data.entries_last_7d ?? 0
        this.last_entry = data.last_entry ?? null
        return data
      } catch (err) {
        // normalize error message
        this.error = err.response?.data?.detail || err.response?.data || err.message || 'Failed to fetch cache stats'
        throw err
      } finally {
        this.loading = false
      }
    },

    clear() {
      this.cache_enabled = false
      this.total_entries = 0
      this.entries_last_24h = 0
      this.entries_last_7d = 0
      this.last_entry = null
      this.error = null
    }
  }
})
