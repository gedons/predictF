<!-- src/views/EnrichedView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-400/10 to-pink-400/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>

    <UserNavbar />

    <div class="relative container mx-auto px-4 py-8 lg:py-12">
      <!-- Enhanced Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-2xl shadow-purple-500/25 animate-pulse-glow">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          <span class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            Enriched Prediction
          </span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Advanced AI-powered match predictions enhanced with intelligent analysis
        </p>
      </div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left: Enhanced Form Section -->
        <div class="xl:col-span-2 space-y-8">
          <!-- Main Form Card -->
          <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 hover:shadow-3xl transition-all duration-500">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">Match Details</h2>
                <p class="text-sm text-gray-500">Enter the teams and match information</p>
              </div>
            </div>

            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Team Inputs with Enhanced Styling -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="group space-y-3">
                  <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                    Home Team
                  </label>
                  <div class="relative">
                    <input 
                      v-model="home_team" 
                      placeholder="Enter home team" 
                      class="w-full px-5 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-900 font-medium shadow-lg hover:shadow-xl group-hover:border-blue-300"
                    />
                    <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                <div class="group space-y-3">
                  <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <div class="w-4 h-4 bg-purple-500 rounded-full"></div>
                    Away Team
                  </label>
                  <div class="relative">
                    <input 
                      v-model="away_team" 
                      placeholder="Enter away team" 
                      class="w-full px-5 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 text-gray-900 font-medium shadow-lg hover:shadow-xl group-hover:border-purple-300"
                    />
                    <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              <!-- Date and League with Enhanced Styling -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="group space-y-3">
                  <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                    Match Date
                  </label>
                  <div class="relative">
                    <input 
                      v-model="date" 
                      type="date" 
                      class="w-full px-5 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-gray-900 font-medium shadow-lg hover:shadow-xl group-hover:border-green-300"
                    />
                  </div>
                </div>
                <div class="group space-y-3">
                  <label class="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <div class="w-4 h-4 bg-indigo-500 rounded-full"></div>
                    League
                  </label>
                  <div class="relative">
                    <input 
                      v-model="league" 
                      placeholder="e.g. premier_league" 
                      class="w-full px-5 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-900 font-medium shadow-lg hover:shadow-xl group-hover:border-indigo-300"
                    />
                  </div>
                </div>
              </div>

              <!-- Enhanced Options and Submit -->
              <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200/50">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div class="flex flex-wrap gap-6">
                    <label class="group inline-flex items-center gap-3 cursor-pointer">
                      <div class="relative">
                        <input 
                          type="checkbox" 
                          v-model="use_cache" 
                          class="sr-only"
                        />
                        <div class="w-6 h-6 bg-white border-2 border-gray-300 rounded-lg shadow-sm group-hover:border-blue-400 transition-all duration-200" :class="{ 'bg-blue-500 border-blue-500': use_cache }">
                          <svg v-if="use_cache" class="w-4 h-4 text-white absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <span class="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Use cache</span>
                    </label>
                    
                    <label class="group inline-flex items-center gap-3 cursor-pointer">
                      <div class="relative">
                        <input 
                          type="checkbox" 
                          v-model="force_refresh" 
                          class="sr-only"
                        />
                        <div class="w-6 h-6 bg-white border-2 border-gray-300 rounded-lg shadow-sm group-hover:border-purple-400 transition-all duration-200" :class="{ 'bg-purple-500 border-purple-500': force_refresh }">
                          <svg v-if="force_refresh" class="w-4 h-4 text-white absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <span class="text-sm font-semibold text-gray-700 group-hover:text-purple-700 transition-colors">Force refresh</span>
                    </label>
                  </div>
                  
                  <div class="flex gap-3">
                    <button 
                      type="button"
                      @click="clearForm"
                      class="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Clear
                    </button>
                    
                    <button 
                      type="submit"
                      :disabled="loading || !home_team || !away_team" 
                      class="group relative px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                    >
                      <!-- Animated background -->
                      <div class="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <span class="relative flex items-center gap-3">
                        <div v-if="loading" class="relative">
                          <div class="w-5 h-5 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
                        </div>
                        <svg v-else class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        {{ loading ? 'Analyzing Match...' : 'Generate Prediction' }}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Enhanced Error Alert -->
          <div v-if="error" class="bg-white/90 backdrop-blur-xl border border-red-200 rounded-2xl p-6 shadow-xl">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-red-900 mb-2">Prediction Failed</h3>
                <p class="text-red-700 leading-relaxed">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Enhanced Results Section -->
          <div v-if="result" class="transform transition-all duration-500 ease-in-out animate-fade-in">
            <!-- Prediction Chart with Modern Styling -->
            <div class="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 mb-8 hover:shadow-3xl transition-all duration-500">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900">Prediction Results</h3>
                  <p class="text-sm text-gray-500">AI analysis and probability breakdown</p>
                </div>
              </div>
              
              <EnrichedPredictionPreview :prediction="result" />
            </div>

            <!-- Processing Stats Card -->
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/50 rounded-2xl p-6 shadow-lg">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <!-- Processing Time -->
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-600">Processing Time</p>
                    <p class="text-lg font-bold text-blue-700">{{ result.processing_time_ms }}ms</p>
                  </div>
                </div>

                <!-- Cache Status -->
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <div :class="result.cached ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'" class="w-3 h-3 rounded-full shadow-lg"></div>
                    <span class="text-sm font-bold" :class="result.cached ? 'text-emerald-700' : 'text-amber-700'">
                      {{ result.cached ? 'Cached Result' : 'Fresh Analysis' }}
                    </span>
                  </div>
                </div>

                <!-- Performance Badge -->
                <div class="flex items-center">
                  <span class="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold shadow-lg" 
                        :class="result.processing_time_ms < 1000 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                               result.processing_time_ms < 3000 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 
                               'bg-red-100 text-red-800 border border-red-200'">
                    {{ result.processing_time_ms < 1000 ? '⚡ Fast' : 
                       result.processing_time_ms < 3000 ? '🔶 Normal' : '🐌 Slow' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Enhanced Sidebar -->
        <div class="space-y-8">
          <!-- Live Matches Card -->
          <div class="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
            <div class="px-6 py-5 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2a2 2 0 002 2m0 0V9a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold">Live Fixtures</h3>
                    <p class="text-blue-200 text-xs">Click any match to auto-fill</p>
                  </div>
                </div>
                
                <!-- API Status Indicator -->
                <div class="flex items-center gap-2">
                  <div :class="apiStatusDot" class="w-3 h-3 rounded-full shadow-lg"></div>
                  <span class="text-xs font-medium text-blue-200">{{ apiStatusText }}</span>
                </div>
              </div>
            </div>

            <div class="p-6">
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

          <!-- Enhanced Data Source Info -->
          <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50 shadow-lg">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-bold text-blue-900 mb-3">Live EPL Data</h4>
                <div class="space-y-2 text-sm text-blue-800">
                  <p><span class="font-semibold">Source:</span> Football-Data.org API</p>
                  <p v-if="matchStats.upcomingMatches > 0">
                    <span class="font-semibold">Fixtures:</span> {{ matchStats.upcomingMatches }} upcoming matches
                  </p>
                  <p v-if="matchStats.lastUpdate" class="text-blue-600">
                    <span class="font-semibold">Updated:</span> {{ formatLastUpdate(matchStats.lastUpdate) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced API Status Card -->
          <div v-if="footballApiKey" class="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/50 shadow-lg">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-bold text-emerald-900 mb-3">API Status</h4>
                <div class="space-y-2 text-sm text-emerald-800">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span class="font-semibold">Connected & Active</span>
                  </div>
                  <p class="text-emerald-600">Auto-refresh every 5 minutes to stay within rate limits</p>
                  <p class="text-emerald-600">Smart caching reduces API calls</p>
                </div>
              </div>
            </div>
          </div>

          <!-- No API Key Warning -->
          <div v-else class="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl p-6 border border-amber-200/50 shadow-lg">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-bold text-amber-900 mb-2">API Key Required</h4>
                <p class="text-sm text-amber-800 mb-3">Add your Football-Data.org API key to load live fixtures</p>
                <a 
                  href="https://www.football-data.org/client/register" 
                  target="_blank"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  Get Free API Key
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
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

// Enhanced match statistics
const matchStats = ref({
  totalMatches: 0,
  upcomingMatches: 0,
  lastUpdate: null
})

// API status management
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
    return 'bg-red-500 animate-pulse'
  }
  if (matchStats.value.upcomingMatches > 0) {
    return 'bg-emerald-500 animate-pulse'
  }
  return 'bg-amber-500 animate-pulse'
})

const apiStatusText = computed(() => {
  if (!footballApiKey.value || footballApiKey.value === import.meta.env.VITE_FOOTBALL_API_KEY || '') {
    return 'Disconnected'
  }
  if (apiError.value) {
    return 'Error'
  }
  if (matchStats.value.upcomingMatches > 0) {
    return 'Live'
  }
  return 'Connecting'
})

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
  result.value = null
  error.value = null
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
    
    // Clear any existing prediction and errors
    prediction.value = null
    result.value = null
    error.value = null
    
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
/* Enhanced terminal-style pre */
pre { 
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
  border-radius: 12px; 
  overflow-x: auto; 
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.6;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Enhanced scrollbar styling */
pre::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

pre::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

pre::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
}

/* Enhanced transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom animations */
@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
    transform: scale(1.05);
  }
}

