<template>
  <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
    <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-4 border-gray-100">
      <svg class="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
      Probability Distribution
    </h3>

    <!-- Chart Type Selector -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex space-x-2 p-1 bg-gray-100 rounded-lg">
        <button 
          @click="chartType = 'bar'"
          :class="chartType === 'bar' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-[1.02]"
        >
          Bar Chart
        </button>
        <button 
          @click="chartType = 'doughnut'"
          :class="chartType === 'doughnut' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-[1.02]"
        >
          Doughnut Chart
        </button>
      </div>
      
      <div class="text-sm text-gray-500 hidden sm:block">
        Hover segments for probability details
      </div>
    </div>

    <!-- Chart Container -->
    <div class="relative min-h-[250px] flex items-center justify-center">
      <canvas 
        ref="chartCanvas" 
        :width="chartType === 'doughnut' ? 300 : 400" 
        :height="chartType === 'doughnut' ? 300 : 250"
        class="max-w-full mx-auto"
      ></canvas>
      
      <!-- Loading Overlay -->
      <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg transition-opacity duration-300">
        <div class="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-xl">
          <svg class="animate-spin w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-base text-gray-700 font-medium">Rendering chart...</span>
        </div>
      </div>
    </div>

    <!-- Chart Legend (for mobile only, as Chart.js handles it for doughnut on desktop) -->
    <div v-if="chartType === 'bar'" class="mt-6 grid grid-cols-3 gap-4 border-t pt-4 border-gray-100">
      <div class="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
        <div class="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-1"></div>
        <div class="text-xs font-medium text-emerald-700 truncate">{{ teams?.home || 'Home' }}</div>
        <div class="text-sm font-bold text-emerald-600">{{ formatPercentage(probs.home) }}</div>
      </div>
      <div class="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
        <div class="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-1"></div>
        <div class="text-xs font-medium text-amber-700">Draw</div>
        <div class="text-sm font-bold text-amber-600">{{ formatPercentage(probs.draw) }}</div>
      </div>
      <div class="text-center p-3 bg-rose-50 rounded-lg border border-rose-200">
        <div class="w-3 h-3 bg-rose-500 rounded-full mx-auto mb-1"></div>
        <div class="text-xs font-medium text-rose-700 truncate">{{ teams?.away || 'Away' }}</div>
        <div class="text-sm font-bold text-rose-600">{{ formatPercentage(probs.away) }}</div>
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="mt-8 p-5 bg-indigo-50 rounded-xl border border-indigo-200">
      <div class="flex items-center justify-between text-base">
        <span class="text-indigo-800 font-semibold">Most Likely Outcome:</span>
        <span class="font-extrabold" :class="getMostLikelyClass()">
          {{ getMostLikelyOutcome() }} ({{ formatPercentage(getMostLikelyProbability()) }})
        </span>
      </div>
      <div class="flex items-center justify-between text-sm mt-3 pt-3 border-t border-indigo-200">
        <span class="text-indigo-700">Confidence Level:</span>
        <div class="flex items-center space-x-2">
          <div class="w-24 bg-indigo-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-1000 ease-out shadow-md"
              :class="getConfidenceBarClass()"
              :style="`width: ${getConfidenceLevel()}%`"
            ></div>
          </div>
          <span class="font-bold text-sm w-12 text-right" :class="getConfidenceTextClass()">
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

// Use richer, solid colors
const colors = {
  home: {
    background: 'rgba(16, 185, 129, 1)', // Emerald 500
    border: 'rgba(5, 150, 105, 1)',   // Emerald 600
    hover: 'rgba(5, 150, 105, 0.9)'
  },
  draw: {
    background: 'rgba(245, 158, 11, 1)', // Amber 500
    border: 'rgba(217, 119, 6, 1)',    // Amber 600
    hover: 'rgba(217, 119, 6, 0.9)'
  },
  away: {
    background: 'rgba(244, 63, 94, 1)',  // Rose 500
    border: 'rgba(225, 29, 72, 1)',    // Rose 600
    hover: 'rgba(225, 29, 72, 0.9)'
  }
}

const formatPercentage = (val) => {
  if (val === null || val === undefined) return '0%'
  return (val * 100).toFixed(1) + '%'
}

// --- Utility functions for summary stats (left unchanged) ---
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
  
  if (max === home) return 'text-emerald-600'
  if (max === away) return 'text-rose-600'
  return 'text-amber-600'
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
  if (max >= 0.6) return 'bg-emerald-500'
  if (max >= 0.4) return 'bg-amber-500'
  return 'bg-rose-500'
}

const getConfidenceTextClass = () => {
  const max = getMostLikelyProbability()
  if (max >= 0.6) return 'text-emerald-600'
  if (max >= 0.4) return 'text-amber-600'
  return 'text-rose-600'
}
// -----------------------------------------------------------


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
      borderWidth: 1.5, // Slightly thinner border for cleanliness
      // Apply rounded corners specifically for the bar chart type
      ...(chartType.value === 'bar' ? { borderRadius: 6 } : {}),
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
    // Global font styling
    font: {
      family: 'Inter, sans-serif',
      weight: '500',
      color: '#4b5563' // gray-600 for general text
    },
    plugins: {
      legend: {
        display: chartType.value === 'doughnut',
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#4b5563', // gray-600
          font: {
            size: 13,
            weight: '600' // slightly bolder legend text
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
        // Enhanced tooltip styling
        backgroundColor: '#1f2937', // dark gray for contrast
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        borderColor: '#374151',
        borderWidth: 1
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' // Smoother transition
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
        // Cleaner Y-axis grid
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          borderDash: [5, 5], // Dashed lines
          drawBorder: false, // Hide the main axis line
        },
        ticks: {
          callback: function(value) {
            return (value * 100).toFixed(0) + '%'
          },
          color: '#6b7280', // gray-500 for ticks
          font: {
            size: 11
          }
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false, // Hide the main axis line
        },
        ticks: {
          color: '#4b5563', // gray-600 for category labels
          font: {
            size: 12,
            weight: '600' // bolder category labels
          }
        },
      }
    }
    chartConfig.options.plugins.legend.display = false
  }
  
  if (chartType.value === 'doughnut') {
    chartConfig.options.cutout = '65%' // Slightly larger cutout
    chartConfig.options.plugins.legend.display = true
  }
  
  chartInstance.value = new Chart(ctx, chartConfig)
  isLoading.value = false
}

onMounted(async () => {
  try {
    await loadChartJS()
    await nextTick()
    // Simulate a brief loading state for the animation to look nice
    setTimeout(async () => {
      await createChart()
    }, 200) 
  } catch (error) {
    console.error('Failed to load Chart.js:', error)
    isLoading.value = false
  }
})

watch(chartType, async () => {
  isLoading.value = true
  await nextTick()
  // Simulate a brief loading state for the animation to look nice
  setTimeout(async () => {
      await createChart()
  }, 100)
})

watch(() => props.probs, async () => {
  isLoading.value = true
  await nextTick()
  // Simulate a brief loading state for the animation to look nice
  setTimeout(async () => {
      await createChart()
  }, 100)
}, { deep: true })

</script>