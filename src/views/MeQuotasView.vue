<template>
  <UserNavbar/>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Usage Quotas
          </span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Monitor your API usage and manage your limits with real-time insights
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-12 max-w-md mx-auto">
        <div class="flex flex-col items-center justify-center gap-6 text-gray-600">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
          </div>
          <div class="text-center">
            <p class="text-xl font-semibold text-gray-900 mb-2">Loading Quotas</p>
            <p class="text-gray-500">Fetching your latest usage data...</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-white/90 backdrop-blur-xl border border-red-200 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-red-900 mb-1">Unable to Load Quotas</h3>
            <p class="text-red-700 leading-relaxed">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Quotas Content -->
      <div v-if="quotas && !loading" class="space-y-8">
        <!-- Summary Stats -->
        <div v-if="processedQuotas.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900">{{ processedQuotas.filter(q => q.status === 'Good').length }}</p>
                <p class="text-sm text-gray-500 font-medium">Healthy Quotas</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900">{{ processedQuotas.filter(q => q.status === 'Warning' || q.status === 'Critical').length }}</p>
                <p class="text-sm text-gray-500 font-medium">Need Attention</p>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900">{{ processedQuotas.length }}</p>
                <p class="text-sm text-gray-500 font-medium">Total Endpoints</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quota Cards Grid -->
        <div v-if="processedQuotas.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="quota in processedQuotas" 
            :key="quota.name"
            class="group bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden"
          >
            <!-- Card Header -->
            <div class="p-6 pb-4">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" :class="quota.iconBg">
                    <component :is="quota.icon" class="w-6 h-6" :class="quota.iconColor" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-bold text-gray-900 truncate mb-1">{{ quota.displayName }}</h3>
                    <div class="flex items-center gap-2 text-sm text-gray-500">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="font-medium">{{ quota.period }}</span>
                    </div>
                  </div>
                </div>
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm" :class="quota.statusBadge">
                  {{ quota.status }}
                </span>
              </div>

              <!-- Usage Statistics -->
              <div class="space-y-4">
                <!-- Primary Usage Display -->
                <div class="text-center py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border">
                  <div class="text-3xl font-bold mb-1" :class="quota.textColor">
                    <span v-if="quota.unlimited" class="text-blue-600">∞</span>
                    <span v-else>{{ quota.used.toLocaleString() }}</span>
                  </div>
                  <div class="text-sm text-gray-500 font-medium">
                    <span v-if="quota.unlimited">Unlimited Usage</span>
                    <span v-else>of {{ quota.limit.toLocaleString() }} used</span>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="space-y-3">
                  <div v-if="!quota.unlimited" class="relative">
                    <div class="w-full bg-gray-200 rounded-full h-3 shadow-inner">
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
                    <div class="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
                      <div class="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 w-full relative">
                        <!-- Infinite animation -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Usage Details -->
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full" :class="quota.progressColor.replace('bg-', 'bg-').replace('-500', '-400')"></div>
                      <span class="text-sm font-semibold text-gray-700">
                        <span v-if="quota.unlimited">Unlimited</span>
                        <span v-else>{{ quota.percentage }}% used</span>
                      </span>
                    </div>
                    <div class="text-sm font-bold" :class="quota.remainingColor">
                      <span v-if="quota.unlimited">No limits</span>
                      <span v-else>{{ quota.remaining.toLocaleString() }} left</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50/80 to-gray-100/80 border-t border-gray-200/50">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span class="font-medium">Updated {{ quota.lastUpdated }}</span>
                </div>
                <div class="w-2 h-2 rounded-full animate-pulse" :class="quota.progressColor.replace('bg-', 'bg-').replace('-500', '-400')"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Raw Data Card (if no processed quotas) -->
        <div v-if="processedQuotas.length === 0 && quotas" class="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          <div class="px-8 py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <h3 class="text-xl font-bold flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              Raw Quota Data
            </h3>
            <p class="text-gray-300 mt-1">Detailed API response information</p>
          </div>
          <div class="p-8">
            <div class="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 overflow-hidden">
              <pre class="text-sm text-green-400 leading-relaxed font-mono overflow-x-auto">{{ prettyJson(quotas) }}</pre>
            </div>
          </div>
        </div>

        <!-- Action Section -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button 
            @click="load" 
            :disabled="loading"
            class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative flex items-center gap-3">
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
            <p class="text-sm text-gray-600">
              Auto-refresh every 
              <span class="font-semibold text-blue-600">5 minutes</span>
            </p>
          </div>
        </div>

        <!-- Enhanced Info Card -->
        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/50 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-bold text-blue-900 mb-2">Usage Guidelines</h4>
              <div class="text-sm text-blue-800 space-y-2">
                <p><span class="font-semibold">Reset Schedule:</span> Quotas automatically reset at the beginning of each billing period.</p>
                <p><span class="font-semibold">Monitoring:</span> Keep track of your usage to avoid service interruptions and plan your API consumption effectively.</p>
                <p><span class="font-semibold">Optimization:</span> Consider implementing rate limiting and caching to maximize your quota efficiency.</p>
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
          iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
          textColor: 'text-blue-600',
          remainingColor: 'text-blue-600',
          status: 'Unlimited',
          statusBadge: 'bg-blue-100 text-blue-800 border border-blue-200'
        }
      }
      
      if (percentage > 90) {
        return {
          iconBg: 'bg-gradient-to-br from-red-400 to-rose-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-red-500 to-rose-500',
          textColor: 'text-red-600',
          remainingColor: 'text-red-600',
          status: 'Critical',
          statusBadge: 'bg-red-100 text-red-800 border border-red-200'
        }
      } else if (percentage > 75) {
        return {
          iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
          textColor: 'text-amber-600',
          remainingColor: 'text-amber-600',
          status: 'Warning',
          statusBadge: 'bg-amber-100 text-amber-800 border border-amber-200'
        }
      } else {
        return {
          iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
          iconColor: 'text-white',
          progressColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
          textColor: 'text-emerald-600',
          remainingColor: 'text-gray-600',
          status: 'Healthy',
          statusBadge: 'bg-emerald-100 text-emerald-800 border border-emerald-200'
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
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

pre::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
}

/* Smooth transitions for everything */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhanced number formatting */
.text-3xl {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
}

/* Custom animations */
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
}

/* Gradient text animation */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Card hover effects */
.group:hover .group-hover\:animate-float {
  animation: float 2s ease-in-out infinite;
}

/* Glass morphism enhancement */
.backdrop-blur-xl {
  backdrop-filter: blur(20px) saturate(180%);
}

/* Progress bar glow effect */
.progress-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

/* Status badge pulse for critical items */
.bg-red-100.animate-pulse {
  animation: pulse-glow 2s infinite;
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
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

/* Dark mode support for raw JSON */
pre {
  color: #22c55e;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Loading state enhancements */
@keyframes ping-slow {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>