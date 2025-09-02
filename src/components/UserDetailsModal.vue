<!-- src/components/UserDetailsModal.vue -->
<template>
  <!-- Modal Overlay -->
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50" @click="$emit('close')">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <!-- Modal Content -->
        <div 
          class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="bg-white px-6 pt-6 pb-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                  {{ userInitial }}
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900">User Details</h3>
                  <p v-if="!loading && user && !user.error" class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
              <button
                @click="$emit('close')"
                class="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="px-6 py-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p class="mt-4 text-gray-600">Loading user details...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="user && user.error" class="text-center py-12">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-medium text-gray-900">Failed to load user</h3>
              <p class="mt-2 text-sm text-gray-500">{{ user.error }}</p>
            </div>

            <!-- User Details -->
            <div v-else-if="user" class="space-y-6">
              <!-- Basic Information -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Basic Information
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                    <div class="flex items-center space-x-2">
                      <code class="text-sm bg-white px-3 py-2 rounded border font-mono">{{ user.id }}</code>
                      <button
                        @click="copyToClipboard(user.id)"
                        class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy to clipboard"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Username</label>
                    <p class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{{ user.username || 'Not set' }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{{ user.email }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Role</label>
                    <span 
                      :class="user.is_admin ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-gray-100 text-gray-800 border-gray-200'"
                      class="inline-flex px-3 py-1 text-sm font-medium rounded border"
                    >
                      {{ user.is_admin ? 'Administrator' : 'Regular User' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Account Status -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Account Status
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Created</label>
                    <p class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{{ formatDate(user.created_at) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Last Updated</label>
                    <p class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{{ formatDate(user.updated_at) }}</p>
                  </div>
                  <div v-if="user.last_login">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Last Login</label>
                    <p class="text-sm text-gray-900 bg-white px-3 py-2 rounded border">{{ formatDate(user.last_login) }}</p>
                  </div>
                  <div v-if="user.status">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Status</label>
                    <span 
                      :class="getStatusColor(user.status)"
                      class="inline-flex px-3 py-1 text-sm font-medium rounded border"
                    >
                      {{ user.status }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Additional Info -->
              <div v-if="user.profile || user.preferences" class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Additional Information
                </h4>
                <div class="space-y-3">
                  <div v-if="user.profile">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Profile</label>
                    <pre class="text-sm text-gray-900 bg-white px-3 py-2 rounded border overflow-x-auto">{{ JSON.stringify(user.profile, null, 2) }}</pre>
                  </div>
                  <div v-if="user.preferences">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Preferences</label>
                    <pre class="text-sm text-gray-900 bg-white px-3 py-2 rounded border overflow-x-auto">{{ JSON.stringify(user.preferences, null, 2) }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <div class="text-sm text-gray-500">
              User information as of {{ new Date().toLocaleString() }}
            </div>
            <div class="flex space-x-3">
              <button
                @click="$emit('close')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                Close
              </button>
              <button
                v-if="user && !user.error"
                @click="openQuotaManagement"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Manage Quotas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: Object,
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'openQuota'])

const userInitial = computed(() => {
  if (props.loading || !props.user) return '?'
  if (props.user.error) return '!'
  return (props.user.username || props.user.email || 'U').charAt(0).toUpperCase()
})

function formatDate(dateString) {
  if (!dateString) return 'Not available'
  try {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Invalid Date'
  }
}

function getStatusColor(status) {
  const statusLower = status?.toLowerCase() || ''
  if (statusLower === 'active') return 'bg-green-100 text-green-800 border-green-200'
  if (statusLower === 'inactive' || statusLower === 'suspended') return 'bg-red-100 text-red-800 border-red-200'
  if (statusLower === 'pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-gray-100 text-gray-800 border-gray-200'
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
    console.log('Copied to clipboard:', text)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

function openQuotaManagement() {
  emit('openQuota', props.user.id)
  emit('close')
}
</script>