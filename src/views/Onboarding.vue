<script setup>
import { ref, computed, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth' 


const router = useRouter()
const auth = useAuthStore()

const currentStep = ref(0)
const direction = ref('next')
const showSuccessModal = ref(false)

const userPreferences = ref({
  displayName: '',
  useCase: '',
  emailNotifications: true,
  weeklyDigest: true,
  marketingEmails: false
})

// --- Icons defined as Functional Components for Runtime Safety ---
const WelcomeIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-full h-full' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' })
])

const ProfileIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-full h-full' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
])

const SettingsIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-full h-full' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
])

const ReadyIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-full h-full' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
])

const steps = [
  {
    title: "Welcome Aboard",
    description: "You've just joined the most advanced sports prediction platform. Let's get you set up for success.",
    icon: WelcomeIcon,
    color: "from-blue-500 to-indigo-600",
    features: ["AI-Powered Predictions", "Real-time Analytics", "Live Odds Integration"]
  },
  {
    title: "Build Your Profile",
    description: "Help us personalize your dashboard by telling us a bit about your goals.",
    icon: ProfileIcon,
    color: "from-indigo-500 to-purple-600"
  },
  {
    title: "Stay in the Loop",
    description: "Configure your notification settings so you never miss a winning opportunity.",
    icon: SettingsIcon,
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Ready to Win?",
    description: "Your account is configured. Dive in and start exploring our prediction models.",
    icon: ReadyIcon,
    color: "from-pink-500 to-rose-600",
    features: ["Explore Matches", "Check Leaderboards", "View Insights"]
  }
]

// --- Computed Properties ---
const currentStepData = computed(() => steps[currentStep.value])
const progressPercentage = computed(() => ((currentStep.value + 1) / steps.length) * 100)

// --- Methods ---
function nextStep() {
  if (currentStep.value < steps.length - 1) {
    direction.value = 'next'
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    direction.value = 'prev'
    currentStep.value--
  }
}

function goToStep(index) {
  direction.value = index > currentStep.value ? 'next' : 'prev'
  currentStep.value = index
}

function finishOnboarding() {
  showSuccessModal.value = true

  setTimeout(() => {
    showSuccessModal.value = false
    router.push('/user/predict/enriched') 
  }, 2000)
}

