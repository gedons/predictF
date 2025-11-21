<template>
  <nav class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-soft transition-colors duration-500">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-9 h-9 bg-gradient-to-br from-red-600 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-glow">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xl font-black bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent tracking-tight font-semibold">
                MatchCraft AI
              </span>
              <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide -mt-1">ANALYST DASHBOARD</span>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link 
            to="/user/predict" 
            class="nav-link group"
            active-class="nav-link-active"
          >
            <div class="nav-icon-container">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span class="nav-text text-amber-600">Predict Match</span>
          </router-link>

          <router-link
            to="/user/predict/enriched"
            class="nav-link group"
            active-class="nav-link-active"
          >
            <div class="nav-icon-container">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="nav-text text-amber-600">AI Analysis</span>
          </router-link>
          
          <router-link 
            to="/user/quotas" 
            class="nav-link group"
            active-class="nav-link-active"
          >
            <div class="nav-icon-container">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="nav-text text-amber-600">Quotas</span>
          </router-link>

          <button @click="logout" class="nav-link group !text-red-500 hover:!text-red-600 dark:hover:!text-red-400 cursor-pointer transition-all duration-300">
            <div class="nav-icon-container !bg-red-100 dark:!bg-red-900/30 !text-red-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"></path>
              </svg>
            </div>
            <span class="nav-text font-semibold">Sign Out</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 animate-rise-up bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-b-2xl -mx-4 px-4"
      >
        <div class="flex flex-col space-y-2">
          <router-link 
            to="/user/predict" 
            class="mobile-nav-link group"
            active-class="mobile-nav-link-active"
            @click="mobileMenuOpen = false"
          >
            <div class="mobile-nav-icon-container">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span class="mobile-nav-text">Predict Match</span>
          </router-link>
          
          <router-link 
            to="/user/predict/enriched" 
            class="mobile-nav-link group"
            active-class="mobile-nav-link-active"
            @click="mobileMenuOpen = false"
          >
            <div class="mobile-nav-icon-container">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="mobile-nav-text">AI Analysis</span>
          </router-link>
          
          <router-link 
            to="/user/quotas" 
            class="mobile-nav-link group"
            active-class="mobile-nav-link-active"
            @click="mobileMenuOpen = false"
          >
            <div class="mobile-nav-icon-container">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="mobile-nav-text">Quotas</span>
          </router-link>

          <button @click="logout" class="mobile-nav-link group !text-red-500 hover:!text-red-600 dark:hover:!text-red-400 cursor-pointer transition-all duration-300">
            <div class="mobile-nav-icon-container !bg-red-100 dark:!bg-red-900/30 !text-red-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"></path>
              </svg>
            </div>
            <span class="mobile-nav-text font-bold">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const route = useRoute()
const router = useRouter()

const mobileMenuOpen = ref(false)

const logout = async () => {
    const auth = useAuthStore()
    await auth.logout()
    router.push('/login')
}
</script>

<style scoped>
/* Shadow Systems */
.shadow-soft {
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.shadow-glow {
  box-shadow: 
    0 0 20px rgba(220, 38, 38, 0.3),
    0 0 40px rgba(217, 119, 6, 0.2);
}

/* Desktop Navigation */
.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  color: #4b5563;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.nav-link:hover {
  color: #111827;
  background-color: #fef3f2;
  border-color: #fecaca;
  transform: translateY(-1px);
}

.nav-link-active {
  color: #dc2626;
  background: linear-gradient(135deg, #fef3f2 0%, #fffbeb 100%);
  border: 1px solid #fecaca;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

.dark .nav-link {
  color: #9ca3af;
}

.dark .nav-link:hover {
  color: #f9fafb;
  background-color: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.3);
}

.dark .nav-link-active {
  color: #fca5a5;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%);
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.nav-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link:hover .nav-icon-container {
  background: linear-gradient(135deg, #fef3f2 0%, #fffbeb 100%);
  transform: scale(1.1);
}

.nav-link-active .nav-icon-container {
  background: linear-gradient(135deg, #fecaca 0%, #fed7aa 100%);
}

.dark .nav-icon-container {
  background-color: #374151;
}

.nav-text {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.025em;
}

/* Mobile Navigation */
.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #4b5563;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.mobile-nav-link:hover {
  color: #111827;
  background-color: #fef3f2;
  border-color: #fecaca;
  transform: translateX(4px);
}

.mobile-nav-link-active {
  color: #dc2626;
  background: linear-gradient(135deg, #fef3f2 0%, #fffbeb 100%);
  border: 1px solid #fecaca;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

.dark .mobile-nav-link {
  color: #9ca3af;
}

.dark .mobile-nav-link:hover {
  color: #f9fafb;
  background-color: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.3);
}

.dark .mobile-nav-link-active {
  color: #fca5a5;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%);
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.mobile-nav-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #f8fafc;
  border-radius: 0.625rem;
  margin-right: 0.75rem;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover .mobile-nav-icon-container {
  background: linear-gradient(135deg, #fef3f2 0%, #fffbeb 100%);
  transform: scale(1.05);
}

.mobile-nav-link-active .mobile-nav-icon-container {
  background: linear-gradient(135deg, #fecaca 0%, #fed7aa 100%);
}

.dark .mobile-nav-icon-container {
  background-color: #374151;
}

.mobile-nav-text {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.025em;
}

/* Animations */
.animate-rise-up {
  animation: riseUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes riseUp {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Enhanced focus states */
button:focus, 
a:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

/* Smooth transitions for dark mode */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>