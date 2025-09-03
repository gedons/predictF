<!-- src/views/Predict.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <UserNavbar />

    <div class="container mx-auto px-4 py-8 lg:py-12">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Match Prediction
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Get AI-powered predictions for upcoming EPL matches. Select from live fixtures or enter match details manually.
        </p>
      </div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left: Form Section -->
        <div class="xl:col-span-2 space-y-6">
          <!-- Match Form Card -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Match Details</h2>
              <p class="text-gray-600">Enter the teams and match information below</p>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
              <!-- Team Selection -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15l4-4l4 4"/>
                    </svg>
                    Home Team
                  </label>
                  <input
                    v-model="home_team"
                    placeholder="e.g., Manchester United"
                    class="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <div class="space-y-3">
                  <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 9l-4 4l-4-4"/>
                    </svg>
                    Away Team
                  </label>
                  <input
                    v-model="away_team"
                    placeholder="e.g., Liverpool"
                    class="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <!-- Match Details -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Match Date
                  </label>
                  <input
                    v-model="match_date"
                    type="date"
                    :min="new Date().toISOString().split('T')[0]"
                    class="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <div class="space-y-3">
                  <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <svg class="w-4 h-4 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    League
                  </label>
                  <select
                    v-model="league"
                    class="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  >
                    <option value="premier_league">Premier League</option>
                    <option value="championship">Championship</option>
                    <option value="la_liga">La Liga</option>
                    <option value="serie_a">Serie A</option>
                    <option value="bundesliga">Bundesliga</option>
                    <option value="ligue_1">Ligue 1</option>
                  </select>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  <span v-if="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Match...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Get Prediction
                  </span>
                </button>

                <button 
                  type="button" 
                  class="px-6 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:bg-gray-50"
                  @click="clearForm"
                >
                  <span class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Clear Form
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Prediction Results -->
          <div v-if="prediction" class="transform transition-all duration-500 ease-in-out">
            <PredictionPreview :prediction="prediction" />
          </div>
        </div>

        <!-- Right: Upcoming Matches -->
        <div class="space-y-6">
          <!-- Upcoming Matches Component -->
          <UpcomingMatches
            :api-key="footballApiKey"
            :auto-refresh="true"
            :refresh-interval="300000"
            @select="onSelectMatch"
            @matches-loaded="onMatchesLoaded"
            @error="onMatchesError"
          />

          <!-- Data Source Info -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <div class="flex items-start text-sm text-blue-800">
              <svg class="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="font-medium mb-1">Live EPL Data</p>
                <p class="text-xs text-blue-600">
                  Match data provided by Football-Data.org API. 
                  <span v-if="matchStats.upcomingMatches > 0">
                    Currently showing {{ matchStats.upcomingMatches }} upcoming fixtures.
                  </span>
                  <span v-if="matchStats.lastUpdate" class="block mt-1">
                    Last updated: {{ formatLastUpdate(matchStats.lastUpdate) }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Rate Limit Info -->
          <div v-if="footballApiKey" class="bg-green-50 rounded-2xl p-4 border border-green-100">
            <div class="flex items-start text-sm text-green-800">
              <svg class="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="font-medium mb-1">API Connected</p>
                <p class="text-xs text-green-600">
                  Auto-refresh every 5 minutes to stay within limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePredictionStore } from '../store/prediction'
import { useAuthStore } from '../store/auth'  
import PredictionPreview from '../components/PredictionPreview.vue'
import UserNavbar from '../components/UserNavbar.vue'
import UpcomingMatches from '../components/UpcomingMatches.vue'
import Toast from '../components/Toast.vue'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const store = usePredictionStore()

// Form data
const home_team = ref('')
const away_team = ref('')
const match_date = ref('')
const league = ref('premier_league')
const loading = ref(false)
const prediction = ref(null)


const footballApiKey = ref(import.meta.env.VITE_FOOTBALL_API_KEY || '') 

// Match statistics from the API
const matchStats = ref({
  totalMatches: 0,
  upcomingMatches: 0,
  lastUpdate: null
})

// API status indicators
const apiError = ref(null)

const apiStatusClass = computed(() => {
  if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
    return 'bg-gray-100 text-gray-600'
  }
  if (apiError.value) {
    return 'bg-red-100 text-red-700'
  }
  if (matchStats.value.upcomingMatches > 0) {
    return 'bg-green-100 text-green-700'
  }
  return 'bg-yellow-100 text-yellow-700'
})

