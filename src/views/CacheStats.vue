<template>
  <UserNavbar />
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          LLM Cache Statistics
        </h1>
        <p class="text-lg text-gray-600">Monitor your cache performance and usage</p>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8">
        <div class="flex items-center justify-center gap-3 text-gray-600">
          <svg class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-lg">Loading cache statistics...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="store.error" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
        <div class="flex items-center gap-3">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="text-sm text-red-700">{{ store.error }}</div>
        </div>
      </div>

      <!-- Stats Content -->
      <div v-if="!store.loading" class="space-y-6">
        <!-- Main Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Cache Enabled Status -->
          <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Cache Status</div>
                <div class="text-2xl font-bold mt-2" :class="stats.cache_enabled ? 'text-green-600' : 'text-red-600'">
                  {{ stats.cache_enabled ? 'Enabled' : 'Disabled' }}
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="stats.cache_enabled ? 'bg-green-100' : 'bg-red-100'">
                  <svg v-if="stats.cache_enabled" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Entries -->
          <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Entries</div>
                <div class="text-2xl font-bold text-blue-600 mt-2">{{ stats.total_entries.toLocaleString() }}</div>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 24h Entries -->
          <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Last 24 Hours</div>
                <div class="text-2xl font-bold text-purple-600 mt-2">{{ stats.entries_last_24h.toLocaleString() }}</div>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 7d Entries -->
          <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Last 7 Days</div>
                <div class="text-2xl font-bold text-orange-600 mt-2">{{ stats.entries_last_7d.toLocaleString() }}</div>
              </div>
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Last Entry Card -->
        <div class="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-lg font-semibold text-gray-900">Last Saved Analysis</h3>
              </div>
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border">
                <div v-if="stats.last_entry" class="text-gray-700 font-mono text-sm">
                  {{ stats.last_entry }}
                </div>
                <div v-else class="text-gray-500 italic">
                  No recent analysis found
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-center">
          <button 
            @click="refresh" 
            class="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Statistics
            </span>
          </button>
        </div>

        <!-- Additional Info -->
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="text-sm text-blue-800">
              <span class="font-medium">Cache Info:</span> 
              The cache stores LLM analysis results to improve response times and reduce API costs. Statistics are updated in real-time.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePredictionStore } from '../store/prediction'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import UserNavbar from '../components/UserNavbar.vue'

const store = usePredictionStore()
const router = useRouter()
const auth = useAuthStore()

// Make stats reactive by wrapping in a computed getter
const stats = computed(() => store.cacheStats)

async function refresh() {
  try {
    // fetchCacheStats updates the pinia store; computed(stats) will update the template
    await store.fetchCacheStats()
    // helpful debugging: uncomment to verify store was updated
    // console.log('store.cacheStats after fetch:', store.cacheStats)
  } catch (e) {
    const status = e?.response?.status
    if (status === 401 || status === 403) {
      // Optionally show a friendly message; here we redirect to login
      try { await auth.logout() } catch {}
      router.push({ name: 'Login' })
      return
    }
    console.error('Failed to fetch cache stats', e)
  }
}

onMounted(async () => {
  // Try to restore auth session if auth store exposes restore()
  if (!auth.token && typeof auth.restore === 'function') {
    try { await auth.restore() } catch (err) { /* ignore */ }
  }
  await refresh()
})
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Number formatting enhancement */
.text-2xl {
  font-variant-numeric: tabular-nums;
}
</style>