<template>
  <div class="bg-white rounded-xl p-6 border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
      Probability Distribution
    </h3>

    <!-- Chart Type Selector -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex space-x-2">
        <button 
          @click="chartType = 'bar'"
          :class="chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Bar Chart
        </button>
        <button 
          @click="chartType = 'doughnut'"
          :class="chartType === 'doughnut' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Pie Chart
        </button>
      </div>
      
      <div class="text-sm text-gray-500">
        Hover for details
      </div>
    </div>

    <!-- Chart Container -->
    <div class="relative">
      <canvas 
        ref="chartCanvas" 
        :width="chartType === 'doughnut' ? 300 : 400" 
        :height="chartType === 'doughnut' ? 300 : 250"
        class="max-w-full mx-auto"
      ></canvas>
      
      <!-- Loading Overlay -->
      <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
        <div class="flex items-center space-x-2">
          <svg class="animate-spin w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm text-gray-600">Loading chart...</span>
        </div>
      </div>
    </div>

    <!-- Chart Legend (for mobile) -->
    <div class="mt-6 grid grid-cols-3 gap-3 sm:hidden">
      <div class="text-center p-3 bg-green-50 rounded-lg border border-green-200">
        <div class="w-3 h-3 bg-green-500 rounded mx-auto mb-1"></div>
        <div class="text-xs font-medium text-green-700">{{ teams?.home || 'Home' }}</div>
        <div class="text-sm font-bold text-green-600">{{ formatPercentage(probs.home) }}</div>
      </div>
      <div class="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div class="w-3 h-3 bg-yellow-500 rounded mx-auto mb-1"></div>
        <div class="text-xs font-medium text-yellow-700">Draw</div>
        <div class="text-sm font-bold text-yellow-600">{{ formatPercentage(probs.draw) }}</div>
      </div>
      <div class="text-center p-3 bg-red-50 rounded-lg border border-red-200">
        <div class="w-3 h-3 bg-red-500 rounded mx-auto mb-1"></div>
        <div class="text-xs font-medium text-red-700">{{ teams?.away || 'Away' }}</div>
        <div class="text-sm font-bold text-red-600">{{ formatPercentage(probs.away) }}</div>
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600">Most Likely Outcome:</span>
        <span class="font-semibold" :class="getMostLikelyClass()">
          {{ getMostLikelyOutcome() }} ({{ formatPercentage(getMostLikelyProbability()) }})
        </span>
      </div>
      <div class="flex items-center justify-between text-sm mt-2">
        <span class="text-gray-600">Confidence Level:</span>
        <div class="flex items-center space-x-2">
          <div class="w-20 bg-gray-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-1000 ease-out"
              :class="getConfidenceBarClass()"
              :style="`width: ${getConfidenceLevel()}%`"
            ></div>
          </div>
          <span class="font-semibold text-xs" :class="getConfidenceTextClass()">
            {{ getConfidenceLabel() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  probs: {
    type: Object,
    required: true,
    default: () => ({ home: 0, draw: 0, away: 0 })
  },
  teams: {
    type: Object,
    default: () => ({ home: 'Home', away: 'Away' })
  }
})

const chartCanvas = ref(null)
const chartInstance = ref(null)
const chartType = ref('bar')
const isLoading = ref(true)

// Chart.js will be loaded from CDN
let Chart = null

const colors = {
  home: {
    background: 'rgba(34, 197, 94, 0.8)',
    border: 'rgba(34, 197, 94, 1)',
    hover: 'rgba(34, 197, 94, 0.9)'
  },
  draw: {
    background: 'rgba(245, 158, 11, 0.8)',
    border: 'rgba(245, 158, 11, 1)',
    hover: 'rgba(245, 158, 11, 0.9)'
  },
  away: {
    background: 'rgba(239, 68, 68, 0.8)',
    border: 'rgba(239, 68, 68, 1)',
    hover: 'rgba(239, 68, 68, 0.9)'
  }
}

const formatPercentage = (val) => {
  if (val === null || val === undefined) return '0%'
  return (val * 100).toFixed(1) + '%'
}

const getMostLikelyOutcome = () => {
  const { home, draw, away } = props.probs
  const max = Math.max(home || 0, draw || 0, away || 0)
  
  if (max === home) return props.teams?.home || 'Home Win'
  if (max === away) return props.teams?.away || 'Away Win'
  return 'Draw'
}

const getMostLikelyProbability = () => {
  const { home, draw, away } = props.probs
  return Math.max(home || 0, draw || 0, away || 0)
}

const getMostLikelyClass = () => {
  const { home, draw, away } = props.probs
  const max = Math.max(home || 0, draw || 0, away || 0)
  
  if (max === home) return 'text-green-600'
  if (max === away) return 'text-red-600'
  return 'text-yellow-600'
}

const getConfidenceLevel = () => {
  const max = getMostLikelyProbability()
  return Math.min(max * 100, 100)
}

const getConfidenceLabel = () => {
  const max = getMostLikelyProbability()
  if (max >= 0.6) return 'High'
  if (max >= 0.4) return 'Medium'
  return 'Low'
}

const getConfidenceBarClass = () => {
  const max = getMostLikelyProbability()
  if (max >= 0.6) return 'bg-green-500'
  if (max >= 0.4) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getConfidenceTextClass = () => {
  const max = getMostLikelyProbability()
  if (max >= 0.6) return 'text-green-600'
  if (max >= 0.4) return 'text-yellow-600'
  return 'text-red-600'
}

const loadChartJS = async () => {
  if (window.Chart) {
    Chart = window.Chart
    return
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js'
    script.onload = () => {
      Chart = window.Chart
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const createChart = async () => {
  if (!chartCanvas.value || !Chart) return
  
  // Destroy existing chart
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
  
  const ctx = chartCanvas.value.getContext('2d')
  const { home, draw, away } = props.probs
  
  const data = {
    labels: [props.teams?.home || 'Home Win', 'Draw', props.teams?.away || 'Away Win'],
    datasets: [{
      data: [home || 0, draw || 0, away || 0],
      backgroundColor: [
        colors.home.background,
        colors.draw.background,
        colors.away.background
      ],
      borderColor: [
        colors.home.border,
        colors.draw.border,
        colors.away.border
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        colors.home.hover,
        colors.draw.hover,
        colors.away.hover
      ]
    }]
  }
  
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: chartType.value === 'doughnut',
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const percentage = ((context.raw || 0) * 100).toFixed(1) + '%'
            return `${context.label}: ${percentage}`
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutCubic'
    }
  }
  
  let chartConfig = {
    type: chartType.value,
    data,
    options: commonOptions
  }
  
  if (chartType.value === 'bar') {
    chartConfig.options.scales = {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          callback: function(value) {
            return (value * 100).toFixed(0) + '%'
          },
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 11,
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      }
    }
    chartConfig.options.plugins.legend.display = false
  }
  
  if (chartType.value === 'doughnut') {
    chartConfig.options.cutout = '60%'
    chartConfig.options.plugins.legend.display = true
  }
  
  chartInstance.value = new Chart(ctx, chartConfig)
  isLoading.value = false
}

onMounted(async () => {
  try {
    await loadChartJS()
    await nextTick()
    await createChart()
  } catch (error) {
    console.error('Failed to load Chart.js:', error)
    isLoading.value = false
  }
})

watch(chartType, async () => {
  isLoading.value = true
  await nextTick()
  await createChart()
})

watch(() => props.probs, async () => {
  await nextTick()
  await createChart()
}, { deep: true })

</script>