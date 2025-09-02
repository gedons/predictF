<template>
   <AdminNavbar 
          :user-name="currentUser.name"
          :user-email="currentUser.email" 
          :notification-count="unreadNotifications"
    />
  <div class="min-h-screen bg-gray-50 p-4 lg:p-8">       
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quotas Management</h1>
        <p class="text-gray-600">Manage default quotas and user-specific quota allocations</p>
      </div>

      <!-- Default Quotas Section -->
      <section class="mb-10">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.718-2.462c-.568-.348-1.237-.518-1.907-.518-1.92 0-3.44 1.556-3.44 3.476v1.008c0 .685.178 1.36.52 1.965l2.148 3.811c.151.268.432.432.74.432.308 0 .588-.164.74-.432l2.148-3.811c.342-.605.52-1.28.52-1.965v-1.008c0-1.92-1.52-3.476-3.44-3.476-.67 0-1.339.17-1.907.518z"></path>
              </svg>
              Default Quotas
            </h2>
            <p class="text-sm text-gray-600 mt-1">System-wide default quota limits for all endpoints</p>
          </div>

          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Endpoint</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Limit</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="(limit, endpoint) in defaultsEntries" :key="endpoint" class="hover:bg-gray-25">
                    <td class="py-3 px-4">
                      <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{{ endpoint }}</code>
                    </td>
                    <td class="py-3 px-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {{ limit ?? 'N/A' }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="defaultsEntries.length === 0">
                    <td colspan="2" class="py-8 px-4 text-center text-gray-500">
                      <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      No default quotas configured
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <GrantDefaultForm @granted="onGrantDefault" />
          </div>
        </div>
      </section>

      <!-- User Quotas Section -->
      <section>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50 flex justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                </svg>
                User Quotas
              </h2>
              <p class="text-sm text-gray-600 mt-1">Recent user-specific quota assignments</p>
            </div>
            <button 
              @click="openUserSearchModal" 
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Search & Manage Users
            </button>
          </div>

          <div class="p-6">
            <!-- Loading and Error States -->
            <div v-if="store.loading" class="flex items-center justify-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span class="ml-3 text-gray-600">Loading quotas...</span>
            </div>

            <div v-if="store.error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-red-800 font-medium">Error: {{ store.error }}</span>
              </div>
            </div>

            <!-- User Quotas Grid -->
            <div v-if="!store.loading && store.userQuotasSample.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div 
                v-for="q in store.userQuotasSample" 
                :key="q.user_id + '-' + q.endpoint" 
                class="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:border-gray-300"
              >
                <!-- User & Endpoint Info -->
                <div class="mb-4">
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1 min-w-0">
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">User</div>
                      <div class="font-semibold text-gray-900 truncate">{{ q.user_id }}</div>
                    </div>
                    <div class="ml-4 text-right flex-shrink-0">
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Endpoint</div>
                      <code class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono">{{ q.endpoint }}</code>
                    </div>
                  </div>
                </div>

                <!-- Quota Metrics -->
                <div class="mb-4 p-3 bg-white rounded-lg border border-gray-100">
                  <div class="flex justify-between items-center text-sm">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span class="text-gray-600">Limit:</span>
                      <span class="font-semibold text-gray-900 ml-1">{{ q.limit ?? 'N/A' }}</span>
                    </div>
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span class="text-gray-600">Remaining:</span>
                      <span class="font-semibold text-gray-900 ml-1">{{ q.remaining ?? 'N/A' }}</span>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div v-if="q.limit && q.remaining !== null" class="mt-3">
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

                <!-- Action Buttons -->
                <div class="flex gap-2">
                  <button 
                    @click="openUserModal(q.user_id)" 
                    class="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                    </svg>
                    Manage
                  </button>
                  <button 
                    @click="resetQuota(q.user_id, q.endpoint)" 
                    class="px-3 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>
                  <button 
                    @click="deleteQuota(q.user_id, q.endpoint)" 
                    class="px-3 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!store.loading && store.userQuotasSample.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No User Quotas Found</h3>
              <p class="text-gray-600 mb-6">Get started by assigning quotas to users</p>
              <button 
                @click="openUserSearchModal"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add User Quota
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal -->
    <UserQuotaModal 
      v-if="modalOpen" 
      :user-id="modalUserId" 
      @close="modalOpen = false" 
      @set="onSetForUser" 
      @update="onUpdateForUser" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminQuotasStore } from '../../store/adminQuotas'
import GrantDefaultForm from '../../components/GrantDefaultForm.vue'
import UserQuotaModal from '../../components/UserQuotaModal.vue'
import AdminNavbar from '../../components/AdminNavbar.vue'
import { useAuthStore } from '../../store/auth' 

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)
const unreadNotifications = computed(() => authStore.notificationCount)

const store = useAdminQuotasStore()
const modalOpen = ref(false)
const modalUserId = ref(null)

const defaultsEntries = computed(() => {
  return Object.entries(store.defaults || {})
})

onMounted(async () => {
  try {
    await store.fetchAll()
  } catch (e) {
    console.error('Failed to fetch quotas:', e)
  }
})

function openUserModal(userId) {
  modalUserId.value = userId
  modalOpen.value = true
}

function openUserSearchModal() {
  modalUserId.value = null
  modalOpen.value = true
}

async function deleteQuota(userId, endpoint) {
  if (!confirm('Delete this user endpoint quota?')) return
  try {
    await store.deleteUserEndpointQuota(userId, endpoint)
    alert('Deleted')
    await store.fetchAll()
  } catch (e) {
    alert('Error: ' + (e?.response?.data?.detail || e.message))
  }
}

async function resetQuota(userId, endpoint = null) {
  try {
    await store.resetUserQuotas(userId, endpoint)
    alert('Reset done')
    await store.fetchAll()
  } catch (e) {
    alert('Error: ' + (e?.response?.data?.detail || e.message))
  }
}

function onGrantDefault() {
  store.fetchAll()
}

async function onSetForUser(payload) {
  try {
    await store.setUserQuota(payload.userId, payload.endpoint, payload.limit)
    modalOpen.value = false
    await store.fetchAll()
  } catch (e) {
    alert('Error setting quota: ' + (e?.response?.data?.detail || e.message))
  }
}

async function onUpdateForUser(payload) {
  try {
    await store.updateUserQuota(payload.userId, payload.endpoint, payload.limit)
    modalOpen.value = false
    await store.fetchAll()
  } catch (e) {
    alert('Error updating quota: ' + (e?.response?.data?.detail || e.message))
  }
}
</script>
