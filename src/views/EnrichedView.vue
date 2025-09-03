<!-- src/views/EnrichedView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
     <UserNavbar />

    <div class="container mx-auto px-4 py-8 lg:py-12">
        <!-- Header Section -->
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Enriched Prediction
          </h1>
          <p class="text-lg text-gray-600">AI-Powered Model + LLM Analysis</p>
        </div>
        <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
          <!-- Left: Form Section -->
          <div class="xl:col-span-2 space-y-6">
            <!-- Main Form Card -->
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
              <form @submit.prevent="onSubmit" class="space-y-6">
                <!-- Team Inputs -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Home Team</label>
                    <input 
                      v-model="home_team" 
                      placeholder="Enter home team" 
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Away Team</label>
                    <input 
                      v-model="away_team" 
                      placeholder="Enter away team" 
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                </div>

                <!-- Date and League -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Match Date</label>
                    <input 
                      v-model="date" 
                      type="date" 
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">League</label>
                    <input 
                      v-model="league" 
                      placeholder="e.g. premier_league" 
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                </div>

                <!-- Options and Submit -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                  <div class="flex flex-wrap gap-4">
                    <label class="inline-flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="use_cache" 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span class="text-sm font-medium text-gray-700">Use cache</span>
                    </label>
                    <label class="inline-flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="force_refresh" 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span class="text-sm font-medium text-gray-700">Force refresh</span>
                    </label>
                  </div>
                  
                  <button 
                    type="submit"
                    :disabled="loading" 
                    class="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span class="flex items-center gap-2">
                      <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ loading ? 'Processing...' : 'Get Enriched Prediction' }}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Error Alert -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="text-sm text-red-700">{{ error }}</div>
              </div>
            </div>

            <!-- Results Section -->
            <div v-if="result" class="transform transition-all duration-500 ease-in-out">
              <!-- Prediction Chart -->
              <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
                <EnrichedPredictionPreview :prediction="result" />
              </div>

              <!-- Results Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- LLM Raw Output -->
                <!-- <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                  <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      LLM Raw Output
                    </h3>
                  </div>
                  <div class="p-6">
                    <pre class="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{{ result.llm_raw }}</pre>
                  </div>
                </div> -->

                <!-- LLM Parsed -->
                <!-- <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                  <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                      </svg>
                      LLM Parsed
                    </h3>
                  </div>
                  <div class="p-6">
                    <pre class="text-sm text-gray-700 leading-relaxed">{{ prettyJson(result.llm_parsed) }}</pre>
                  </div>
                </div> -->
              </div>

              <!-- Metadata -->
              <!-- <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Metadata
                  </h3>
                </div>
                <div class="p-6">
                  <pre class="text-sm text-gray-700 leading-relaxed">{{ prettyJson(result.model_meta || result.model?.model_meta || {}) }}</pre>
                </div>
              </div> -->

              <!-- Processing Stats -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                  <div class="flex items-center gap-2 text-blue-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-medium">Processing Time:</span>
                    <span class="font-semibold">{{ result.processing_time_ms }} ms</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                      <div :class="result.cached ? 'bg-green-500' : 'bg-yellow-500'" class="w-2 h-2 rounded-full"></div>
                      <span class="text-gray-700 font-medium">{{ result.cached ? 'Cached Result' : 'Fresh Prediction' }}</span>
                    </div>
                  </div>
                </div>
              </div>
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
import { ref, onMounted, computed  } from 'vue'
import { usePredictionStore } from '../store/prediction'
import EnrichedPredictionPreview from '../components/EnrichedPredictionPreview.vue'
import UpcomingMatches from '../components/UpcomingMatches.vue'
import {useToast} from 'vue-toast-notification';
import UserNavbar from '../components/UserNavbar.vue'
import Toast from '../components/Toast.vue'

const predictionStore = usePredictionStore()
const $toast = useToast()


const home_team = ref('')
const away_team = ref('')
const date = ref('')
const league = ref('premier_league')

const use_cache = ref(true)
const force_refresh = ref(false)
const loading = ref(false)
const error = ref(null)
const result = ref(null)
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
    date.value = new Date().toISOString().split('T')[0]
    
    // Check if we have a valid API key
    if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
      console.warn('No Football-Data.org API key configured')
      //$toast.warning('⚠️ Add your Football-Data.org API key to load live fixtures')
    }
  } catch (e) {
    console.error('Error in onMounted:', e)
  }
})

function prettyJson(obj) {
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return String(obj)
  }
}

async function onSubmit() {
  error.value = null
  result.value = null
  loading.value = true

  const payload = {
    match_id: undefined,
    home_team: home_team.value,
    away_team: away_team.value,
    date: date.value || undefined,
    league: league.value || undefined
  }

  try {
    const res = await predictionStore.predictEnriched({
      ...payload,
      use_cache: use_cache.value,
      force_refresh: force_refresh.value
    })
    // The backend returns the full PredictionResponse; store returns it unchanged
    result.value = res
    $toast.success('🎯 Prediction generated successfully!')
  } catch (err) {
    console.error('predictEnriched failed', err)
    if (err.response && err.response.data) {
      error.value = err.response.data.detail || JSON.stringify(err.response.data)
      $toast.error(`❌ Prediction failed: ${error.value}`)
    } else {
      error.value = err.message || String(err)
      $toast.error(`❌ Prediction failed: ${error.value}`)
    }
  } finally {
    loading.value = false
  }
}

function clearForm() {
  home_team.value = ''
  away_team.value = ''
  date.value = new Date().toISOString().split('T')[0]
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
          date.value = matchDate.toISOString().split('T')[0]
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
      date: date.value,
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
/* Enhanced pre styling */
pre { 
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
  border-radius: 8px; 
  overflow-x: auto; 
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
}

/* Custom scrollbar for pre elements */
pre::-webkit-scrollbar {
  height: 6px;
}

pre::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

pre::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>