<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AdminNavbar />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Data Pipeline Management</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Manage data refresh and model retraining operations</p>
      </div>

      <!-- Data Refresh Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Data Refresh Pipeline</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Download → Clean → Ingest football match data</p>
          </div>
          <StatusBadge :variant="refreshStatus.variant">{{ refreshStatus.text }}</StatusBadge>
        </div>

        <div class="space-y-4">
          <!-- Options -->
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input v-model="refreshOptions.download" type="checkbox" class="rounded text-blue-600 mr-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">Download new data</span>
            </label>
            <label class="flex items-center">
              <input v-model="refreshOptions.clean" type="checkbox" class="rounded text-blue-600 mr-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">Clean data</span>
            </label>
            <label class="flex items-center">
              <input v-model="refreshOptions.ingest" type="checkbox" class="rounded text-blue-600 mr-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">Ingest to database</span>
            </label>
          </div>

          <!-- Action Button -->
          <button
            @click="triggerRefresh"
            :disabled="refreshing"
            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span v-if="refreshing" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </span>
            <span v-else>Trigger Data Refresh</span>
          </button>

          <!-- Result Message -->
          <div v-if="refreshMessage" :class="refreshMessageClass" class="p-4 rounded-lg">
            {{ refreshMessage }}
          </div>
        </div>
      </div>

      <!-- Model Retraining Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Model Retraining</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Train new prediction model with Optuna optimization</p>
          </div>
          <StatusBadge :variant="retrainStatus.variant">{{ retrainStatus.text }}</StatusBadge>
        </div>

        <div class="space-y-4">
          <!-- Parameters -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rolling Window</label>
              <input v-model.number="retrainParams.window" type="number" min="1" max="20" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Optuna Trials</label>
              <input v-model.number="retrainParams.n_trials" type="number" min="10" max="200" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>
            <div class="flex items-end">
              <label class="flex items-center">
                <input v-model="retrainParams.quick_test" type="checkbox" class="rounded text-blue-600 mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">Quick test mode</span>
              </label>
            </div>
          </div>

          <!-- Action Button -->
          <button
            @click="triggerRetrain"
            :disabled="retraining"
            class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span v-if="retraining" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Training Model...
            </span>
            <span v-else>Start Model Retraining</span>
          </button>

          <!-- Result Message -->
          <div v-if="retrainMessage" :class="retrainMessageClass" class="p-4 rounded-lg">
            {{ retrainMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { refreshData, retrainModel } from '../../services/api'
import AdminNavbar from '../../components/AdminNavbar.vue'
import StatusBadge from '../../components/StatusBadge.vue'

// Data Refresh State
const refreshing = ref(false)
const refreshMessage = ref('')
const refreshOptions = ref({
  download: true,
  clean: true,
  ingest: true
})

const refreshStatus = computed(() => {
  if (refreshing.value) return { variant: 'info', text: 'Running' }
  if (refreshMessage.value && !refreshMessage.value.includes('Error')) return { variant: 'success', text: 'Completed' }
  if (refreshMessage.value && refreshMessage.value.includes('Error')) return { variant: 'error', text: 'Failed' }
  return { variant: 'default', text: 'Idle' }
})

const refreshMessageClass = computed(() => {
  if (refreshMessage.value.includes('Error')) {
    return 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800'
  }
  return 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800'
})

// Model Retraining State
const retraining = ref(false)
const retrainMessage = ref('')
const retrainParams = ref({
  window: 5,
  n_trials: 50,
  quick_test: false
})

const retrainStatus = computed(() => {
  if (retraining.value) return { variant: 'info', text: 'Training' }
  if (retrainMessage.value && !retrainMessage.value.includes('Error')) return { variant: 'success', text: 'Completed' }
  if (retrainMessage.value && retrainMessage.value.includes('Error')) return { variant: 'error', text: 'Failed' }
  return { variant: 'default', text: 'Idle' }
})

const retrainMessageClass = computed(() => {
  if (retrainMessage.value.includes('Error')) {
    return 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800'
  }
  return 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800'
})

// Actions
const triggerRefresh = async () => {
  refreshing.value = true
  refreshMessage.value = ''
  
  try {
    const response = await refreshData(refreshOptions.value)
    refreshMessage.value = response.data.message || 'Data refresh started successfully!'
  } catch (error) {
    refreshMessage.value = `Error: ${error.response?.data?.detail || error.message}`
  } finally {
    refreshing.value = false
  }
}

const triggerRetrain = async () => {
  retraining.value = true
  retrainMessage.value = ''
  
  try {
    const response = await retrainModel(retrainParams.value)
    retrainMessage.value = response.data.message || 'Model retraining started successfully!'
  } catch (error) {
    retrainMessage.value = `Error: ${error.response?.data?.detail || error.message}`
  } finally {
    retraining.value = false
  }
}
</script>
