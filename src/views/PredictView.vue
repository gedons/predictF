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

onMounted(async () => {
  try {
    // Set default date to today
    match_date.value = new Date().toISOString().split('T')[0]
    
    // Check if we have a valid API key
    if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
      console.warn('No Football-Data.org API key configured')
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
    const homeTeam = match.homeTeam?.shortName || match.homeTeam?.name || 'Unknown'
    const awayTeam = match.awayTeam?.shortName || match.awayTeam?.name || 'Unknown'
    
    home_team.value = homeTeam
    away_team.value = awayTeam
    
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
    
    league.value = 'premier_league'
    prediction.value = null
    $toast.success(`⚽ Selected: ${homeTeam} vs ${awayTeam}`)

    // Scroll to top on mobile
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
  
  if (data.upcoming === 0 && data.total > 0) {
    $toast.warning('⚠️ No upcoming fixtures found in the next 30 days')
  } else if (data.upcoming > 0) {
    $toast.success(`✅ Loaded ${data.upcoming} upcoming EPL fixtures`)
  }
}

function onMatchesError(error) {
  apiError.value = error.message || 'Unknown error'
  console.error('Matches API error:', error)
  
  if (error.message?.includes('Invalid API key')) {
    $toast.error('🔑 Invalid API key. Please check your Football-Data.org API key')
  } else if (error.message?.includes('rate limit')) {
    $toast.error('⏱️ API rate limit exceeded. Please wait a moment before refreshing')
  } else {
    $toast.error(`❌ Error loading fixtures: ${error.message}`)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden font-sans transition-colors duration-700">
    
    <!-- Red-Amber-Emerald Background Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] bg-red-100/40 dark:bg-red-900/20 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute top-[20%] -left-[10%] w-[60%] h-[60%] bg-amber-100/40 dark:bg-amber-900/20 rounded-full blur-3xl animate-float-medium"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full blur-3xl animate-float-fast"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15"></div>
    </div>

    <UserNavbar />

    <div class="relative z-10 container mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-rise-up">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl shadow-glow mb-6 transform hover:scale-110 hover:rotate-12 transition-all duration-500">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
          Match <span class="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-amber-600 animate-glow">Prediction</span>
        </h1>
        <p class="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium tracking-wide">
          AI-powered match analysis with neural network processing. Select fixtures or input custom parameters.
        </p>
      </div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left: Form Section -->
        <div class="xl:col-span-2 space-y-8">
          <!-- Match Form Card -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-soft-xl border border-gray-200/50 dark:border-gray-700 p-6 sm:p-8 animate-rise-up animation-delay-200">
            <div class="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 class="font-semibold text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Match Parameters</h2>
              <p class="font-semibold text-gray-600 dark:text-gray-400 text-sm font-medium tracking-wide">Configure the neural network analysis parameters</p>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
              <!-- Team Selection -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Home Team
                  </label>
                  <div class="relative transition-all duration-300 transform group-hover:-translate-y-1">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15l4-4l4 4"/>
                       </svg>
                    </div>
                    <input
                      v-model="home_team"
                      placeholder="e.g., Manchester United"
                      class="w-full pl-11 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none font-bold tracking-wide shadow-sm group-hover:shadow-md"
                      required
                    />
                  </div>
                </div>

                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                    <span class="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    Away Team
                  </label>
                  <div class="relative transition-all duration-300 transform group-hover:-translate-y-1">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 9l-4 4l-4-4"/>
                       </svg>
                    </div>
                    <input
                      v-model="away_team"
                      placeholder="e.g., Liverpool"
                      class="w-full pl-11 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none font-bold tracking-wide shadow-sm group-hover:shadow-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Match Details -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Match Date
                  </label>
                  <div class="relative transition-all duration-300 transform group-hover:-translate-y-1">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                       </svg>
                    </div>
                    <input
                      v-model="match_date"
                      type="date"
                      :min="new Date().toISOString().split('T')[0]"
                      class="font-semibold w-full pl-11 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none font-bold tracking-wide shadow-sm group-hover:shadow-md"
                      required
                    />
                  </div>
                </div>

                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    League
                  </label>
                  <div class="relative transition-all duration-300 transform group-hover:-translate-y-1">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                       </svg>
                    </div>
                    <select
                      v-model="league"
                      class="font-semibold w-full pl-11 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white outline-none appearance-none cursor-pointer font-bold tracking-wide shadow-sm group-hover:shadow-md"
                    >
                      <option value="premier_league">Premier League</option>
                      <option value="championship">Championship</option>
                      <option value="la_liga">La Liga</option>
                      <option value="serie_a">Serie A</option>
                      <option value="bundesliga">Bundesliga</option>
                      <option value="ligue_1">Ligue 1</option>
                    </select>
                    <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex-1 group relative bg-gradient-to-br from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-black py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-fire disabled:shadow-none disabled:cursor-not-allowed overflow-hidden tracking-wide"
                >
                  <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span v-if="loading" class=" font-semibold relative flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running Prediction...
                  </span>
                  <span v-else class="font-semibold relative flex items-center justify-center text-lg">
                    <svg class="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Execute Prediction
                  </span>
                </button>

                <button 
                  type="button" 
                  class="sm:w-auto w-full px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400 font-black rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 flex items-center justify-center tracking-wide group"
                  @click="clearForm"
                >
                  <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Clear Parameters
                </button>
              </div>
            </form>
          </div>

          <!-- Prediction Results -->
          <div v-if="prediction" class="transform transition-all duration-500 ease-in-out animate-rise-up">
            <PredictionPreview :prediction="prediction" />
          </div>
        </div>

        <!-- Right: Upcoming Matches -->
        <div class="space-y-6 animate-rise-up animation-delay-200">
          
          <!-- Upcoming Matches Component -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-soft-xl border border-red-100 dark:border-red-800/30 overflow-hidden min-h-[300px]">
             <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50/50 to-amber-50/50 dark:from-red-900/10 dark:to-amber-900/10">
                <h3 class="font-black text-gray-900 dark:text-white text-lg flex items-center tracking-tight">
                    <span class="relative flex h-3 w-3 mr-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    Live Fixtures
                </h3>
             </div>
             <!-- Component Wrapper -->
             <div class="p-1">
                 <UpcomingMatches
                    :api-key="footballApiKey"
                    :auto-refresh="true"
                    :refresh-interval="300000"
                    @select="onSelectMatch"
                    @matches-loaded="onMatchesLoaded"
                    @error="onMatchesError"
                  />
             </div>
          </div>

          <!-- Data Source Info -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-start text-sm">
              <div class="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg mr-4 shrink-0">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="font-black text-gray-800 dark:text-white mb-1 tracking-wide">Data Source</p>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  Match data provided by Football-Data.org API. 
                  <span v-if="matchStats.upcomingMatches > 0" class="text-red-600 dark:text-red-400 font-black">
                    Showing {{ matchStats.upcomingMatches }} fixtures.
                  </span>
                  <span v-if="matchStats.lastUpdate" class="block mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Updated: {{ formatLastUpdate(matchStats.lastUpdate) }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Rate Limit Info -->
          <div v-if="footballApiKey" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-5 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
            <div class="flex items-start text-sm">
              <div class="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg mr-4 shrink-0">
                <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="font-black text-gray-800 dark:text-white mb-1 tracking-wide">API Status: Connected</p>
                <p class="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-medium">
                  Auto-refresh active (5 min interval) with smart rate limiting.
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

@keyframes glow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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

.animate-rise-up {
  animation: rise-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-glow {
  background-size: 200% 200%;
  animation: glow 4s ease infinite;
}

.animation-delay-200 { 
  animation-delay: 0.2s; 
  animation-fill-mode: both;
}

/* Enhanced scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #dc2626;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b91c1c;
}

/* Smooth transitions for dark mode */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>