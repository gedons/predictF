<template>
  <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
              </svg>
              User Quota Management
            </h2>
            <p class="text-gray-600 mt-1">Search for users and manage their API quota allocations</p>
          </div>
          <button 
            @click="$emit('close')" 
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="overflow-y-auto max-h-[calc(95vh-80px)]">
        <!-- User Search Section -->
        <div v-if="!selectedUserId" class="p-8 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Search Users
          </h3>

          <div class="relative mb-6">
            <input
              v-model="userSearch"
              @input="debouncedSearch"
              type="text"
              placeholder="Search users by email, ID, or username..."
              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <!-- Search Loading -->
          <div v-if="searching" class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
            <span class="text-gray-600">Searching users...</span>
          </div>

          <!-- Users List -->
          <div v-if="store.users.length > 0" class="space-y-3 max-h-80 overflow-y-auto">
            <div
              v-for="user in store.users"
              :key="user.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
            >
              <div class="flex-1">
                <div class="font-semibold text-gray-900">{{ user.email || user.username || user.id }}</div>
                <div class="text-sm text-gray-500 mt-1">ID: {{ user.id }}</div>
                <div v-if="user.name && user.name !== user.email" class="text-sm text-gray-400">{{ user.name }}</div>
              </div>
              <button 
                @click="selectUser(user.id)" 
                class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Select User
              </button>
            </div>
          </div>

          <!-- No Results -->
          <div v-else-if="userSearch && !searching" class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
            <p class="text-gray-600">No users match your search criteria "{{ userSearch }}"</p>
          </div>
        </div>

        <!-- Selected User Management -->
        <div v-if="selectedUserId" class="p-8">
          <!-- Selected User Info -->
          <div class="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-green-600 uppercase tracking-wide mb-1">Selected User</div>
                <div class="text-xl font-bold text-gray-900">{{ selectedUserId }}</div>
              </div>
              <button 
                @click="selectedUserId = null; currentQuotas = []" 
                class="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors duration-200 border border-green-200"
              >
                Change User
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span class="text-gray-600">Loading user quotas...</span>
          </div>

          <!-- Error State -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-red-800 font-medium">Error: {{ error }}</span>
            </div>
          </div>

          <!-- Current Quotas -->
          <div v-if="currentQuotas.length > 0" class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Current Quotas
            </h3>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div 
                v-for="q in currentQuotas" 
                :key="q.endpoint" 
                class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div class="mb-4">
                  <code class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-mono">{{ q.endpoint }}</code>
                                      <div class="mt-3 flex items-center justify-between text-sm">
                      <span class="text-gray-600">
                        Limit: <span class="font-semibold text-gray-900">{{ q.limit ?? 'N/A' }}</span>
                        {{ q.unlimited ? ' (Unlimited)' : '' }}
                      </span>
                      <span class="text-gray-600">
                        Remaining: <span class="font-semibold text-gray-900">{{ q.remaining ?? 'N/A' }}</span>
                      </span>
                    </div>

                    <!-- Progress Bar -->
                    <div v-if="q.limit && q.remaining !== null && !q.unlimited" class="mt-3">
                      <div class="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Usage</span>
                        <span>{{ Math.round(((q.limit - q.remaining) / q.limit) * 100) }}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          :style="{ width: Math.min(100, ((q.limit - q.remaining) / q.limit) * 100) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex gap-2 mt-4">
                    <button 
                      @click="editQuota(q)" 
                      class="flex-1 px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button 
                      @click="resetQuota(q.endpoint)" 
                      class="px-3 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors duration-200"
                    >
                      Reset
                    </button>
                    <button 
                      @click="deleteQuota(q.endpoint)" 
                      class="px-3 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Quotas State -->
          <div v-else-if="!loading" class="text-center py-8 mb-8">
            <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No Quotas Assigned</h3>
            <p class="text-gray-600">This user doesn't have any quota assignments yet</p>
          </div>

          <!-- Add/Edit Quota Form -->
          <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {{ editMode ? 'Edit Quota' : 'Add New Quota' }}
            </h3>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
                  <input
                    v-model="form.endpoint"
                    :disabled="editMode"
                    type="text"
                    placeholder="/api/v1/predict"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Limit</label>
                  <input
                    v-model.number="form.limit"
                    type="number"
                    min="0"
                    placeholder="1000"
                    :disabled="form.unlimited"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
                  />
                </div>
              </div>

              <div class="flex items-center">
                <input
                  id="unlimited"
                  v-model="form.unlimited"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="unlimited" class="ml-3 text-sm font-medium text-gray-700">
                  Unlimited quota (no restrictions)
                </label>
              </div>

              <div class="flex gap-3">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {{ submitting ? 'Saving...' : (editMode ? 'Update Quota' : 'Set Quota') }}
                </button>
                
                <button
                  v-if="editMode"
                  type="button"
                  @click="cancelEdit"
                  class="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Initial State Message -->
        <div v-if="!selectedUserId" class="p-8 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Search for Users</h3>
          <p class="text-gray-600">Use the search box above to find and select a user to manage their quotas</p>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAdminQuotasStore } from '../store/adminQuotas'

