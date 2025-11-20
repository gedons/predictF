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
    if (passwordStrength.value <= 2) return 'bg-yellow-500'
    if (passwordStrength.value <= 3) return 'bg-blue-500'
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
  if (passwordStrength.value <= 2) return 'text-yellow-600 dark:text-yellow-400'
  if (passwordStrength.value <= 3) return 'text-blue-600 dark:text-blue-400'
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
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
    
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Dark Mode Toggle -->
    <div class="absolute top-4 right-4 z-50">
      <DarkModeToggle />
    </div>

    <div class="w-full max-w-md space-y-8 relative z-10">
      
      <!-- Header -->
      <div class="text-center animate-fade-in-up">
        <router-link to="/" class="inline-block group">
          <div class="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
        </router-link>
        <h2 class="mt-6 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">Create Account</h2>
        <p class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Join us today and start predicting</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 animate-fade-in-up animation-delay-200">
        <form @submit.prevent="submit" class="space-y-5">
          
          <!-- Email Field -->
          <div class="group">
            <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Email Address <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full pl-10 pr-4 py-3 sm:py-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none"
                placeholder="name@example.com"
                :class="{ 'border-red-500 focus:ring-red-500': error && !email }"
              />
            </div>
          </div>

          <!-- Username Field -->
          <div class="group">
            <label for="username" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Username <span class="text-gray-400 font-normal text-xs">(Optional)</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                class="w-full pl-10 pr-4 py-3 sm:py-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none"
                placeholder="Choose a username"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="group">
            <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full pl-10 pr-4 py-3 sm:py-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <!-- Password Strength Indicator -->
          <div v-if="password" class="space-y-2 animate-fade-in-up">
            <div class="flex justify-between items-center px-1">
              <div class="text-xs font-medium text-gray-500 dark:text-gray-400">Strength</div>
              <div class="text-xs font-bold" :class="getPasswordStrengthTextClass()">
                {{ getPasswordStrengthText() }}
              </div>
            </div>
            <div class="flex space-x-1 h-1.5">
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
            <label for="password2" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <input
                id="password2"
                v-model="password2"
                type="password"
                required
                class="w-full pl-10 pr-4 py-3 sm:py-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white outline-none"
                placeholder="Repeat password"
                :class="{ 'border-red-500 focus:ring-red-500': password2 && password !== password2 }"
              />
            </div>
            <div v-if="password2 && password !== password2" class="mt-2 text-xs sm:text-sm text-red-500 flex items-center animate-pulse ml-1">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              Passwords do not match
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-sm flex items-center animate-shake">
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
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded cursor-pointer transition-colors"
              >
            </div>
            <div class="ml-3 text-sm leading-tight">
              <label for="terms" class="text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                I agree to the 
                <a href="#" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium hover:underline">Terms of Service</a>
                and 
                <a href="#" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !acceptTerms || (password2 && password !== password2)"
            class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Sign in link -->
        <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <router-link to="/login" class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 ml-1">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
      
      <!-- Back to Home -->
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to home
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.animation-delay-200 {
  animation-delay: 0.1s;
  animation-fill-mode: both;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>