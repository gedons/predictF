<template>
  <div class="bg-white p-6 rounded-xl border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Probability Visualization</h3>
    
    <!-- Bar Chart -->
    <div class="space-y-4">
      <!-- Home -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Home Win</span>
          <span class="text-sm font-bold text-green-600">{{ formatPercent(probs.home) }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div 
            class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
            :style="{ width: `${(probs.home || 0) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Draw -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Draw</span>
          <span class="text-sm font-bold text-yellow-600">{{ formatPercent(probs.draw) }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div 
            class="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-1000 ease-out delay-200 shadow-sm"
            :style="{ width: `${(probs.draw || 0) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Away -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Away Win</span>
          <span class="text-sm font-bold text-red-600">{{ formatPercent(probs.away) }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div 
            class="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1000 ease-out delay-400 shadow-sm"
            :style="{ width: `${(probs.away || 0) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Pie Chart Alternative -->
    <div class="mt-8">
      <h4 class="text-md font-medium text-gray-700 mb-4">Distribution</h4>
      <div class="flex items-center justify-center">
        <div class="relative w-32 h-32">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              stroke-width="8"
            />
            
            <!-- Home segment -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              stroke-width="8"
              stroke-dasharray="251.2"
              :stroke-dashoffset="251.2 - (homeCircumference)"
              class="transition-all duration-1000 ease-out"
            />
            
            <!-- Draw segment -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f59e0b"
              stroke-width="8"
              stroke-dasharray="251.2"
              :stroke-dashoffset="251.2 - (homeCircumference + drawCircumference)"
              class="transition-all duration-1000 ease-out delay-300"
            />
            
            <!-- Away segment -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#ef4444"
              stroke-width="8"
              stroke-dasharray="251.2"
              :stroke-dashoffset="251.2 - (homeCircumference + drawCircumference + awayCircumference)"
              class="transition-all duration-1000 ease-out delay-600"
            />
          </svg>
          
          <!-- Center text -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="text-xs text-gray-500">Total</div>
              <div class="text-lg font-bold text-gray-700">100%</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="flex items-center justify-center space-x-4 mt-4">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span class="text-xs text-gray-600">Home</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span class="text-xs text-gray-600">Draw</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span class="text-xs text-gray-600">Away</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  probs: {
    type: Object,
    default: () => ({})
  }
})

const formatPercent = (val) => {
  if (val === null || val === undefined) return '0.0%'
  return (val * 100).toFixed(1) + '%'
}

// Circumference calculations for pie chart
const totalCircumference = 251.2 // 2 * π * radius (40)

const homeCircumference = computed(() => {
  return totalCircumference * (props.probs.home || 0)
})

const drawCircumference = computed(() => {
  return totalCircumference * (props.probs.draw || 0)
})

const awayCircumference = computed(() => {
  return totalCircumference * (props.probs.away || 0)
})
</script>