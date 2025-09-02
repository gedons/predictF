<!-- src/components/UpcomingMatches.vue -->
<template>
  <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
      <div class="flex items-center justify-between">
        <div>
          <!-- <h3 class="text-lg font-bold text-gray-900">Upcoming EPL Fixtures</h3> -->
          <p class="text-sm text-gray-600 mt-1">Next {{ upcomingMatches.length }} EPL matches</p>
        </div>
        <div class="flex items-center space-x-2">
          <div class="flex items-center text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
            Live Data
          </div>
          <div class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {{ upcomingMatches.length }} shown
          </div>
        </div>
      </div>
    </div>

    <div class="p-6">
      <!-- Error State -->
      <div v-if="error" class="text-center py-12">
        <svg class="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <h4 class="text-lg font-medium text-red-900 mb-2">Error Loading Matches</h4>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="fetchMatches"
          class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Try Again
        </button>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="space-y-4">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="bg-gray-100 rounded-xl p-4 space-y-3">
            <div class="flex justify-between">
              <div class="h-3 bg-gray-200 rounded w-24"></div>
              <div class="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div class="flex justify-between items-center">
              <div class="h-4 bg-gray-200 rounded w-32"></div>
              <div class="h-3 bg-gray-200 rounded w-6"></div>
              <div class="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div class="h-3 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>

      <!-- No Matches State -->
      <div v-else-if="upcomingMatches.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <h4 class="text-lg font-medium text-gray-900 mb-2">No Upcoming Matches</h4>
        <p class="text-gray-500 mb-4">No Premier League fixtures scheduled for the next 30 days.</p>
        
        <div class="flex gap-2 justify-center">
          <button 
            @click="fetchMatches"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
          
          <button 
            @click="daysAhead = daysAhead === 30 ? 90 : 30; fetchMatches()"
            class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Look {{ daysAhead === 30 ? '90' : '30' }} days ahead
          </button>
        </div>
      </div>

      <!-- Matches Grid -->
      <div v-else class="space-y-3">
        <div
          v-for="match in limitedMatches"
          :key="match.id"
          class="group relative bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 border border-gray-200 hover:border-blue-300 rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          @click="selectMatch(match)"
        >
          <!-- Match Status & Date -->
          <div class="flex justify-between items-start mb-3">
            <div class="flex flex-col">
              <div class="text-sm font-medium text-gray-600">
                {{ formatDate(match.utcDate) }}
              </div>
              <div class="text-xs text-gray-500 mt-0.5">
                {{ formatTime(match.utcDate) }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-xs font-medium px-2 py-1 rounded-full" :class="getTimeUntilClass(match)">
                {{ getTimeUntil(match) }}
              </div>
              <div class="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                Matchday {{ match.matchday }}
              </div>
              <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

          <!-- Teams -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex-1">
              <div class="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                {{ match.homeTeam.shortName || match.homeTeam.name }}
              </div>
              <div class="text-xs text-gray-500 mt-0.5">Home</div>
            </div>
            
            <div class="px-4 py-2 bg-gray-100 group-hover:bg-blue-100 rounded-full transition-colors">
              <span class="text-sm font-bold text-gray-600 group-hover:text-blue-600">VS</span>
            </div>
            
            <div class="flex-1 text-right">
              <div class="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                {{ match.awayTeam.shortName || match.awayTeam.name }}
              </div>
              <div class="text-xs text-gray-500 mt-0.5">Away</div>
            </div>
          </div>

          <!-- Competition & Status Info -->
          <div class="flex items-center justify-between text-xs text-gray-600">
            <div class="flex items-center space-x-3">
              <div class="flex items-center">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span>Premier League</span>
              </div>
              <div class="flex items-center" v-if="match.venue">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span>{{ match.venue }}</span>
              </div>
            </div>
            <div class="text-blue-600 font-medium group-hover:text-blue-700">
              Click to select
            </div>
          </div>

          <!-- Status indicator -->
          <div class="absolute top-2 right-2 flex items-center">
            <div 
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-green-400': match.status === 'SCHEDULED',
                'bg-yellow-400': match.status === 'TIMED',
                'bg-red-400': match.status === 'POSTPONED',
                'bg-blue-400': match.status === 'IN_PLAY'
              }"
            ></div>
          </div>

          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      <!-- Show More/Less Toggle -->
      <div v-if="upcomingMatches.length > displayLimit" class="mt-6 text-center">
        <button 
          class="inline-flex items-center px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
          @click="showMore = !showMore"
        >
          <svg v-if="!showMore" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
          </svg>
          {{ showMore ? 'Show Less' : `Show All (${upcomingMatches.length})` }}
        </button>
      </div>

      <!-- Last Updated Info -->
      <div v-if="lastUpdated" class="mt-4 text-center text-xs text-gray-500">
        Last updated: {{ formatTime(lastUpdated) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Props
const props = defineProps({
  apiKey: { 
    type: String, 
    required: true 
  },
  autoRefresh: { 
    type: Boolean, 
    default: true 
  },
  refreshInterval: { 
    type: Number, 
    default: 300000 // 5 minutes
  }
})

const emit = defineEmits(['select', 'matchesLoaded', 'error'])

// Reactive state
const loading = ref(false)
const error = ref(null)
const matches = ref([])
const showMore = ref(false)
const lastUpdated = ref(null)
const daysAhead = ref(30)
const displayLimit = 6

// Auto-refresh interval
let refreshTimer = null

// Computed properties
const upcomingMatches = computed(() => {
  if (!matches.value || matches.value.length === 0) return []

  const nowMs = Date.now()
  // statuses to treat as "upcoming"
  const upcomingStatuses = new Set(['SCHEDULED', 'TIMED'])

  return matches.value
    .filter(match => {
      if (!match || !match.utcDate) return false

      const matchDateMs = new Date(match.utcDate).getTime()
      // include matches that are strictly in the future OR very recently started (grace window)
      const graceMs = 60 * 1000 // 1 minute grace
      const isFuture = matchDateMs > (nowMs - graceMs)
      const isUpcomingStatus = upcomingStatuses.has(match.status)

      return isFuture && isUpcomingStatus
    })
    .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))
})


