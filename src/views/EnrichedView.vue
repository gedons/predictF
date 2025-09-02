<!-- src/views/EnrichedView.vue -->
<template>
  <UserNavbar />
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Enriched Prediction
        </h1>
        <p class="text-lg text-gray-600">AI-Powered Model + LLM Analysis</p>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
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
      <div v-if="result" class="space-y-6">
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
  </div>2
</template>

<script setup>
import { ref } from 'vue'
import { usePredictionStore } from '../store/prediction'
import EnrichedPredictionPreview from '../components/EnrichedPredictionPreview.vue'
import {useToast} from 'vue-toast-notification';
import UserNavbar from '../components/UserNavbar.vue'

const predictionStore = usePredictionStore()

const home_team = ref('')
const away_team = ref('')
const date = ref('')
const league = ref('premier_league')

const use_cache = ref(true)
const force_refresh = ref(false)
const loading = ref(false)
const error = ref(null)
const result = ref(null)

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
  } catch (err) {
    console.error('predictEnriched failed', err)
    if (err.response && err.response.data) {
      error.value = err.response.data.detail || JSON.stringify(err.response.data)
    } else {
      error.value = err.message || String(err)
    }
  } finally {
    loading.value = false
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