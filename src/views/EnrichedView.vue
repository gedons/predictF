<!-- src/views/EnrichedView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 right-1/3 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
    </div>

    <UserNavbar />

    <div class="relative z-10 container mx-auto px-4 py-8 lg:py-12">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl mb-8 shadow-2xl transform hover:scale-110 transition-all duration-300">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
        </div>
        <h1 class="text-6xl font-black text-white mb-6 bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight">
          Enriched Predictions
        </h1>
        <p class="text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
          Harness the power of AI with our advanced machine learning models combined with expert LLM analysis
        </p>
      </div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left: Form Section -->
        <div class="xl:col-span-2 space-y-8 animate-slide-up">
          <!-- Main Form Card -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div class="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 hover:border-white/30 transition-all duration-500">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-white mb-2 flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                  Create Prediction
                </h2>
                <p class="text-slate-300 text-sm">Enter match details for AI-powered analysis</p>
              </div>

              <form @submit.prevent="onSubmit" class="space-y-6">
                <!-- Team Inputs -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-white/90 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                      </svg>
                      Home Team
                    </label>
                    <div class="relative group/input">
                      <input 
                        v-model="home_team" 
                        placeholder="Enter home team" 
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 group-hover:bg-white/15"
                      />
                      <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-white/90 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                      </svg>
                      Away Team
                    </label>
                    <div class="relative group/input">
                      <input 
                        v-model="away_team" 
                        placeholder="Enter away team" 
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 group-hover:bg-white/15"
                      />
                      <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400/10 to-purple-400/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <!-- Date and League -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-white/90 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Match Date
                    </label>
                    <div class="relative group/input">
                      <input 
                        v-model="date" 
                        type="date" 
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 group-hover:bg-white/15"
                      />
                      <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-white/90 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      League
                    </label>
                    <div class="relative group/input">
                      <input 
                        v-model="league" 
                        placeholder="e.g. premier_league" 
                        class="w-full px-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 group-hover:bg-white/15"
                      />
                      <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <!-- Options and Submit -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-white/10">
                  <div class="flex flex-wrap gap-6">
                    <label class="inline-flex items-center gap-3 cursor-pointer group/checkbox">
                      <div class="relative">
                        <input 
                          type="checkbox" 
                          v-model="use_cache" 
                          class="sr-only"
                        />
                        <div class="w-5 h-5 bg-white/10 border-2 border-white/30 rounded-md transition-all duration-200 group-hover/checkbox:border-white/50"
                             :class="use_cache ? 'bg-blue-500 border-blue-500' : ''">
                          <svg v-if="use_cache" class="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                      </div>
                      <span class="text-sm font-medium text-white/90 group-hover/checkbox:text-white transition-colors">Use cache</span>
                    </label>
                    <label class="inline-flex items-center gap-3 cursor-pointer group/checkbox">
                      <div class="relative">
                        <input 
                          type="checkbox" 
                          v-model="force_refresh" 
                          class="sr-only"
                        />
                        <div class="w-5 h-5 bg-white/10 border-2 border-white/30 rounded-md transition-all duration-200 group-hover/checkbox:border-white/50"
                             :class="force_refresh ? 'bg-purple-500 border-purple-500' : ''">
                          <svg v-if="force_refresh" class="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                      </div>
                      <span class="text-sm font-medium text-white/90 group-hover/checkbox:text-white transition-colors">Force refresh</span>
                    </label>
                  </div>
                  
                  <button 
                    type="submit"
                    :disabled="loading" 
                    class="group/button relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/button:opacity-20 transition-opacity duration-300"></div>
                    <span class="relative flex items-center gap-3">
                      <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5 group-hover/button:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      {{ loading ? 'Processing Magic...' : 'Generate Prediction' }}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Error Alert -->
          <div v-if="error" class="group relative animate-slide-up">
            <div class="absolute inset-0 bg-red-500/20 rounded-2xl blur-lg"></div>
            <div class="relative backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-2xl p-6 shadow-xl">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-white font-semibold mb-1">Prediction Error</h3>
                  <p class="text-red-200 text-sm leading-relaxed">{{ error }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Section -->
          <div v-if="result" class="transform transition-all duration-700 ease-in-out animate-slide-up">
            <!-- Prediction Chart -->
            <div class="group relative mb-8">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
              <div class="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:border-white/30 transition-all duration-500">
                <EnrichedPredictionPreview :prediction="result" />
              </div>
            </div>

            <!-- Processing Stats -->
            <div class="group relative">
              <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl blur-lg opacity-50"></div>
              <div class="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                  <div class="flex items-center gap-3 text-white">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <span class="font-semibold text-white/90">Processing Time:</span>
                      <span class="font-bold text-cyan-300 ml-2">{{ result.processing_time_ms }} ms</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2">
                      <div :class="result.cached ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'" class="w-3 h-3 rounded-full shadow-lg"></div>
                      <span class="text-white/90 font-semibold">{{ result.cached ? 'Cached Result' : 'Fresh Prediction' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Upcoming Matches -->
        <div class="space-y-8 animate-slide-up delay-200">
          <!-- Upcoming Matches Component -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div class="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-500">
              <div class="p-6 border-b border-white/10">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2m0 0a2 2 0 012-2h6a2 2 0 012 2M7 7V3a2 2 0 012-2h6a2 2 0 012 2v4M5 11a2 2 0 00-2 2v6a2 2 0 002 2"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-white">Live Fixtures</h3>
                      <p class="text-sm text-slate-300">Premier League matches</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div :class="apiStatusDot" class="w-3 h-3 rounded-full shadow-lg"></div>
                    <span class="text-sm font-medium text-white/80">{{ apiStatusText }}</span>
                  </div>
                </div>
              </div>
              <div class="relative">
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
          </div>

          <!-- Data Source Info -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-lg opacity-50"></div>
            <div class="relative backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
              <div class="flex items-start gap-4 text-sm">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="text-white/90">
                  <p class="font-semibold mb-2">Live EPL Data</p>
                  <p class="text-xs text-slate-300 leading-relaxed">
                    Match data provided by Football-Data.org API. 
                    <span v-if="matchStats.upcomingMatches > 0" class="block mt-1">
                      Currently showing <span class="font-semibold text-blue-300">{{ matchStats.upcomingMatches }}</span> upcoming fixtures.
                    </span>
                    <span v-if="matchStats.lastUpdate" class="block mt-1">
                      Last updated: <span class="font-semibold text-green-300">{{ formatLastUpdate(matchStats.lastUpdate) }}</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- API Status -->
          <div v-if="footballApiKey" class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl blur-lg opacity-50"></div>
            <div class="relative backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
              <div class="flex items-start gap-4 text-sm">
                <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="text-white/90">
                  <p class="font-semibold mb-2 text-emerald-300">API Connected</p>
                  <p class="text-xs text-slate-300 leading-relaxed">
                    Auto-refresh every 5 minutes to stay within API limits.
                    <span class="block mt-1">Real-time fixture updates enabled.</span>
                  </p>
                </div>
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