<!-- src/views/AdminDashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <AdminNavbar 
      :user-name="currentUser.name"
      :user-email="currentUser.email" 
    />
    
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p class="mt-2 text-sm text-gray-600">Monitor your system's performance and activity</p>
          </div>
          <div class="mt-4 sm:mt-0 flex items-center space-x-3">
            <div class="bg-green-50 px-3 py-2 rounded-lg">
              <span class="text-sm font-medium text-green-700">System Online</span>
            </div>
            <div class="text-sm text-gray-500">
              {{ new Date().toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Key Metrics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Users Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Total Users</div>
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(summary?.users?.total) }}</div>
            </div>
          </div>
        </div>

        <!-- Models Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">AI Models</div>
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(summary?.models?.total) }}</div>
             <div class="text-xs text-gray-500 mt-1">
                Active: {{ getActiveModelDisplayName() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Quotas Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Quota Policies</div>
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(summary?.quotas?.total) }}</div>
              <div class="text-xs text-gray-500 mt-1">
                Unspecified: {{ summary?.quotas?.remaining_null ?? 0 }}
              </div>
            </div>
          </div>
        </div>

        <!-- Predictions Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Predictions (24h)</div>
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(summary?.predictions?.recent_24h) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- LLM Cache Stats -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">LLM Cache</h3>
            <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
              </svg>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Total Predictions</span>
                <span class="text-lg font-semibold text-gray-900">{{ formatNumber(summary?.llm_cache?.total) }}</span>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Last 24 Hours</span>
                <span class="text-lg font-semibold text-blue-600">{{ formatNumber(summary?.llm_cache?.last_24h) }}</span>
              </div>
            </div>
            <div class="pt-2 border-t border-gray-100">
              <div class="text-xs text-gray-500">
                <span class="font-medium">Last Entry:</span> {{ formatDate(summary?.llm_cache?.last_entry) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Chart -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">System Activity</h3>
            <div class="text-sm text-gray-500">
              <span class="inline-flex items-center">
                <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Live Data
              </span>
            </div>
          </div>
          <div class="relative" style="height: 200px;">
            <canvas ref="activityCanvas"></canvas>
          </div>
          <div class="mt-4 text-xs text-gray-500 text-center">
            Server Time: {{ formatDate(summary?.server_time) }}
          </div>
        </div>
      </div>

      <!-- Data Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Models -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Recent Models
            </h3>
          </div>
          <div class="p-6">
            <div v-if="summary?.models?.recent_models?.length" class="space-y-4">
              <div
                v-for="m in summary.models.recent_models"
                :key="m.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ m.model_name }}</div>
                    <div class="text-sm text-gray-500">Version {{ m.version }}</div>
                  </div>
                </div>
                <div class="text-xs text-gray-500">
                  {{ formatDate(m.created_at) }}
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500">No recent models found</p>
            </div>
          </div>
        </div>

        <!-- Sample Quotas -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Active Quotas
            </h3>
          </div>
          <div class="p-6">
            <div v-if="summary?.quotas?.sample?.length" class="space-y-4">
              <div
                v-for="q in summary.quotas.sample"
                :key="q.user_id + q.endpoint"
                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="text-sm font-medium text-gray-900 truncate">{{ q.endpoint }}</div>
                      <div class="text-xs text-gray-500 font-mono">{{ q.user_id.substring(0, 8) }}...</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold text-gray-900">
                      {{ q.remaining !== null ? formatNumber(q.remaining) : 'Unlimited' }}
                    </div>
                    <div class="text-xs text-gray-500">remaining</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500">No active quotas found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAdminDashboardStore } from '../../store/adminDashboard'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import AdminNavbar from '../../components/AdminNavbar.vue'
import { useAuthStore } from '../../store/auth' 

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const store = useAdminDashboardStore()
const summary = ref(null)
const activityCanvas = ref(null)
let chart = null

// Local model names mapping (same as in models page)
const modelNames = ['Aria-1', 'Aria-2', 'Aria-3']

// Function to get display name for active model
const getActiveModelDisplayName = () => {
  if (!summary.value?.models?.active_model) {
    return 'None'
  }
  
  const activeModel = summary.value.models.active_model
  
  if (activeModel.id) {
    const modelIndex = (activeModel.id - 1) % modelNames.length
    return modelNames[modelIndex] || `Aria-${modelIndex + 1}`
  }

  const hash = activeModel.model_name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  const modelIndex = Math.abs(hash) % modelNames.length
  
  return modelNames[modelIndex]
}

async function load() {
  try {
    const s = await store.fetchSummary()
    summary.value = s

    // Enhanced chart with better styling
    const labels = ['Users', 'Models', 'Quotas', 'Predictions']
    const data = [
      s.users?.total || 0,
      s.models?.total || 0,
      s.quotas?.total || 0,
      s.llm_cache?.total || 0
    ]

    if (chart) {
      chart.data.labels = labels
      chart.data.datasets[0].data = data
      chart.update()
    } else if (activityCanvas.value) {
      const ctx = activityCanvas.value.getContext('2d')
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Count',
            data,
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',   // Blue
              'rgba(147, 51, 234, 0.8)',   // Purple  
              'rgba(34, 197, 94, 0.8)',    // Green
              'rgba(249, 115, 22, 0.8)'    // Orange
            ],
            borderColor: [
              'rgba(59, 130, 246, 1)',
              'rgba(147, 51, 234, 1)',
              'rgba(34, 197, 94, 1)',
              'rgba(249, 115, 22, 1)'
            ],
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: 'white',
              bodyColor: 'white',
              cornerRadius: 8,
              displayColors: false
            }
          },
          scales: { 
            y: { 
              beginAtZero: true,
              grid: {
                color: 'rgba(156, 163, 175, 0.1)'
              },
              ticks: {
                color: 'rgba(107, 114, 128, 0.8)'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: 'rgba(107, 114, 128, 0.8)'
              }
            }
          }
        }
      })
    }
  } catch (e) {
    console.error('Failed loading admin summary', e)
  }
}

function formatNumber(num) {
  if (num === null || num === undefined) return '-'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

function formatDate(dateString) {
  if (!dateString || dateString === '—') return 'Not available'
  try {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Invalid date'
  }
}

onMounted(load)
</script>

<style scoped>
/* Additional custom styles if needed */
.chart-container {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>