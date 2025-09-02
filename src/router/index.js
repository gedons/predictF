import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PredictView from '../views/PredictView.vue'
import EnrichedView from '../views/EnrichedView.vue'
import Onboarding from '../views/Onboarding.vue'
import MeQuotasView from '../views/MeQuotasView.vue'
// import CacheStats from '../views/CacheStats.vue'
import AdminModels from '../views/Admin/AdminModels.vue'
import AdminQuotas from '../views/Admin/AdminQuotas.vue'
import AdminUsers from '../views/Admin/AdminUsers.vue'
import Admin from '../views/Admin/Admin.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/login', component: LoginView, name: 'login' },
  { path: '/register', component: RegisterView, name: 'register' },
  { path: '/user/predict', component: PredictView, meta: { requiresAuth: true } },
  { path: '/user/predict/enriched', component: EnrichedView, meta: { requiresAuth: true } },
  { path: '/user/onboarding', component: Onboarding, meta: { requiresAuth: true } },
  { path: '/user/quotas', component: MeQuotasView, meta: { requiresAuth: true } },
  // { path: '/user/history', component: CacheStats, meta: { requiresAuth: true }},
  { path: '/admin/models', component: AdminModels, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/quotas', component: AdminQuotas, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/admin/users',name: 'AdminUsers',component: AdminUsers, meta: { requiresAuth: true, adminOnly: true }},
  { path: '/admin/dashboard', name: 'AdminDashboard',component: Admin, meta: { requiresAuth: true, adminOnly: true }}


]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  
  if (!to.meta?.requiresAuth) {
    return next()
  }

  if (!auth.isLoggedIn) {
    return next({ name: 'login' })
  }

  if (!auth.user && !auth.loadingMe) {
    try {
      await auth.fetchMe()
    } catch (err) {

      return next({ name: 'login' })
    }
  } else if (auth.loadingMe) {

    try {
      await auth.fetchMe()
    } catch (err) {
      return next({ name: 'login' })
    }
  }


  if (to.meta?.adminOnly) {
    const isAdmin = !!(auth.user && (auth.user.is_admin === true || auth.user.isAdmin === true))
    if (!isAdmin) {

      return next({ name: 'home' })
    }
  }

  return next()
})

export default router