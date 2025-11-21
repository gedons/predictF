import axios from 'axios'
import { useAuthStore } from '../store/auth'

//const API_BASE =  'http://127.0.0.1:8000'
//const API_BASE =  process.env.VITE_API_BASE
const API_BASE = 'https://predict-wi9l.onrender.com'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 70_000
})

// attach token if present
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('access_token') || null
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (_) { /* ignore */ }
  return config
})

// ========== Authentication ==========
export const login = (username, password) => {
  const formData = new URLSearchParams()
  formData.append('username', username)
  formData.append('password', password)
  return api.post('/auth/token', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export const register = (data) => api.post('/auth/register', data)
export const getMe = () => api.get('/auth/me')

// ========== Predictions ==========
export const predictMatch = (data) => api.post('/predict/match', data)
export const predictEnriched = (data) => api.post('/predict/enriched', data)

// ========== Data Pipeline (Admin) ==========
export const refreshData = (params) => api.post('/api/data/refresh', params)
export const retrainModel = (params) => api.post('/api/data/retrain', params)

// ========== Model Management (Admin) ==========
export const listModels = () => api.get('/admin/models')
export const getModel = (id) => api.get(`/admin/models/${id}`)
export const activateModel = (id) => api.post(`/admin/models/${id}/activate`)
export const deactivateModel = (id) => api.post(`/admin/models/${id}/deactivate`)

// ========== User Management (Admin) ==========
export const listUsers = () => api.get('/admin/users')
export const getUser = (id) => api.get(`/admin/users/${id}`)
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data)
export const deleteUser = (id) => api.delete(`/admin/users/${id}`)

// ========== Quota Management ==========
export const getMyQuotas = () => api.get('/quotas/me')
export const listQuotas = () => api.get('/admin/quotas')
export const updateQuota = (userId, data) => api.put(`/admin/quotas/${userId}`, data)

// ========== Analytics (Admin) ==========
export const getAdminSummary = () => api.get('/admin/summary')
export const getAnalyticsEvents = (params) => api.get('/admin/analytics/events', { params })
export const getAnalyticsSummary = (params) => api.get('/admin/analytics/summary', { params })

// ========== External Data ==========
export const getExternalMatch = (params) => api.get('/external/match', { params })

export default api