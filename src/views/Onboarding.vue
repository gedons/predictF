<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-4xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm font-medium text-gray-600">
            Step {{ currentStep + 1 }} of {{ steps.length }}
          </div>
          <button 
            @click="skipOnboarding" 
            class="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Skip for now
          </button>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${((currentStep + 1) / steps.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div class="flex flex-col lg:flex-row min-h-[600px]">
          <!-- Left Side - Illustration/Visual -->
          <div class="lg:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 lg:p-12 flex items-center justify-center">
            <div class="text-center">
              <!-- Dynamic Icon based on step -->
              <div class="mx-auto mb-8 w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <component 
                  :is="steps[currentStep].icon" 
                  class="w-16 h-16 text-white"
                />
              </div>
              
              <!-- Animated Background Elements -->
              <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
                <div class="absolute top-1/3 -right-8 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                <div class="absolute -bottom-8 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>

          <!-- Right Side - Content -->
          <div class="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div class="max-w-md">
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {{ steps[currentStep].title }}
              </h1>
              
              <p class="text-gray-600 text-lg mb-8 leading-relaxed">
                {{ steps[currentStep].description }}
              </p>

              <!-- Feature List for current step -->
              <div v-if="steps[currentStep].features" class="space-y-4 mb-8">
                <div 
                  v-for="feature in steps[currentStep].features" 
                  :key="feature"
                  class="flex items-center space-x-3"
                >
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700">{{ feature }}</span>
                </div>
              </div>

              <!-- Interactive Element for Profile Setup Step -->
              <div v-if="currentStep === 1" class="space-y-4 mb-8">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    What should we call you?
                  </label>
                  <input
                    v-model="userPreferences.displayName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="Enter your preferred name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    What's your primary use case?
                  </label>
                  <select
                    v-model="userPreferences.useCase"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  >
                    <option value="">Select your use case</option>
                    <option value="business">Match Analysis</option>
                    <option value="research">Sport Betting</option>
                    <option value="education">Team Comparison</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>

              <!-- Notification Preferences for Settings Step -->
              <div v-if="currentStep === 2" class="space-y-4 mb-8">
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="userPreferences.emailNotifications"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    >
                    <span class="ml-3 text-gray-700">Email notifications for important updates</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="userPreferences.weeklyDigest"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    >
                    <span class="ml-3 text-gray-700">Weekly summary digest</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="userPreferences.marketingEmails"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    >
                    <span class="ml-3 text-gray-700">Product updates and tips</span>
                  </label>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex items-center justify-between">
                <button
                  v-if="currentStep > 0"
                  @click="previousStep"
                  class="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back
                </button>
                
                <div v-else></div>

                <button
                  @click="currentStep === steps.length - 1 ? finishOnboarding() : nextStep()"
                  class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {{ currentStep === steps.length - 1 ? 'Get Started' : 'Continue' }}
                  <svg v-if="currentStep < steps.length - 1" class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step Indicators -->
      <div class="flex justify-center mt-8 space-x-2">
        <button
          v-for="(step, index) in steps"
          :key="index"
          @click="goToStep(index)"
          class="w-3 h-3 rounded-full transition-all duration-200"
          :class="index === currentStep 
            ? 'bg-indigo-600 scale-125' 
            : index < currentStep 
              ? 'bg-indigo-400' 
              : 'bg-gray-300 hover:bg-gray-400'"
        ></button>
      </div>
    </div>

    <!-- Success Modal -->
    <div 
      v-if="showSuccessModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="showSuccessModal = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center transform animate-pulse">
        <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Welcome aboard!</h3>
        <p class="text-gray-600 mb-6">You're all set up and ready to start your journey.</p>
        <button 
          @click="finishOnboarding" 
          class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
        >
          Continue to App
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const auth = useAuthStore()

const currentStep = shallowRef(0)
const showSuccessModal = shallowRef(false)

const userPreferences = shallowRef({
  displayName: '',
  useCase: '',
  emailNotifications: true,
  weeklyDigest: true,
  marketingEmails: false
})

// Dynamic icons for each step
const WelcomeIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  `
}

const ProfileIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
  `
}

const SettingsIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  `
}

const ReadyIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  `
}

const steps = shallowRef([
  {
    title: "Welcome to Your Dashboard",
    description: "We're excited to have you on board! Let's take a quick tour to help you get the most out of your experience.",
    icon: WelcomeIcon,
    features: [
      "Powerful prediction tools",
      "Real-time analytics",
      "Collaborative workspace",
      "Advanced reporting"
    ]
  },
  {
    title: "Set Up Your Profile",
    description: "Tell us a bit about yourself so we can personalize your experience and provide relevant recommendations.",
    icon: ProfileIcon
  },
  {
    title: "Configure Your Preferences",
    description: "Choose how you'd like to stay informed and customize your notification settings to match your workflow.",
    icon: SettingsIcon
  },
  {
    title: "You're All Set!",
    description: "Everything is ready to go. You can always change these settings later in your account preferences.",
    icon: ReadyIcon,
    features: [
      "Start making predictions",
      "Explore sample datasets",
      "Access help documentation",
      "Connect with our community"
    ]
  }
])

function nextStep() {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function goToStep(index) {
  currentStep.value = index
}

function skipOnboarding() {
  finishOnboarding()
}

async function finishOnboarding() {
  if (currentStep.value === steps.value.length - 1) {
    showSuccessModal.value = true
    
    // Save user preferences (you can integrate this with your backend)
    try {
      // await saveUserPreferences(userPreferences.value)
      console.log('Saving user preferences:', userPreferences.value)
    } catch (error) {
      console.error('Error saving preferences:', error)
    }
    
    setTimeout(() => {
      showSuccessModal.value = false
      // Redirect to appropriate dashboard based on user role
      const isAdmin = !!(auth.user && (auth.user.is_admin === true || auth.user.isAdmin === true))
      if (isAdmin) {
        router.push({ path: '/admin/models' })
      } else {
        router.push({ path: '/user/predict' })
      }
    }, 2000)
  }
}

onMounted(() => {
  // Pre-fill display name if available from auth
  if (auth.user?.username) {
    userPreferences.value.displayName = auth.user.username
  } else if (auth.user?.email) {
    userPreferences.value.displayName = auth.user.email.split('@')[0]
  }
})
</script>