const props = defineProps({
  userId: { type: String, default: null }
})
const emit = defineEmits(['close', 'set', 'update'])
const store = useAdminQuotasStore()

const userSearch = ref('')
const searching = ref(false)
const selectedUserId = ref(props.userId)
const currentQuotas = ref([])
const loading = ref(false)
const error = ref('')
const editMode = ref(false)
const submitting = ref(false)

const form = reactive({ 
  endpoint: '', 
  limit: null, 
  unlimited: false 
})

async function selectUser(id) {
  selectedUserId.value = id
  await fetchUserQuotas()
}

async function fetchUserQuotas() {
  if (!selectedUserId.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await store.fetchUserQuotas(selectedUserId.value)
    currentQuotas.value = res.quotas || []
  } catch (e) {
    error.value = e?.response?.data?.detail || e.message
  } finally {
    loading.value = false
  }
}

let debounceTimer = null
function debouncedSearch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchUsers()
  }, 300)
}

async function searchUsers() {
  if (!userSearch.value.trim()) return
  searching.value = true
  try {
    await store.fetchUsers(userSearch.value.trim(), 50, 0)
  } catch (e) {
    error.value = e?.response?.data?.detail || e.message
  } finally {
    searching.value = false
  }
}

function editQuota(q) {
  form.endpoint = q.endpoint
  form.limit = q.limit
  form.unlimited = q.unlimited
  editMode.value = true
}

function cancelEdit() {
  form.endpoint = ''
  form.limit = null
  form.unlimited = false
  editMode.value = false
}

async function submitForm() {
  if (!selectedUserId.value) {
    alert('Select a user first')
    return
  }
  if (!form.endpoint) {
    alert('Endpoint required')
    return
  }
  submitting.value = true
  try {
    if (editMode.value) {
      await store.updateUserQuota(selectedUserId.value, form.endpoint, form.limit, null, form.unlimited)
    } else {
      await store.setUserQuota(selectedUserId.value, form.endpoint, form.limit, null, form.unlimited)
    }
    await fetchUserQuotas()
    cancelEdit()
    alert('Saved successfully!')
  } catch (e) {
    alert('Error: ' + (e?.response?.data?.detail || e.message))
  } finally {
    submitting.value = false
  }
}

async function deleteQuota(endpoint) {
  if (!selectedUserId.value) return
  if (!confirm('Delete this quota?')) return
  try {
    await store.deleteUserEndpointQuota(selectedUserId.value, endpoint)
    await fetchUserQuotas()
    alert('Quota deleted successfully')
  } catch (e) {
    alert('Error: ' + (e?.response?.data?.detail || e.message))
  }
}

async function resetQuota(endpoint) {
  if (!selectedUserId.value) return
  try {
    await store.resetUserQuotas(selectedUserId.value, endpoint)
    await fetchUserQuotas()
    alert('Quota reset successfully')
  } catch (e) {
    alert('Error: ' + (e?.response?.data?.detail || e.message))
  }
}

if (selectedUserId.value) {
  fetchUserQuotas()
}
</script>
