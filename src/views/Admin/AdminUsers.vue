<!-- src/views/AdminUsers.vue -->
<template>
    <AdminNavbar 
    :user-name="currentUser.name"
    :user-email="currentUser.email" 
    :notification-count="unreadNotifications"
     />
  <div class="min-h-screen bg-gray-50">

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="q"
              @keyup.enter="search"
              placeholder="Search users by email or username..."
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div class="flex gap-3">
            <button 
              @click="search"
              class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Search
            </button>
            <button 
              @click="resetSearch"
              class="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="flex flex-col items-center justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="store.error" class="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-red-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-red-800 font-medium">{{ store.error }}</p>
        </div>
      </div>

      <!-- Users Table -->
      <div v-if="!store.loading" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Desktop Table -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50 transition duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {{ (u.username || u.email).charAt(0).toUpperCase() }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ u.username || 'N/A' }}</div>
                      <div class="text-xs text-gray-500 font-mono">{{ u.id.substring(0, 8) }}...</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-semibold">{{ u.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="u.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ u.is_admin ? 'Admin' : 'User' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(u.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      @click="openQuota(u.id)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                      Quotas
                    </button>
                    <button 
                      @click="viewUser(u.id)"
                      class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="lg:hidden">
          <div v-for="u in users" :key="u.id" class="border-b border-gray-200 p-6 last:border-b-0">
            <div class="flex items-start justify-between">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {{ (u.username || u.email).charAt(0).toUpperCase() }}
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">{{ u.username || 'N/A' }}</h3>
                  <p class="text-sm text-gray-500">{{ u.email }}</p>
                  <div class="flex items-center mt-1">
                    <span 
                      :class="u.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mr-2"
                    >
                      {{ u.is_admin ? 'Admin' : 'User' }}
                    </span>
                    <span class="text-xs text-gray-500">{{ formatDate(u.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex space-x-2">
              <button 
                @click="openQuota(u.id)"
                class="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition duration-200"
              >
                Manage Quotas
              </button>
              <button 
                @click="viewUser(u.id)"
                class="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="users.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No users found</h3>
          <p class="mt-2 text-sm text-gray-500">Try adjusting your search criteria</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="!store.loading && users.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 mt-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ store.offset + 1 }}</span> to 
            <span class="font-medium">{{ Math.min(store.offset + store.limit, store.total) }}</span> of 
            <span class="font-medium">{{ store.total }}</span> users
          </div>
          <div class="mt-3 sm:mt-0 flex items-center space-x-2">
            <button 
              :disabled="store.offset === 0" 
              @click="prev"
              :class="[
                'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition duration-200',
                store.offset === 0 
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              ]"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </button>
            <button 
              :disabled="(store.offset + store.limit) >= store.total" 
              @click="next"
              :class="[
                'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition duration-200',
                (store.offset + store.limit) >= store.total 
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              ]"
            >
              Next
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- User Details Modal -->
    <UserDetailsModal
      v-if="userDetailsModalOpen"
      :user="selectedUser"
      :loading="userDetailsLoading"
      @close="userDetailsModalOpen = false"
    />

    <!-- User Quota Modal -->
    <UserQuotaModal
      v-if="quotaModalOpen"
      :user-id="selectedUserId"
      @close="quotaModalOpen = false"
      @set="onSetForUser"
      @update="onUpdateForUser"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminUsersStore } from '../../store/adminUsers'
import { useAdminQuotasStore } from '../../store/adminQuotas'
import UserQuotaModal from '../../components/UserQuotaModal.vue'
import UserDetailsModal from '../../components/UserDetailsModal.vue'
import AdminNavbar from '../../components/AdminNavbar.vue'
import { useAuthStore } from '../../store/auth' 

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

const store = useAdminUsersStore()
const quotas = useAdminQuotasStore()

const q = ref('')
const quotaModalOpen = ref(false)
const selectedUserId = ref(null)
const userDetailsModalOpen = ref(false)
const selectedUser = ref(null)
const userDetailsLoading = ref(false)

const users = computed(() => store.users || [])

onMounted(async () => {
  await store.fetchUsers({ limit: 50, offset: 0 })
})

async function search() {
  await store.fetchUsers({ q: q.value, limit: store.limit, offset: 0 })
}

function resetSearch() {
  q.value = ''
  search()
}

function openQuota(userId) {
  selectedUserId.value = userId
  quotaModalOpen.value = true
}

function viewUser(userId) {
  userDetailsLoading.value = true
  userDetailsModalOpen.value = true
  selectedUser.value = null
  
  store.fetchUser(userId)
    .then(u => {
      selectedUser.value = u
    })
    .catch((e) => {
      console.error('Failed to load user:', e)
      // Keep modal open but show error state
      selectedUser.value = { error: e?.response?.data?.detail || e.message }
    })
    .finally(() => {
      userDetailsLoading.value = false
    })
}

function prev() {
  const newOffset = Math.max(0, store.offset - store.limit)
  store.fetchUsers({ q: store.q, limit: store.limit, offset: newOffset })
}

function next() {
  const newOffset = store.offset + store.limit
  store.fetchUsers({ q: store.q, limit: store.limit, offset: newOffset })
}

async function onSetForUser(payload) {
  await quotas.setUserQuota(payload.userId, payload.endpoint, payload.limit)
  await quotas.fetchUserQuotas(payload.userId)
  quotaModalOpen.value = false
}

async function onUpdateForUser(payload) {
  await quotas.updateUserQuota(payload.userId, payload.endpoint, payload.limit)
  await quotas.fetchUserQuotas(payload.userId)
  quotaModalOpen.value = false
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return 'Invalid Date'
  }
}
</script>