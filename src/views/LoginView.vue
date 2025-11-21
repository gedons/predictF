<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth' 
import DarkModeToggle from '../components/DarkModeToggle.vue'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

async function submit() {
  loading.value = true
  error.value = null
  
  try {
    await auth.login(username.value, password.value)
    
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const isAdmin = !!(auth.user && (auth.user.is_admin === true || auth.user.isAdmin === true))
    
    if (isAdmin) {
      router.push({ path: '/admin/dashboard' })
    } else {
      router.push({ path: '/user/predict/enriched' })
    }
  } catch (err) {
    error.value = err.response?.data?.detail || err.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-700">
    
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-red-300 dark:bg-red-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-float-slow"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 dark:bg-amber-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-float-medium"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-300 dark:bg-emerald-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-float-fast"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15"></div>
    </div>

    <!-- Dark Mode Toggle -->
    <!-- <div class="absolute top-4 right-4 z-50">
      <DarkModeToggle />
    </div> -->

    <div class="w-full max-w-md space-y-8 relative z-10">
      
      <!-- Header -->
      <div class="text-center animate-rise-up">
        <router-link to="/" class="inline-block group">
          <div class="mx-auto h-16 w-16 bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-glow transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
        </router-link>
        <h2 class="mt-6 text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">Access Intelligence</h2>
        <p class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Authenticate to unlock predictive analytics</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-soft-xl border border-gray-200/50 dark:border-gray-700 animate-rise-up animation-delay-200">
        <form @submit.prevent="submit" class="space-y-6">
          
          <!-- Username/Email Field -->
          <div class="group">
            <label for="username" class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1 tracking-wide">
              Email ID
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                class="w-full pl-10 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none font-medium tracking-wide"
                :class="{ 'border-red-500 focus:ring-red-500': error }"
                placeholder="Enter your credentials"
                autocomplete="username"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="group">
            <label for="password" class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1 tracking-wide">
              Security Key
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                class="w-full pl-10 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none font-medium tracking-wide"
                :class="{ 'border-red-500 focus:ring-red-500': error }"
                placeholder="••••••••"
                autocomplete="current-password"
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-sm flex items-center animate-shake font-medium">
            <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-br from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black py-4 px-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-fire active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none tracking-wide"
          >
            <span v-if="loading" class="flex items-center justify-center font-semibold">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Authenticating...
            </span>
            <span v-else class="flex items-center justify-center font-semibold">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Access System
            </span>
          </button>

          <!-- Additional Options -->
          <div class="flex items-center justify-between text-sm pt-2">
            <label class="flex items-center cursor-pointer group select-none">
              <div class="relative">
                <input type="checkbox" class="sr-only peer">
                <div class="w-4 h-4 border-2 border-gray-400 dark:border-gray-600 rounded-lg peer-checked:bg-red-600 peer-checked:border-red-600 transition-all duration-300"></div>
                <svg class="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="ml-2 text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">Remember credentials</span>
            </label>
          </div>
        </form>

        <!-- Sign up link -->
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
            New to the platform?
            <router-link to="/register" class="font-semibold font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 transition-all duration-300 ml-1 tracking-wide">
              Request Access
            </router-link>
          </p>
        </div>
      </div>
      
      <!-- Back to Home -->
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/50 tracking-wide">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Return Home
        </router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(20px, -30px) rotate(180deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-15px, 15px) rotate(90deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

@keyframes rise-up {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Background Grid Pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Shadow Systems */
.shadow-soft-xl {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 8px 16px -8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.shadow-glow {
  box-shadow: 
    0 0 20px rgba(220, 38, 38, 0.3),
    0 0 40px rgba(217, 119, 6, 0.2);
}

.shadow-fire {
  box-shadow: 
    0 10px 30px rgba(220, 38, 38, 0.3),
    0 15px 40px rgba(217, 119, 6, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Animation Classes */
.animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
.animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
.animate-float-fast { animation: float-fast 4s ease-in-out infinite; }

.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

.animate-rise-up {
  animation: rise-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animation-delay-200 {
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Enhanced focus states */
input:focus {
  transform: translateY(-1px);
}

/* Custom scrollbar for the page */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #fefdf8, #f5f1e6);
}

.dark ::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #1a1a1a, #050505);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #dc2626, #d97706);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #d97706, #059669);
}
</style>