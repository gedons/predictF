// src/stores/auth.js
import { defineStore } from 'pinia'
import api from '../services/api'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: localStorage.getItem('access_token') || null,
    user: null,         
    loadingMe: false,
  }),
  getters: {
    isLoggedIn: (s) => !!s.access_token,
    isAdmin: (s) => !!(s.user && (s.user.is_admin === true || s.user.isAdmin === true)),
  },
  actions: {

    setToken(token) {
      this.access_token = token
      if (token) localStorage.setItem('access_token', token)
      else localStorage.removeItem('access_token')
    },

    async fetchMe() {
      // fetch user details; idempotent and safe to call multiple times
      if (!this.access_token) {
        this.user = null
        return null
      }

      // if user already present, return it
      if (this.user) return this.user

      this.loadingMe = true
      try {
        const res = await api.get('/auth/me')          
        const payload = res.data?.user ?? res.data
        this.user = payload
        return this.user
      } catch (err) {
        // token invalid or request failed -> clear token
        this.setToken(null)
        this.user = null
        throw err
      } finally {
        this.loadingMe = false
      }
    },

    logout() {
      this.setToken(null)
      this.user = null
      router.push('/login')
    },

    async login(username, password) {      
      const params = new URLSearchParams()
      params.append('username', username)
      params.append('password', password)

      const res = await api.post(
        '/auth/token',
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      const token = res.data?.access_token ?? res.data?.token ?? null
      if (!token) throw new Error('No token returned')
      this.setToken(token)
      // fetch /me immediately and return user
      await this.fetchMe()
      return this.user
    },

    async register(payload = { email: '', password: '', username: undefined }) {      
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/auth/register', payload)
        if (payload.email && payload.password) {
          // Some backends use email as username for token endpoint:
          await this.login(payload.email, payload.password)
        }
        return res.data
      } catch (err) {
        this.error = err.response?.data || err.message || 'Registration failed'
        throw err
      } finally {
        this.loading = false
      }
    },

  },
})