@keyframes fade-in {
  from { 
    opacity: 0; 
    transform: translateY(20px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Enhanced focus states */
input:focus, button:focus {
  outline: none;
  transform: translateY(-1px);
}

/* Hover effects for cards */
.hover\:shadow-3xl:hover {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Form input enhancements */
input {
  font-variant-numeric: tabular-nums;
}

/* Button ripple effect */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.group:active::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  animation: ripple 0.6s linear;
}

/* Status indicator animations */
@keyframes status-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-status-pulse {
  animation: status-pulse 2s ease-in-out infinite;
}

/* Responsive enhancements */
@media (max-width: 640px) {
  .text-5xl {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .rounded-3xl {
    border-radius: 1.5rem;
  }
}

/* Glass morphism enhancement */
.backdrop-blur-xl {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

/* Custom checkbox styling enhancement */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
}

/* Loading spinner enhancement */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Form validation states */
.input-valid {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.input-invalid {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Button loading state */
button:disabled {
  transform: none !important;
  cursor: not-allowed;
}

/* Enhanced card hover states */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
  transform: rotate(3deg);
}

/* Micro-interactions */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

/* Status indicators */
.status-indicator {
  position: relative;
}

.status-indicator::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: currentColor;
  border-radius: 50%;
  animation: status-pulse 2s ease-in-out infinite;
}

/* Enhanced shadow layers */
.shadow-3xl {
  box-shadow: 
    0 35px 60px -12px rgba(0, 0, 0, 0.15),
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
}

/* Gradient border animation */
@keyframes gradient-border {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-border {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
  background-size: 300% 300%;
  animation: gradient-border 3s ease infinite;
}
</style>