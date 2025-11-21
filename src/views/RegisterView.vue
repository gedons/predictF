<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth' 
import DarkModeToggle from '../components/DarkModeToggle.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const username = ref('')
const password = ref('')
const password2 = ref('')
const loading = ref(false)
const error = ref(null)
const acceptTerms = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  if (!password.value) return 0
  let strength = 0
  if (password.value.length >= 8) strength++
  if (/[a-z]/.test(password.value)) strength++
  if (/[A-Z]/.test(password.value)) strength++
  if (/[0-9]/.test(password.value)) strength++
  // Bonus point for special chars
  if (/[^A-Za-z0-9]/.test(password.value)) strength = Math.min(strength + 1, 4)
  return strength
})

function getPasswordStrengthClass(index) {
  if (passwordStrength.value >= index) {
    if (passwordStrength.value <= 1) return 'bg-red-500'
    if (passwordStrength.value <= 2) return 'bg-amber-500'
    if (passwordStrength.value <= 3) return 'bg-amber-400'
    return 'bg-emerald-500'
  }
  return 'bg-gray-200 dark:bg-gray-600'
}

function getPasswordStrengthText() {
  if (!password.value) return ''
  if (passwordStrength.value <= 1) return 'Weak'
  if (passwordStrength.value <= 2) return 'Fair'
  if (passwordStrength.value <= 3) return 'Good'
  return 'Strong'
}

function getPasswordStrengthTextClass() {
  if (passwordStrength.value <= 1) return 'text-red-600 dark:text-red-400'
  if (passwordStrength.value <= 2) return 'text-amber-600 dark:text-amber-400'
  if (passwordStrength.value <= 3) return 'text-amber-500 dark:text-amber-300'
  return 'text-emerald-600 dark:text-emerald-400'
}

async function submit() {
  error.value = null
  
  // Client-side validation
  if (!email.value || !password.value || !password2.value) {
    error.value = 'Please fill all required fields'
    return
  }
  if (password.value !== password2.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (!acceptTerms.value) {
    error.value = 'Please accept the terms and conditions'
    return
  }

  loading.value = true
  
  try {
    await auth.register({ email: email.value, username: username.value, password: password.value })
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to Onboarding
    router.push({ path: '/user/onboarding' })
  } catch (e) {
    error.value = e.response?.data?.detail || e.message || 'Registration failed'
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
        </router-link>
        <h2 class="mt-6 text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">Join the Network</h2>
        <p class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Begin your analytical journey today</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-soft-xl border border-gray-200/50 dark:border-gray-700 animate-rise-up animation-delay-200">
        <form @submit.prevent="submit" class="space-y-5">
          
          <!-- Email Field -->
          <div class="group">
            <label for="email" class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1 tracking-wide">
              Email ID <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full pl-10 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none font-medium tracking-wide"
                placeholder="analyst@domain.com"
                :class="{ 'border-red-500 focus:ring-red-500': error && !email }"
              />
            </div>
          </div>

          <!-- Username Field -->
          <div class="group">
            <label for="username" class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1 tracking-wide">
              Handle <span class="text-gray-400 font-normal text-xs">(username)</span>
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
                placeholder="Choose your analyst name"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="group">
            <label for="password" class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1 tracking-wide">
              Security Key <span class="text-red-500">*</span>
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
                required
                class="w-full pl-10 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none font-medium tracking-wide"
                placeholder="Create your security key"
              />
            </div>
          </div>

          <!-- Password Strength Indicator -->
          <div v-if="password" class="space-y-2 animate-rise-up">
            <div class="flex justify-between items-center px-1">
              <div class="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide">ENCRYPTION STRENGTH</div>
              <div class="text-xs font-black tracking-wide" :class="getPasswordStrengthTextClass()">
                {{ getPasswordStrengthText() }}
              </div>
            </div>
            <div class="flex space-x-1 h-2">
              <div 
                v-for="i in 4" 
                :key="i"
                class="flex-1 rounded-full transition-all duration-500 ease-out"
                :class="getPasswordStrengthClass(i)"
              ></div>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="group">
            <label for="password2" class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1 tracking-wide">
              Verify Security Key <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <input
                id="password2"
                v-model="password2"
                type="password"
                required
                class="w-full pl-10 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none font-medium tracking-wide"
                placeholder="Confirm your security key"
                :class="{ 'border-red-500 focus:ring-red-500': password2 && password !== password2 }"
              />
            </div>
            <div v-if="password2 && password !== password2" class="mt-2 text-xs sm:text-sm text-red-500 flex items-center animate-pulse ml-1 font-medium">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              Security keys do not match
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-sm flex items-center animate-shake font-medium">
            <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            {{ error }}
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start pt-1">
            <div class="flex items-center h-5">
              <input 
                id="terms" 
                type="checkbox" 
                v-model="acceptTerms"
                class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded cursor-pointer transition-colors duration-300"
              >
            </div>
            <div class="ml-3 text-sm leading-tight">
              <label for="terms" class="text-gray-600 dark:text-gray-400 cursor-pointer select-none font-medium">
                I agree to the 
                <a href="#" class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-bold hover:underline transition-colors duration-300">Analytical Framework</a>
                and 
                <a href="#" class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-bold hover:underline transition-colors duration-300">Data Protocol</a>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !acceptTerms || (password2 && password !== password2)"
            class="w-full bg-gradient-to-br from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black py-4 px-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-fire active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none tracking-wide"
          >
            <span v-if="loading" class="flex items-center justify-center font-semibold">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Initializing System...
            </span>
            <span v-else class="flex items-center justify-center font-semibold">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Activate Account
            </span>
          </button>
        </form>

        <!-- Sign in link -->
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Already part of the network?
            <router-link to="/login" class="font-semibold font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 transition-all duration-300 ml-1 tracking-wide">
              Access System
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