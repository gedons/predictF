<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePredictionStore } from '../store/prediction'
import EnrichedPredictionPreview from '../components/EnrichedPredictionPreview.vue'
import UpcomingMatches from '../components/UpcomingMatches.vue'
import { useToast } from 'vue-toast-notification'
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

const footballApiKey = ref(import.meta.env.VITE_FOOTBALL_API_KEY || '') 

// Enhanced match statistics
const matchStats = ref({
  totalMatches: 0,
  upcomingMatches: 0,
  lastUpdate: null
})

// API status management
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
    date.value = new Date().toISOString().split('T')[0]
    
    // Check if we have a valid API key
    if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
      console.warn('No Football-Data.org API key configured')
    }
  } catch (e) {
    console.error('Error in onMounted:', e)
  }
})

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
    result.value = res
    $toast.success('✨ AI Analysis complete!')
  } catch (err) {
    console.error('predictEnriched failed', err)
    if (err.response && err.response.data) {
      error.value = err.response.data.detail || JSON.stringify(err.response.data)
      $toast.error(`❌ Analysis failed: ${error.value}`)
    } else {
      error.value = err.message || String(err)
      $toast.error(`❌ Analysis failed: ${error.value}`)
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
  result.value = null
  error.value = null
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
          date.value = matchDate.toISOString().split('T')[0]
        }
      } catch (e) {
        console.warn('Error parsing match date:', e)
      }
    }
    
    league.value = 'premier_league'
    result.value = null
    error.value = null
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
    $toast.warning('⚠️ No upcoming fixtures found')
  } else if (data.upcoming > 0) {
    $toast.success(`✅ Loaded ${data.upcoming} upcoming EPL fixtures`)
  }
}