const limitedMatches = computed(() => {
  if (showMore.value) return upcomingMatches.value
  return upcomingMatches.value.slice(0, displayLimit)
})

// API Functions
async function fetchMatches() {
  if (!props.apiKey) {
    error.value = 'API key is required'
    return
  }

  loading.value = true
  error.value = null
  
  try {
    const today = new Date()
    const futureDate = new Date()
    futureDate.setDate(today.getDate() + daysAhead.value)

    const params = new URLSearchParams({
      dateFrom: today.toISOString().split('T')[0],
      dateTo: futureDate.toISOString().split('T')[0]
    })

    const response = await fetch(`/api/v4/competitions/PL/matches?${params}`, {
      headers: {
        'X-Auth-Token': props.apiKey,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Invalid API key or insufficient permissions')
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.')
      } else {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
    }

    const data = await response.json()
    
    if (!data.matches) {
      throw new Error('Invalid API response format')
    }

    matches.value = data.matches
    lastUpdated.value = new Date()
    
    console.log(`Loaded ${data.matches.length} matches, ${upcomingMatches.value.length} upcoming`)
    
    emit('matchesLoaded', {
      total: data.matches.length,
      upcoming: upcomingMatches.value.length,
      matches: upcomingMatches.value
    })

  } catch (err) {
    console.error('Error fetching matches:', err)
    error.value = err.message
    emit('error', err)
  } finally {
    loading.value = false
  }
}

// Event handlers
function selectMatch(match) {
  emit('select', match)
}

// Utility functions
function formatDate(dateString) {
  if (!dateString) return 'TBD'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    })
  } catch (e) {
    return 'TBD'
  }
}

function formatTime(dateString) {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  } catch (e) {
    return ''
  }
}

function getTimeUntil(match) {
  if (!match.utcDate) return 'TBD'
  
  const now = new Date()
  const matchDate = new Date(match.utcDate)
  const diff = (matchDate - now) / 1000 // difference in seconds
  
  if (diff < 0) return 'Started'
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`
  return `${Math.floor(diff / 604800)}w`
}

function getTimeUntilClass(match) {
  if (!match.utcDate) return 'bg-gray-100 text-gray-600'
  
  const now = new Date()
  const matchDate = new Date(match.utcDate)
  const diff = (matchDate - now) / 1000
  
  if (diff < 0) return 'bg-red-100 text-red-700'
  if (diff < 3600) return 'bg-red-100 text-red-700' // Less than 1 hour
  if (diff < 86400) return 'bg-orange-100 text-orange-700' // Less than 1 day
  if (diff < 604800) return 'bg-blue-100 text-blue-700' // Less than 1 week
  return 'bg-green-100 text-green-700' // More than 1 week
}

// Setup auto-refresh
function setupAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  
  if (props.autoRefresh && props.refreshInterval > 0) {
    refreshTimer = setInterval(() => {
      fetchMatches()
    }, props.refreshInterval)
  }
}

// Lifecycle hooks
onMounted(() => {
  fetchMatches()
  setupAutoRefresh()
})

// Watch for prop changes
watch(() => props.autoRefresh, setupAutoRefresh)
watch(() => props.refreshInterval, setupAutoRefresh)

// Cleanup
function cleanup() {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
}

// Expose methods for parent component
defineExpose({
  fetchMatches,
  cleanup
})

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(cleanup)
</script>

<style scoped>
/* Custom animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Smooth transitions for all interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>