onMounted(() => {
  // Pre-fill logic if needed
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
    
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-pink-300/30 dark:bg-pink-900/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="w-full max-w-5xl relative z-10">
      
      <!-- Progress Header -->
      <div class="mb-6 sm:mb-8 max-w-2xl mx-auto lg:max-w-none animate-fade-in-down">
        <div class="flex items-center justify-between mb-3 px-1">
          <span class="text-xs sm:text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
            Step {{ currentStep + 1 }} of {{ steps.length }}
          </span>
          <button 
            v-if="currentStep < steps.length - 1"
            @click="finishOnboarding" 
            class="text-xs sm:text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            Skip Setup
          </button>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Main Card -->
      <div class="bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 overflow-hidden min-h-[550px] sm:min-h-[600px] flex flex-col lg:flex-row transition-all duration-500">
        
        <!-- Left Side: Visual Panel (Top on Mobile) -->
        <div 
          class="lg:w-5/12 relative overflow-hidden transition-all duration-500 ease-in-out"
          :class="`bg-gradient-to-br ${currentStepData.color}`"
        >
          <!-- Dynamic Pattern Overlay -->
          <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div class="relative z-10 h-full flex flex-col items-center justify-center p-8 sm:p-12 text-center">
            <!-- Animated Icon Container -->
            <div class="relative mb-6 sm:mb-8 group">
              <div class="absolute inset-0 bg-white/30 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-700"></div>
              <div class="relative w-24 h-24 sm:w-32 sm:h-32 bg-white/10 backdrop-blur-md rounded-full p-5 sm:p-7 shadow-2xl border border-white/20 flex items-center justify-center">
                <Transition name="scale" mode="out-in">
                  <component 
                    :is="currentStepData.icon" 
                    :key="currentStep"
                    class="text-white drop-shadow-lg transform transition-all duration-300"
                  />
                </Transition>
              </div>
              
              <!-- Decorative Particles -->
              <div class="absolute -top-2 -right-2 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
              <div class="absolute bottom-0 -left-2 w-3 h-3 bg-white/40 rounded-full animate-pulse delay-700"></div>
            </div>

            <div class="hidden lg:block space-y-2">
               <h3 class="text-white text-xl font-bold tracking-tight">{{ currentStepData.title }}</h3>
               <p class="text-white/80 text-sm">{{ currentStepData.description }}</p>
            </div>
          </div>
        </div>

        <!-- Right Side: Content Panel -->
        <div class="lg:w-7/12 p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative">
          
          <!-- Content Transition Wrapper -->
          <div class="flex-1 flex flex-col justify-center">
            <Transition :name="direction === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
              <div :key="currentStep" class="w-full">
                
                <!-- Step Title (Mobile/Desktop consistent) -->
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {{ currentStepData.title }}
                </h2>
                
                <!-- Step Description (Mobile Only - Hidden on Desktop Large) -->
                <p class="lg:hidden text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                  {{ currentStepData.description }}
                </p>

                <!-- Desktop Description -->
                <p class="hidden lg:block text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  {{ currentStepData.description }}
                </p>

                <!-- Dynamic Content Based on Step -->
                
                <!-- STEP 0 & 3: Features List -->
                <div v-if="currentStep === 0 || currentStep === 3" class="space-y-4">
                  <div 
                    v-for="(feature, idx) in currentStepData.features" 
                    :key="idx"
                    class="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm"
                    :style="{ transitionDelay: `${idx * 100}ms` }"
                  >
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-4 shadow-md">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">{{ feature }}</span>
                  </div>
                </div>

                <!-- STEP 1: Profile Form -->
                <div v-if="currentStep === 1" class="space-y-5">
                  <div class="group">
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Display Name</label>
                    <input
                      v-model="userPreferences.displayName"
                      type="text"
                      class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none shadow-sm group-hover:bg-white dark:group-hover:bg-gray-800"
                      placeholder="e.g. Alex Striker"
                    />
                  </div>
                  
                  <div class="group">
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Primary Goal</label>
                    <div class="relative">
                      <select
                        v-model="userPreferences.useCase"
                        class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none shadow-sm appearance-none cursor-pointer group-hover:bg-white dark:group-hover:bg-gray-800"
                      >
                        <option value="" disabled selected>Select your main interest...</option>
                        <option value="business">Match Analysis</option>
                        <option value="research">Sports Betting</option>
                        <option value="education">Fan / Entertainment</option>
                      </select>
                      <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- STEP 2: Preferences -->
                <div v-if="currentStep === 2" class="space-y-4">
                   <!-- Option 1 -->
                   <label class="flex p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-all duration-200 bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                     <div class="flex items-center h-5 mt-1">
                       <input type="checkbox" v-model="userPreferences.emailNotifications" class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-150 ease-in-out">
                     </div>
                     <div class="ml-4">
                       <span class="block text-sm font-bold text-gray-900 dark:text-white">Important Updates</span>
                       <span class="block text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Get notified about account security and major feature releases.</span>
                     </div>
                   </label>

                   <!-- Option 2 -->
                   <label class="flex p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-all duration-200 bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                     <div class="flex items-center h-5 mt-1">
                       <input type="checkbox" v-model="userPreferences.weeklyDigest" class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-150 ease-in-out">
                     </div>
                     <div class="ml-4">
                       <span class="block text-sm font-bold text-gray-900 dark:text-white">Weekly Digest</span>
                       <span class="block text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">A summary of your prediction performance delivered every Monday.</span>
                     </div>
                   </label>
                </div>

              </div>
            </Transition>
          </div>

          <!-- Action Buttons -->
          <div class="mt-10 flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
            
            <!-- Back Button (Hidden on Step 0, but keeping layout space) -->
            <div class="w-1/3">
              <button
                v-if="currentStep > 0"
                @click="previousStep"
                class="group flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <svg class="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Back
              </button>
            </div>

            <!-- Step Indicators -->
            <div class="flex space-x-2">
              <div 
                v-for="(step, index) in steps" 
                :key="index"
                @click="goToStep(index)"
                class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                :class="currentStep === index ? 'bg-indigo-600 w-6 sm:w-8' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'"
              ></div>
            </div>

            <!-- Next/Finish Button -->
            <div class="w-1/3 flex justify-end">
              <button
                @click="currentStep === steps.length - 1 ? finishOnboarding() : nextStep()"
                class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center"
              >
                {{ currentStep === steps.length - 1 ? 'Get Started' : 'Continue' }}
                <svg v-if="currentStep < steps.length - 1" class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Success Modal Overlay -->
    <Transition name="fade">
      <div 
        v-if="showSuccessModal" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
      >
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl transform transition-all scale-100 animate-bounce-in">
          <div class="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">All Systems Go!</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8 text-lg">Your dashboard is being prepared. Get ready to make smarter predictions.</p>
          <div class="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* Custom Transition Classes */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.scale-enter-active,
.scale-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Slide Left (Next) */
.slide-left-enter-from { opacity: 0; transform: translateX(30px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-30px); }

/* Slide Right (Back) */
.slide-right-enter-from { opacity: 0; transform: translateX(-30px); }
.slide-right-leave-to { opacity: 0; transform: translateX(30px); }

/* Scale for Icons */
.scale-enter-from { opacity: 0; transform: scale(0.5) rotate(-15deg); }
.scale-leave-to { opacity: 0; transform: scale(0.5) rotate(15deg); }

/* Simple Fade */
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Keyframes for Blobs */
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* Fade In Down Initial Load */
@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }

/* Bounce In Modal */
@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
.animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000); }
</style>