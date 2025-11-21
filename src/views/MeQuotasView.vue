<template>
  <UserNavbar/>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-700">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-400/10 to-amber-400/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32 animate-float-slow"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-400/10 to-emerald-400/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32 animate-float-medium"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-rise-up">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl mb-6 shadow-glow transform hover:scale-110 hover:rotate-12 transition-all duration-500">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <h1 class="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
          <span class="bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent animate-glow">
            Usage Quotas
          </span>
        </h1>
        <p class="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium tracking-wide">
          Monitor your neural network API usage with real-time analytics and intelligent insights
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700 rounded-3xl shadow-soft-xl p-12 max-w-md mx-auto">
        <div class="flex flex-col items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-red-200 dark:border-red-800 rounded-full animate-spin border-t-red-600"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-red-400"></div>
          </div>
          <div class="text-center">
            <p class="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-wide">Loading Quotas</p>
            <p class="text-gray-500 dark:text-gray-400 font-medium">Fetching neural network usage data...</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-red-200 dark:border-red-800/50 rounded-2xl p-6 mb-8 max-w-2xl mx-auto animate-shake">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-black text-red-900 dark:text-red-100 mb-1 tracking-wide">Unable to Load Quotas</h3>
            <p class="text-red-700 dark:text-red-300 leading-relaxed font-medium">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Quotas Content -->
      <div v-if="quotas && !loading" class="space-y-8">
        <!-- Summary Stats -->
        <div v-if="processedQuotas.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700 rounded-2xl p-6 shadow-soft-xl hover:shadow-fire transition-all duration-500 group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-2xl font-black text-gray-900 dark:text-white">{{ healthyQuotasCount }}</p>
                <p class="font-semibold text-sm text-gray-500 dark:text-gray-400 tracking-wide">Healthy Quotas</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700 rounded-2xl p-6 shadow-soft-xl hover:shadow-fire transition-all duration-500 group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-2xl font-black text-gray-900 dark:text-white">{{ attentionNeededCount }}</p>
                <p class="font-semibold text-sm text-gray-500 dark:text-gray-400 tracking-wide">Need Attention</p>
              </div>
            </div>
          </div>  

          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700 rounded-2xl p-6 shadow-soft-xl hover:shadow-fire transition-all duration-500 group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-2xl font-black text-gray-900 dark:text-white">{{ processedQuotas.length }}</p>
                <p class="font-semibold text-sm text-gray-500 dark:text-gray-400 tracking-wide">Total Endpoints</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quota Cards Grid -->
        <div v-if="processedQuotas.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="quota in processedQuotas" 
            :key="quota.name"
            class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700 rounded-2xl shadow-soft-xl hover:shadow-fire hover:scale-[1.02] transition-all duration-500 overflow-hidden"
          >
            <!-- Card Header -->
            <div class="p-6 pb-4">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" :class="quota.iconBg">
                    <component :is="quota.icon" class="w-6 h-6" :class="quota.iconColor" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg font-black text-gray-900 dark:text-white truncate mb-1 tracking-tight">{{ quota.displayName }}</h3>
                    <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="font-semibold tracking-wide">{{ quota.period }}</span>
                    </div>
                  </div>
                </div>
                <span class="font-semibold inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black shadow-sm tracking-wide" :class="quota.statusBadge">
                  {{ quota.status }}
                </span>
              </div>

              <!-- Usage Statistics -->
              <div class="space-y-4">
                <!-- Primary Usage Display -->
                <div class="text-center py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div class="text-3xl font-black mb-1" :class="quota.textColor">
                    <span v-if="quota.unlimited" class="text-red-600 dark:text-red-400">∞</span>
                    <span v-else>{{ quota.used.toLocaleString() }}</span>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 font-bold tracking-wide">
                    <span v-if="quota.unlimited">Unlimited Usage</span>
                    <span v-else>of {{ quota.limit.toLocaleString() }} used</span>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="space-y-3">
                  <div v-if="!quota.unlimited" class="relative">
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                      <div 
                        class="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                        :class="quota.progressColor"
                        :style="{ width: `${Math.max(quota.percentage, 2)}%` }"
                      >
                        <!-- Shimmer effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="relative">
                    <div class="w-full bg-red-100 dark:bg-red-900/30 rounded-full h-3 overflow-hidden">
                      <div class="h-3 rounded-full bg-gradient-to-r from-red-500 to-amber-500 w-full relative">
                        <!-- Infinite animation -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Usage Details -->
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full" :class="quota.progressColor.replace('bg-', 'bg-').replace('-500', '-400')"></div>
                      <span class="text-sm font-black text-gray-700 dark:text-gray-300 tracking-wide">
                        <span v-if="quota.unlimited">Unlimited</span>
                        <span v-else>{{ quota.percentage }}% used</span>
                      </span>
                    </div>
                    <div class="text-sm font-black tracking-wide" :class="quota.remainingColor">
                      <span v-if="quota.unlimited">No limits</span>
                      <span v-else>{{ quota.remaining.toLocaleString() }} left</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 border-t border-gray-200/50 dark:border-gray-600/50">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span class="font-bold tracking-wide">Updated {{ quota.lastUpdated }}</span>
                </div>
                <div class="w-2 h-2 rounded-full animate-pulse" :class="quota.progressColor.replace('bg-', 'bg-').replace('-500', '-400')"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Raw Data Card (if no processed quotas) -->
        <div v-if="processedQuotas.length === 0 && quotas" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700 rounded-3xl shadow-soft-xl overflow-hidden max-w-4xl mx-auto">
          <div class="px-8 py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <h3 class="text-xl font-black flex items-center gap-3 tracking-tight">
              <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              Raw Quota Data
            </h3>
            <p class="text-gray-300 mt-1 font-medium tracking-wide">Detailed neural network API response information</p>
          </div>
          <div class="p-8">
            <div class="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 overflow-hidden">
              <pre class="text-sm text-emerald-400 leading-relaxed font-mono overflow-x-auto tracking-wide">{{ prettyJson(quotas) }}</pre>
            </div>
          </div>
        </div>

        <!-- Action Section -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button 
            @click="load" 
            :disabled="loading"
            class="group relative px-8 py-4 bg-gradient-to-br from-red-600 to-amber-600 text-white font-black rounded-2xl shadow-fire transform hover:scale-[1.02] transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden tracking-wide"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-red-700 to-amber-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span class="font-semibold relative flex items-center gap-3">
              <svg 
                class="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" 
                :class="{ 'animate-spin': loading }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ loading ? 'Refreshing...' : 'Refresh Quotas' }}
            </span>
          </button>

          <div class="text-center sm:text-left">
            <p class="text-sm text-gray-600 dark:text-gray-400 font-bold tracking-wide">
              Auto-refresh every 
              <span class="font-black text-red-600 dark:text-red-400">5 minutes</span>
            </p>
          </div>
        </div>

        <!-- Enhanced Info Card -->
        <div class="bg-gradient-to-br from-red-50/50 via-amber-50/50 to-emerald-50/50 dark:from-red-900/10 dark:via-amber-900/10 dark:to-emerald-900/10 border border-red-200/50 dark:border-red-800/30 rounded-2xl p-6 shadow-soft-xl max-w-4xl mx-auto">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-black text-red-900 dark:text-red-100 mb-2 tracking-tight">Usage Guidelines</h4>
              <div class="text-sm text-red-800 dark:text-red-200 space-y-2 font-medium tracking-wide">
                <p><span class="font-black">Reset Schedule:</span> Quotas automatically reset at the beginning of each neural network cycle.</p>
                <p><span class="font-black">Monitoring:</span> Track your neural network usage to avoid service interruptions and optimize API consumption.</p>
                <p><span class="font-black">Optimization:</span> Implement intelligent rate limiting and caching for maximum neural efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import api from '../services/api'
