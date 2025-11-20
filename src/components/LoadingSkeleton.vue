<template>
  <div class="animate-pulse">
    <div v-if="type === 'card'" class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
    
    <div v-else-if="type === 'table'" class="space-y-3">
      <div v-for="i in rows" :key="i" class="flex space-x-4">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
      </div>
    </div>
    
    <div v-else-if="type === 'text'" class="space-y-2">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
    </div>
    
    <div v-else class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'card', 'table', 'text'].includes(value)
  },
  rows: {
    type: Number,
    default: 3
  }
})
</script>