function onMatchesError(error) {
  apiError.value = error.message || 'Unknown error'
  console.error('Matches API error:', error)
  
  if (error.message?.includes('Invalid API key')) {
    $toast.error('🔑 Invalid API key')
  } else if (error.message?.includes('rate limit')) {
    $toast.error('⏱️ API rate limit exceeded')
  } else {
    $toast.error(`❌ Error loading fixtures: ${error.message}`)
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 relative overflow-hidden font-sans transition-colors duration-300">
    
    <!-- AI-Themed Background Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-fuchsia-100/40 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-[30%] -left-[10%] w-[60%] h-[60%] bg-indigo-100/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <UserNavbar />

    <div class="relative z-10 container mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-fade-in-up">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600 rounded-3xl shadow-xl shadow-purple-200 mb-6 transform hover:scale-110 transition-transform duration-300 animate-pulse-glow">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Enriched <span class="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-indigo-600 animate-gradient">Prediction</span>
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Harness advanced AI models with intelligent data enrichment for deep match insights and higher accuracy.
        </p>
      </div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left: Form Section -->
        <div class="xl:col-span-2 space-y-8">
          <!-- Main Form Card -->
          <div class="bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-white/50 p-6 sm:p-8 animate-fade-in-up animation-delay-200">
            <div class="mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 mb-1">Analysis Parameters</h2>
                <p class="text-slate-500 text-sm">Configure teams and AI settings.</p>
              </div>
              <div class="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-semibold text-indigo-700">AI Ready</span>
              </div>
            </div>

            <form @submit.prevent="onSubmit" class="space-y-8">
              <!-- Team Inputs -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="group space-y-2">
                  <label class="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span class="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
                    Home Team
                  </label>
                  <div class="relative transition-all duration-200 transform group-hover:-translate-y-1">
                    <input 
                      v-model="home_team" 
                      placeholder="Home Team" 
                      class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all duration-300 placeholder-slate-400 text-slate-900 font-semibold shadow-sm group-hover:shadow-md outline-none"
                      required
                    />
                  </div>
                </div>
                <div class="group space-y-2">
                  <label class="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Away Team
                  </label>
                  <div class="relative transition-all duration-200 transform group-hover:-translate-y-1">
                    <input 
                      v-model="away_team" 
                      placeholder="Away Team" 
                      class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder-slate-400 text-slate-900 font-semibold shadow-sm group-hover:shadow-md outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Date and League -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="group space-y-2">
                  <label class="flex items-center gap-2 text-sm font-bold text-slate-700">
                    Match Date
                  </label>
                  <input 
                    v-model="date" 
                    type="date" 
                    class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-slate-900 font-medium shadow-sm outline-none"
                    required
                  />
                </div>
                <div class="group space-y-2">
                  <label class="flex items-center gap-2 text-sm font-bold text-slate-700">
                    League
                  </label>
                  <div class="relative">
                      <select
                        v-model="league"
                        class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-slate-900 font-medium shadow-sm outline-none appearance-none cursor-pointer"
                      >
                        <option value="premier_league">Premier League</option>
                        <option value="championship">Championship</option>
                        <option value="la_liga">La Liga</option>
                        <option value="serie_a">Serie A</option>
                        <option value="bundesliga">Bundesliga</option>
                        <option value="ligue_1">Ligue 1</option>
                      </select>
                      <div class="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                  </div>
                </div>
              </div>

              <!-- Advanced Options -->
              <div class="bg-gradient-to-r from-slate-50 to-indigo-50/50 rounded-2xl p-5 border border-slate-200/60">
                <div class="flex flex-col sm:flex-row gap-4 mb-6">
                   <!-- Toggle 1 -->
                   <label class="relative flex-1 flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
                          :class="use_cache ? 'bg-white border-indigo-500 shadow-md' : 'bg-slate-50 border-slate-200 hover:border-slate-300'">
                      <input type="checkbox" v-model="use_cache" class="sr-only" />
                      <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-colors"
                           :class="use_cache ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </div>
                      <div>
                         <span class="block text-sm font-bold" :class="use_cache ? 'text-indigo-900' : 'text-slate-600'">Smart Cache</span>
                         <span class="block text-xs text-slate-500">Faster results</span>
                      </div>
                      <div class="absolute top-4 right-4 w-3 h-3 rounded-full border-2 border-white"
                           :class="use_cache ? 'bg-indigo-500' : 'bg-slate-300'"></div>
                   </label>

                   <!-- Toggle 2 -->
                   <label class="relative flex-1 flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
                          :class="force_refresh ? 'bg-white border-fuchsia-500 shadow-md' : 'bg-slate-50 border-slate-200 hover:border-slate-300'">
                      <input type="checkbox" v-model="force_refresh" class="sr-only" />
                      <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-colors"
                           :class="force_refresh ? 'bg-fuchsia-100 text-fuchsia-600' : 'bg-slate-200 text-slate-400'">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      </div>
                      <div>
                         <span class="block text-sm font-bold" :class="force_refresh ? 'text-fuchsia-900' : 'text-slate-600'">Deep Refresh</span>
                         <span class="block text-xs text-slate-500">Ignore existing data</span>
                      </div>
                      <div class="absolute top-4 right-4 w-3 h-3 rounded-full border-2 border-white"
                           :class="force_refresh ? 'bg-fuchsia-500' : 'bg-slate-300'"></div>
                   </label>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button"
                      @click="clearForm"
                      class="px-6 py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      Clear
                    </button>
                    
                    <button 
                      type="submit"
                      :disabled="loading || !home_team || !away_team" 
                      class="flex-1 group relative px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                    >
                      <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <span class="relative flex items-center justify-center gap-3 text-lg">
                        <div v-if="loading" class="w-6 h-6 border-3 border-white/30 rounded-full animate-spin border-t-white"></div>
                        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                        {{ loading ? 'Running AI Analysis...' : 'Generate Enriched Prediction' }}
                      </span>
                    </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Enhanced Results Section -->
          <div v-if="result" class="space-y-8 animate-fade-in">
            
            <!-- Main Prediction Card -->
            <div class="bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-3xl shadow-2xl p-1 sm:p-2 hover:shadow-3xl transition-all duration-500">
              <EnrichedPredictionPreview :prediction="result" />
            </div>

            <!-- Stats Dashboard -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <!-- Time Card -->
               <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500 font-bold uppercase">Processing Time</p>
                    <p class="text-lg font-extrabold text-slate-800">{{ result.processing_time_ms }}<span class="text-xs font-normal text-slate-400 ml-1">ms</span></p>
                  </div>
               </div>

               <!-- Cache Card -->
               <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="result.cached ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500 font-bold uppercase">Source</p>
                    <p class="text-lg font-extrabold text-slate-800">{{ result.cached ? 'Cache Hit' : 'Fresh Computation' }}</p>
                  </div>
               </div>
            </div>
          </div>

          <!-- Error Alert -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg animate-shake">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-red-900">Analysis Failed</h3>
                <p class="text-red-700 mt-1">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Enhanced Sidebar -->
        <div class="space-y-6 animate-fade-in-up animation-delay-200">
          
          <!-- Upcoming Matches Component -->
          <div class="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden min-h-[300px]">
             <div class="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/30">
                <h3 class="font-bold text-slate-900 text-lg flex items-center">
                    <span class="relative flex h-3 w-3 mr-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                    Live Fixtures
                </h3>
             </div>
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
          <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div class="flex items-start text-sm">
              <div class="p-2 bg-indigo-50 rounded-lg mr-4 shrink-0">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="font-bold text-slate-800 mb-1">Live Data Stream</p>
                <p class="text-slate-500 leading-relaxed">
                  Real-time match data via Football-Data.org.
                  <span v-if="matchStats.upcomingMatches > 0" class="text-indigo-600 font-medium">
                    {{ matchStats.upcomingMatches }} matches available.
                  </span>
                </p>
                <p v-if="matchStats.lastUpdate" class="text-xs text-slate-400 mt-2">
                  Synced: {{ formatLastUpdate(matchStats.lastUpdate) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Rate Limit Info -->
          <div v-if="footballApiKey" class="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
            <div class="flex items-start text-sm">
              <div class="p-2 bg-emerald-50 rounded-lg mr-4 shrink-0">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="font-bold text-slate-800 mb-1">System Status</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <p class="text-emerald-700 font-medium">Connected</p>
                </div>
                <p class="text-slate-500 text-xs mt-1">Smart throttling enabled</p>
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
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); transform: scale(1); }
  50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.4); transform: scale(1.05); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-blob {
  animation: blob 10s infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-pulse-glow {
  animation: pulse-glow 3s infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}

.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

.animation-delay-200 { animation-delay: 0.1s; animation-fill-mode: both; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

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