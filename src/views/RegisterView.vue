<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
        <p class="mt-2 text-sm text-gray-600">Join us today and get started</p>
      </div>

      <!-- Form -->
      <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <form @submit.prevent="submit" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Enter your email"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': error }"
              />
            </div>
          </div>

          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
              Username <span class="text-gray-400">(optional)</span>
            </label>
            <div class="relative">
              <input
                id="username"
                v-model="username"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Choose a username"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': error }"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Create a password"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': error }"
              />
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="password2" class="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="password2"
                v-model="password2"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Confirm your password"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': error || (password2 && password !== password2) }"
              />
            </div>
            <div v-if="password2 && password !== password2" class="mt-2 text-sm text-red-600">
              Passwords do not match
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              {{ error }}
            </div>
          </div>

          <!-- Password Strength Indicator -->
          <div v-if="password" class="space-y-2">
            <div class="text-sm text-gray-600">Password strength:</div>
            <div class="flex space-x-1">
              <div 
                v-for="i in 4" 
                :key="i"
                class="h-2 flex-1 rounded-full"
                :class="getPasswordStrengthClass(i)"
              ></div>
            </div>
            <div class="text-xs text-gray-500">
              {{ getPasswordStrengthText() }}
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input 
                id="terms" 
                type="checkbox" 
                v-model="acceptTerms"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-gray-600">
                I agree to the 
                <a href="#" class="text-green-600 hover:text-green-800 font-medium">Terms of Service</a>
                and 
                <a href="#" class="text-green-600 hover:text-green-800 font-medium">Privacy Policy</a>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !acceptTerms || (password2 && password !== password2)"
            class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
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
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="font-semibold text-green-600 hover:text-green-800 transition-colors duration-200">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

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
  if (/[^A-Za-z0-9]/.test(password.value)) strength++
  return Math.min(strength, 4)
})

function getPasswordStrengthClass(index) {
  if (passwordStrength.value >= index) {
    if (passwordStrength.value <= 1) return 'bg-red-500'
    if (passwordStrength.value <= 2) return 'bg-yellow-500'
    if (passwordStrength.value <= 3) return 'bg-blue-500'
    return 'bg-green-500'
  }
  return 'bg-gray-200'
}

function getPasswordStrengthText() {
  if (passwordStrength.value <= 1) return 'Weak'
  if (passwordStrength.value <= 2) return 'Fair'
  if (passwordStrength.value <= 3) return 'Good'
  return 'Strong'
}

async function submit() {
  error.value = null
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
    await auth.register({ 
      email: email.value, 
      username: username.value || undefined, 
      password: password.value 
    })
    // On success, user will be logged in and auth.user will be set
      router.push({ path: '/user/onboarding' })
  } catch (e) {
    error.value = e.response?.data?.detail || JSON.stringify(e.response?.data) || e.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>