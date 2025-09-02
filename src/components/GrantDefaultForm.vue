<template>
  <div class="border-t border-gray-100 pt-6 mt-6">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Grant New Default Quota
      </h3>
      <p class="text-sm text-gray-600 mt-1">Set system-wide default quotas for API endpoints</p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            API Endpoint
          </label>
          <div class="relative">
            <input
              v-model="form.endpoint"
              type="text"
              placeholder="/api/v1/predict"
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <p class="text-xs text-gray-500 mt-1">Enter the API endpoint path</p>
        </div>

        <div class="lg:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Default Limit
          </label>
          <div class="relative">
            <input
              v-model.number="form.limit"
              type="number"
              min="0"
              placeholder="1000"
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
          <p class="text-xs text-gray-500 mt-1">Number of requests allowed</p>
        </div>

        <div class="lg:col-span-1 flex items-end">
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Granting...' : 'Grant Default' }}
          </button>
        </div>
      </div>

      <div class="flex items-center">
        <input
          id="apply-existing"
          v-model="form.applyToExisting"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="apply-existing" class="ml-3 text-sm font-medium text-gray-700">
          Apply to existing users who don't have this endpoint quota
        </label>
        <div class="ml-2 group relative">
          <svg class="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="opacity-0 group-hover:opacity-100 absolute bottom-6 left-0 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 z-10">
            Retroactively applies this quota to users without existing limits for this endpoint
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAdminQuotasStore } from '../store/adminQuotas'

const store = useAdminQuotasStore()
const loading = ref(false)
const form = reactive({
  endpoint: '',
  limit: null,
  applyToExisting: false
})

const emit = defineEmits(['granted'])

async function submitForm() {
  if (!form.endpoint || form.limit === null || form.limit < 0) {
    alert('Please fill in all required fields with valid values')
    return
  }
  
  loading.value = true
  try {
    const payload = { [form.endpoint]: form.limit }
    await store.grantDefault(payload, form.applyToExisting)
    
    // Reset form
    form.endpoint = ''
    form.limit = null
    form.applyToExisting = false
    
    emit('granted')
    alert('Default quota granted successfully!')
  } catch (e) {
    alert('Error: ' + (e?.response?.data?.detail || e.message))
  } finally {
    loading.value = false
  }
}
</script>