import UserNavbar from '../components/UserNavbar.vue'

const quotas = ref(null)
const loading = ref(true)
const error = ref(null)

// Enhanced Icons with better styling
const ApiIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`
}

const DataIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path></svg>`
}

const DefaultIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
}

function prettyJson(obj) {
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return String(obj)
  }
}

// Enhanced quota processing with better styling logic
const processedQuotas = computed(() => {
  if (!quotas.value?.quotas || !Array.isArray(quotas.value.quotas)) return []
  
  return quotas.value.quotas.map(quota => {
    const limit = quota.quota_limit
    const remaining = quota.remaining
    const used = limit - remaining
    const percentage = quota.unlimited ? 0 : Math.min((used / limit) * 100, 100)
    
    // Determine quota type and styling based on endpoint
    const endpoint = quota.endpoint.toLowerCase()
    const isEnriched = endpoint.includes('enriched')
    const isMatch = endpoint.includes('match')
    const isPrediction = endpoint.includes('predict')
    
    // Enhanced display name formatting
    const displayName = quota.endpoint
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/Api/g, 'API')
      .replace(/Ai/g, 'AI')
    
    // Better icon selection
    let icon = DefaultIcon
    if (isEnriched || endpoint.includes('api')) icon = ApiIcon
    else if (isMatch || isPrediction || endpoint.includes('data')) icon = DataIcon
    
    // Enhanced color coding with modern gradients
    const getStatusColors = () => {
      if (quota.unlimited) {
        return {
          iconBg: 'bg-gradient-to-br from-red-400 to-amber-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-red-500 to-amber-500',
          textColor: 'text-red-600 dark:text-red-400',
          remainingColor: 'text-red-600 dark:text-red-400',
          status: 'Unlimited',
          statusBadge: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
        }
      }
      
      if (percentage > 90) {
        return {
          iconBg: 'bg-gradient-to-br from-red-400 to-red-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-red-500 to-red-600',
          textColor: 'text-red-600 dark:text-red-400',
          remainingColor: 'text-red-600 dark:text-red-400',
          status: 'Critical',
          statusBadge: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
        }
      } else if (percentage > 75) {
        return {
          iconBg: 'bg-gradient-to-br from-amber-400 to-amber-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-amber-500 to-amber-600',
          textColor: 'text-amber-600 dark:text-amber-400',
          remainingColor: 'text-amber-600 dark:text-amber-400',
          status: 'Warning',
          statusBadge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
        }
      } else {
        return {
          iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          remainingColor: 'text-gray-600 dark:text-gray-400',
          status: 'Healthy',
          statusBadge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
        }
      }
    }
    
    const colors = getStatusColors()
    
    return {
      name: quota.endpoint,
      displayName,
      used,
      limit,
      remaining,
      unlimited: quota.unlimited,
      percentage: quota.unlimited ? 0 : Math.round(percentage * 10) / 10,
      period: 'Daily',  
      lastUpdated: new Date(quota.updated_at).toLocaleString(),
      icon,
      ...colors
    }
  })
})

// Computed properties for summary stats
const healthyQuotasCount = computed(() => {
  return processedQuotas.value.filter(q => q.status === 'Healthy').length
})

const attentionNeededCount = computed(() => {
  return processedQuotas.value.filter(q => q.status === 'Warning' || q.status === 'Critical').length
})

async function load() {
  try {
    loading.value = true
    error.value = null
    const r = await api.get('/me/quotas')
    quotas.value = r.data
  } catch (err) {
    console.error('Failed to load quotas:', err)
    error.value = err.response?.data?.detail || err.message || 'Failed to load quotas'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
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

.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

/* Enhanced terminal-style pre */
pre { 
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
  border-radius: 12px; 
  overflow-x: auto; 
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
}

/* Enhanced scrollbar styling */
pre::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

pre::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #dc2626, #d97706);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

pre::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #b91c1c, #b45309);
}

/* Enhanced number formatting */
.text-3xl {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
}

/* Smooth transitions for everything */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Responsive font scaling */
@media (max-width: 640px) {
  .text-5xl {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
}

/* Enhanced focus states */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.5);
}

/* Dark mode support for raw JSON */
pre {
  color: #22c55e;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Smooth transitions for dark mode */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>