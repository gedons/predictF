<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AdminNavbar />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">System metrics and usage statistics</p>
      </div>

      <!-- Loading State -->
      <LoadingSkeleton v-if="loading" type="card" />

      <!-- Summary Cards -->
      <div v-else-if="summary" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Total Users</p>
              <p class="text-3xl font-bold mt-2">{{ summary.total_users || 0 }}</p>
            </div>
            <svg class="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Active Models</p>
              <p class="text-3xl font-bold mt-2">{{ summary.active_models || 0 }}</p>
            </div>
            <svg class="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Total Predictions</p>
              <p class="text-3xl font-bold mt-2">{{ summary.total_predictions || 0 }}</p>
            </div>
            <svg class="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>

        <div class="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-pink-100 text-sm font-medium">Predictions Today</p>
              <p class="text-3xl font-bold mt-2">{{ summary.predictions_today || 0 }}</p>
            </div>
            <svg class="w-12 h-12 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Recent Events -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Recent Analytics Events</h2>
          <select v-model="eventLimit" @change="fetchEvents" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            <option :value="10">Last 10</option>
            <option :value="25">Last 25</option>
            <option :value="50">Last 50</option>
            <option :value="100">Last 100</option>
          </select>
        </div>

        <LoadingSkeleton v-if="loadingEvents" type="table" :rows="5" />

        <div v-else-if="events.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="event in events" :key="event.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <StatusBadge :variant="getEventVariant(event.event)">{{ event.event }}</StatusBadge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {{ event.user_id || 'Anonymous' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(event.created_at) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <button @click="showEventDetails(event)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
          No events found
        </div>
      </div>

      <!-- Event Details Modal -->
      <div v-if="selectedEvent" @click="selectedEvent = null" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div @click.stop class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Event Details</h3>
            <button @click="selectedEvent = null" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto text-gray-900 dark:text-gray-300">{{ JSON.stringify(selectedEvent, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAdminSummary, getAnalyticsEvents } from '../../services/api'
import AdminNavbar from '../../components/AdminNavbar.vue'
import StatusBadge from '../../components/StatusBadge.vue'
import LoadingSkeleton from '../../components/LoadingSkeleton.vue'

const loading = ref(true)
const loadingEvents = ref(true)
const summary = ref(null)
const events = ref([])
const eventLimit = ref(25)
const selectedEvent = ref(null)

const fetchSummary = async () => {
  try {
    const response = await getAdminSummary()
    summary.value = response.data
  } catch (error) {
    console.error('Failed to fetch summary:', error)
  } finally {
    loading.value = false
  }
}

const fetchEvents = async () => {
  loadingEvents.value = true
  try {
    const response = await getAnalyticsEvents({ limit: eventLimit.value })
    events.value = response.data.events || []
  } catch (error) {
    console.error('Failed to fetch events:', error)
  } finally {
    loadingEvents.value = false
  }
}

const getEventVariant = (eventName) => {
  if (eventName.includes('error') || eventName.includes('failed')) return 'error'
  if (eventName.includes('success') || eventName.includes('completed')) return 'success'
  if (eventName.includes('prediction')) return 'primary'
  return 'info'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

const showEventDetails = (event) => {
  selectedEvent.value = event
}

onMounted(() => {
  fetchSummary()
  fetchEvents()
})
</script>
