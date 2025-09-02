<template>
  <UserNavbar/>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Usage Quotas
        </h1>
        <p class="text-lg text-gray-600">Monitor your API usage and remaining limits</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8">
        <div class="flex items-center justify-center gap-3 text-gray-600">
          <svg class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-lg">Loading quota information...</span>
        </div>
      </div>

      <!-- Error State -->
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

      <!-- Quotas Content -->
      <div v-if="quotas && !loading" class="space-y-6">
        <!-- Quota Cards Grid -->
        <div v-if="processedQuotas.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="quota in processedQuotas" 
            :key="quota.name"
            class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="quota.iconBg">
                  <component :is="quota.icon" class="w-5 h-5" :class="quota.iconColor" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ quota.displayName }}</h3>
                  <p class="text-sm text-gray-500">{{ quota.period }} • <span class="text-xs">Updated {{ quota.lastUpdated }}</span> </p>
                </div>
              </div>
            </div>

            <!-- Usage Bar -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Usage</span>
                <span class="text-sm font-semibold" :class="quota.textColor">
                  <span v-if="quota.unlimited" class="text-blue-600">Unlimited</span>
                  <span v-else>{{ quota.used.toLocaleString() }} / {{ quota.limit.toLocaleString() }}</span>
                </span>
              </div>
              <div v-if="!quota.unlimited" class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-500" 
                  :class="quota.progressColor"
                  :style="{ width: `${quota.percentage}%` }"
                ></div>
              </div>
              <div v-else class="w-full bg-blue-100 rounded-full h-2">
                <div class="h-2 rounded-full bg-blue-500 w-full"></div>
              </div>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-gray-500">
                  <span v-if="quota.unlimited">Unlimited usage</span>
                  <span v-else>{{ quota.percentage }}% used</span>
                </span>
                <span class="text-xs font-medium" :class="quota.remainingColor">
                  <span v-if="quota.unlimited">∞ remaining</span>
                  <span v-else>{{ quota.remaining.toLocaleString() }} remaining</span>
                </span>
              </div>
            </div>

            <!-- Status Badge -->
            <div class="flex justify-end">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="quota.statusBadge">
                {{ quota.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Raw Data Card (if no processed quotas) -->
        <div v-if="processedQuotas.length === 0 && quotas" class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Quota Details
            </h3>
          </div>
          <div class="p-6">
            <pre class="text-sm text-gray-700 leading-relaxed">{{ prettyJson(quotas) }}</pre>
          </div>
        </div>

        <!-- Refresh Button -->
        <div class="flex justify-center">
          <button 
            @click="load" 
            class="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Quotas
            </span>
          </button>
        </div>

        <!-- Info Card -->
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="text-sm text-blue-800">
              <span class="font-medium">Usage Info:</span> 
              Quotas reset at the beginning of each billing period. Monitor your usage to avoid service interruptions.
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

// Icons for different quota types (using simple SVG components)
const ApiIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`
}

const DataIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path></svg>`
}

const DefaultIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
}

function prettyJson(obj) {
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return String(obj)
  }
}

// Process quotas for display
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
    
    // Format display name
    const displayName = quota.endpoint
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
    
    // Determine icon based on endpoint type
    let icon = DefaultIcon
    if (isEnriched) icon = ApiIcon
    else if (isMatch || isPrediction) icon = DataIcon
    
    // Color coding based on usage percentage (only if not unlimited)
    const getStatusColors = () => {
      if (quota.unlimited) {
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          progressColor: 'bg-blue-500',
          textColor: 'text-blue-600',
          remainingColor: 'text-blue-600',
          status: 'Unlimited',
          statusBadge: 'bg-blue-100 text-blue-800'
        }
      }
      
      if (percentage > 90) {
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          progressColor: 'bg-red-500',
          textColor: 'text-red-600',
          remainingColor: 'text-red-600',
          status: 'Critical',
          statusBadge: 'bg-red-100 text-red-800'
        }
      } else if (percentage > 75) {
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          progressColor: 'bg-yellow-500',
          textColor: 'text-yellow-600',
          remainingColor: 'text-yellow-600',
          status: 'Warning',
          statusBadge: 'bg-yellow-100 text-yellow-800'
        }
      } else {
        return {
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          progressColor: 'bg-green-500',
          textColor: 'text-green-600',
          remainingColor: 'text-gray-600',
          status: 'Good',
          statusBadge: 'bg-green-100 text-green-800'
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

/* Number formatting enhancement */
.text-lg {
  font-variant-numeric: tabular-nums;
}
</style>