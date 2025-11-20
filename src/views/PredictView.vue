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
  <!-- Force light mode background -->
  <div class="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
    
    <!-- Refined Light Background Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] bg-indigo-100/40 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <UserNavbar />

    <div class="relative z-10 container mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-fade-in-up">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-6 transform hover:scale-110 transition-transform duration-300">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Match Prediction
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Get AI-powered predictions for upcoming matches. Select from live fixtures or enter match details manually.
        </p>
      </div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left: Form Section -->
        <div class="xl:col-span-2 space-y-8">
          <!-- Match Form Card -->
          <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 animate-fade-in-up animation-delay-200">
            <div class="mb-8 border-b border-slate-100 pb-6">
              <h2 class="text-2xl font-bold text-slate-900 mb-2">Match Details</h2>
              <p class="text-slate-500 text-sm">Configure the parameters for the AI model.</p>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
              <!-- Team Selection -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-bold text-slate-700">
                    Home Team
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15l4-4l4 4"/>
                       </svg>
                    </div>
                    <input
                      v-model="home_team"
                      placeholder="e.g., Manchester United"
                      class="w-full pl-11 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 placeholder-slate-400 outline-none font-medium"
                      required
                    />
                  </div>
                </div>

                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-bold text-slate-700">
                    Away Team
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 9l-4 4l-4-4"/>
                       </svg>
                    </div>
                    <input
                      v-model="away_team"
                      placeholder="e.g., Liverpool"
                      class="w-full pl-11 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 placeholder-slate-400 outline-none font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Match Details -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-bold text-slate-700">
                    Match Date
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                       </svg>
                    </div>
                    <input
                      v-model="match_date"
                      type="date"
                      :min="new Date().toISOString().split('T')[0]"
                      class="w-full pl-11 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 placeholder-slate-400 outline-none font-medium"
                      required
                    />
                  </div>
                </div>

                <div class="space-y-2 group">
                  <label class="flex items-center text-sm font-bold text-slate-700">
                    League
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                       </svg>
                    </div>
                    <select
                      v-model="league"
                      class="w-full pl-11 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 outline-none appearance-none cursor-pointer font-medium"
                    >
                      <option value="premier_league">Premier League</option>
                      <option value="championship">Championship</option>
                      <option value="la_liga">La Liga</option>
                      <option value="serie_a">Serie A</option>
                      <option value="bundesliga">Bundesliga</option>
                      <option value="ligue_1">Ligue 1</option>
                    </select>
                    <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500">
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
                  class="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span v-if="loading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running AI Model...
                  </span>
                  <span v-else class="flex items-center text-lg">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Generate Prediction
                  </span>
                </button>

                <button 
                  type="button" 
                  class="sm:w-auto w-full px-8 py-4 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-xl transition-colors duration-200 hover:bg-slate-50 flex items-center justify-center"
                  @click="clearForm"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Clear
                </button>
              </div>
            </form>
          </div>

          <!-- Prediction Results -->
          <div v-if="prediction" class="transform transition-all duration-500 ease-in-out animate-fade-in-up">
            <PredictionPreview :prediction="prediction" />
          </div>
        </div>

        <!-- Right: Upcoming Matches -->
        <div class="space-y-6 animate-fade-in-up animation-delay-200">
          
          <!-- Upcoming Matches Component -->
          <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[300px]">
             <div class="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 class="font-bold text-slate-900 text-lg flex items-center">
                    <span class="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
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
          <div class="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm">
            <div class="flex items-start text-sm">
              <div class="p-2 bg-indigo-50 rounded-lg mr-4 shrink-0">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-slate-800 mb-1">Data Source</p>
                <p class="text-slate-500 leading-relaxed">
                  Match data provided by Football-Data.org API. 
                  <span v-if="matchStats.upcomingMatches > 0" class="text-indigo-600 font-medium">
                    Showing {{ matchStats.upcomingMatches }} fixtures.
                  </span>
                  <span v-if="matchStats.lastUpdate" class="block mt-1 text-xs text-slate-400">
                    Updated: {{ formatLastUpdate(matchStats.lastUpdate) }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Rate Limit Info -->
          <div v-if="footballApiKey" class="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
            <div class="flex items-start text-sm">
              <div class="p-2 bg-emerald-50 rounded-lg mr-4 shrink-0">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-slate-800 mb-1">API Status: Connected</p>
                <p class="text-slate-500 text-xs leading-relaxed">
                  Auto-refresh is active (5 min interval) to respect rate limits.
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
/* Animations */
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.animation-delay-200 { animation-delay: 0.1s; animation-fill-mode: both; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* Scrollbars */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>