const apiStatusDot = computed(() => {
  if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
    return 'bg-gray-400'
  }
  if (apiError.value) {
    return 'bg-red-400'
  }
  if (matchStats.value.upcomingMatches > 0) {
    return 'bg-green-400 animate-pulse'
  }
  return 'bg-yellow-400'
})

const apiStatusText = computed(() => {
  if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
    return 'No API Key'
  }
  if (apiError.value) {
    return 'API Error'
  }
  if (matchStats.value.upcomingMatches > 0) {
    return 'Connected'
  }
  return 'Loading'
})

onMounted(async () => {
  try {
    // Set default date to today
    match_date.value = new Date().toISOString().split('T')[0]
    
    // Check if we have a valid API key
    if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
      console.warn('No Football-Data.org API key configured')
      //$toast.warning('⚠️ Add your Football-Data.org API key to load live fixtures')
    }
  } catch (e) {
    console.error('Error in onMounted:', e)
  }
})

async function submit() {
  loading.value = true
  try {
    const payload = {
      home_team: home_team.value,
      away_team: away_team.value,
      match_date: match_date.value,
      league: league.value
    }
    const res = await store.predictMatch(payload)
    prediction.value = res
    $toast.success('🎯 Prediction generated successfully!')
  } catch (e) {
    const errorMessage = e.response?.data?.detail || e.message || 'An error occurred'
    $toast.error(`❌ Prediction failed: ${errorMessage}`)
  } finally {
    loading.value = false
  }
}

function clearForm() {
  home_team.value = ''
  away_team.value = ''
  match_date.value = new Date().toISOString().split('T')[0]
  league.value = 'premier_league'
  prediction.value = null
  $toast.info('📝 Form cleared')
}

function onSelectMatch(match) {
  try {
    // Extract team names from Football-Data.org format
    const homeTeam = match.homeTeam?.shortName || match.homeTeam?.name || 'Unknown'
    const awayTeam = match.awayTeam?.shortName || match.awayTeam?.name || 'Unknown'
    
    // Fill form fields
    home_team.value = homeTeam
    away_team.value = awayTeam
    
    // Format date for input (expects yyyy-mm-dd)
    if (match.utcDate) {
      try {
        const matchDate = new Date(match.utcDate)
        if (!isNaN(matchDate)) {
          match_date.value = matchDate.toISOString().split('T')[0]
        }
      } catch (e) {
        console.warn('Error parsing match date:', e)
      }
    }
    
    // Set league to Premier League since we're getting EPL fixtures
    league.value = 'premier_league'
    
    // Clear any existing prediction
    prediction.value = null
    
    // Show success toast
    $toast.success(`⚽ Selected: ${homeTeam} vs ${awayTeam}`)
    
    console.log('Selected match:', {
      home: homeTeam,
      away: awayTeam,
      date: match_date.value,
      originalMatch: match
    })
  } catch (error) {
    console.error('Error selecting match:', error)
    $toast.error('❌ Error selecting match. Please try again.')
  }
}

function onMatchesLoaded(data) {
  matchStats.value = {
    totalMatches: data.total || 0,
    upcomingMatches: data.upcoming || 0,
    lastUpdate: new Date()
  }
  
  apiError.value = null
  
  console.log(`Loaded ${data.total} total matches, ${data.upcoming} upcoming`)
  
  if (data.upcoming === 0 && data.total > 0) {
    $toast.warning('⚠️ No upcoming fixtures found in the next 30 days')
  } else if (data.upcoming > 0) {
    $toast.success(`✅ Loaded ${data.upcoming} upcoming EPL fixtures`)
  }
}

function onMatchesError(error) {
  apiError.value = error.message || 'Unknown error'
  
  console.error('Matches API error:', error)
  
  // Show appropriate error message
  if (error.message?.includes('Invalid API key')) {
    $toast.error('🔑 Invalid API key. Please check your Football-Data.org API key')
  } else if (error.message?.includes('rate limit')) {
    $toast.error('⏱️ API rate limit exceeded. Please wait a moment before refreshing')
  } else {
    $toast.error(`❌ Error loading fixtures: ${error.message}`)
  }
}

function formatLastUpdate(date) {
  if (!date) return 'Never'
  
  try {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    
    return date.toLocaleDateString()
  } catch (e) {
    return 'Unknown'
  }
}
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth animations */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Pulse animation for status indicators */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>