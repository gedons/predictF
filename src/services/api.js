import axios from 'axios'
import { useAuthStore } from '../store/auth'

const API_BASE = import.meta.env.VITE_API_URL || 'https://predict-wi9l.onrender.com'

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

export default api