<template>
  <div class="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto my-8 border border-gray-100">
    <!-- Header -->
    <div class="bg-gradient-to-br from-indigo-700 to-purple-600 p-6 sm:p-8">
      <h2 class="text-3xl font-extrabold text-white flex items-center">
        <svg class="w-7 h-7 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.236-.36.637-.584 1.051-.584s.815.224 1.051.584l1.83 2.793a1.5 1.5 0 001.373.834h3.093c.516 0 .963.34 1.127.834l.87 2.793a1.5 1.5 0 010 1.597l-.87 2.793c-.164.494-.611.834-1.127.834h-3.093a1.5 1.5 0 00-1.373.834l-1.83 2.793c-.236.36-.637.584-1.051.584s-.815-.224-1.051-.584l-1.83-2.793a1.5 1.5 0 00-1.373-.834H5.21c-.516 0-.963-.34-1.127-.834l-.87-2.793a1.5 1.5 0 010-1.597l.87-2.793c.164-.494.611-.834 1.127-.834h3.093a1.5 1.5 0 001.373-.834l1.83-2.793z"/>
        </svg>
        Match Prediction
      </h2>
      <p class="text-indigo-200 mt-1 font-light">Comprehensive analysis powered by {{ getModelDisplayName(prediction) }}</p>
    </div>

    <div class="p-4 sm:p-8">
      <!-- Match Info -->
      <div v-if="matchInfo" class="mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
        <h3 class="text-xl font-bold text-indigo-800 mb-1 flex items-center">
          <span class="truncate">{{ matchInfo.home_team }}</span> 
          <span class="mx-3 text-gray-500 font-normal text-lg">vs</span> 
          <span class="truncate">{{ matchInfo.away_team }}</span>
        </h3>
        <p class="text-sm text-indigo-600 font-medium mt-1">{{ formatDate(matchInfo.date) }}</p>
      </div>

      <!-- Main Probabilities - Grid layout for all devices -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        <!-- Home Win -->
        <div class="text-center p-6 bg-emerald-50 rounded-xl border-2 border-emerald-300 transform hover:scale-[1.02] transition duration-300 shadow-md">
          <div class="text-4xl font-extrabold text-emerald-600 mb-3">{{ formatPercentage(probs.home) }}</div>
          <div class="text-sm uppercase tracking-wider font-bold text-emerald-700 mb-2">{{ matchInfo?.home_team || 'Home' }} Win</div>
          <div class="w-full bg-emerald-200 rounded-full h-2.5">
            <div 
              class="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 shadow-inner" 
              :style="`width: ${probs.home * 100}%`">
            </div>
          </div>
        </div>

        <!-- Draw -->
        <div class="text-center p-6 bg-amber-50 rounded-xl border-2 border-amber-300 transform hover:scale-[1.02] transition duration-300 shadow-md">
          <div class="text-4xl font-extrabold text-amber-600 mb-3">{{ formatPercentage(probs.draw) }}</div>
          <div class="text-sm uppercase tracking-wider font-bold text-amber-700 mb-2">Draw</div>
          <div class="w-full bg-amber-200 rounded-full h-2.5">
            <div 
              class="bg-amber-500 h-2.5 rounded-full transition-all duration-1000 shadow-inner" 
              :style="`width: ${probs.draw * 100}%`">
            </div>
          </div>
        </div>

        <!-- Away Win -->
        <div class="text-center p-6 bg-rose-50 rounded-xl border-2 border-rose-300 transform hover:scale-[1.02] transition duration-300 shadow-md">
          <div class="text-4xl font-extrabold text-rose-600 mb-3">{{ formatPercentage(probs.away) }}</div>
          <div class="text-sm uppercase tracking-wider font-bold text-rose-700 mb-2">{{ matchInfo?.away_team || 'Away' }} Win</div>
          <div class="w-full bg-rose-200 rounded-full h-2.5">
            <div 
              class="bg-rose-500 h-2.5 rounded-full transition-all duration-1000 shadow-inner" 
              :style="`width: ${probs.away * 100}%`">
            </div>
          </div>
        </div>
      </div>

      <!-- Key Stats -->
      <div v-if="features" class="mb-10">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Key Match Statistics</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm text-center">
            <div class="text-sm text-blue-700 font-semibold mb-1">Expected Goals (xG)</div>
            <div class="text-3xl font-extrabold text-blue-800">{{ features.total_avg_goals?.toFixed(2) || 'N/A' }}</div>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg border border-purple-200 shadow-sm text-center">
            <div class="text-sm text-purple-700 font-semibold mb-1">Recent Form Diff</div>
            <div class="text-3xl font-extrabold text-purple-800">{{ features.form_diff?.toFixed(2) || 'N/A' }}</div>
          </div>
          <div class="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm text-center">
            <div class="text-sm text-green-700 font-semibold mb-1">{{ matchInfo?.home_team || 'Home' }} Shots Avg</div>
            <div class="text-3xl font-extrabold text-green-800">{{ features.home_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg border border-orange-200 shadow-sm text-center">
            <div class="text-sm text-orange-700 font-semibold mb-1">{{ matchInfo?.away_team || 'Away' }} Shots Avg</div>
            <div class="text-3xl font-extrabold text-orange-800">{{ features.away_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
          </div>
        </div>
      </div>

      <!-- Betting Edge -->
      <div v-if="edge" class="mb-10">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Value Analysis (Edge)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div class="p-5 rounded-xl border-2 transition duration-300" 
               :class="edge.home > 0 ? 'bg-emerald-100 border-emerald-400 shadow-inner' : 'bg-red-100 border-red-400 shadow-inner'">
            <div class="flex items-center justify-between">
              <span class="text-base font-semibold text-gray-700">{{ matchInfo?.home_team || 'Home' }} Edge</span>
              <span :class="edge.home > 0 ? 'text-emerald-700' : 'text-red-700'" class="font-extrabold text-xl">
                {{ edge.home > 0 ? '+' : '' }}{{ formatPercentage(edge.home) }}
              </span>
            </div>
          </div>
          <div class="p-5 rounded-xl border-2 transition duration-300" 
               :class="edge.draw > 0 ? 'bg-emerald-100 border-emerald-400 shadow-inner' : 'bg-red-100 border-red-400 shadow-inner'">
            <div class="flex items-center justify-between">
              <span class="text-base font-semibold text-gray-700">Draw Edge</span>
              <span :class="edge.draw > 0 ? 'text-emerald-700' : 'text-red-700'" class="font-extrabold text-xl">
                {{ edge.draw > 0 ? '+' : '' }}{{ formatPercentage(edge.draw) }}
              </span>
            </div>
          </div>
          <div class="p-5 rounded-xl border-2 transition duration-300" 
               :class="edge.away > 0 ? 'bg-emerald-100 border-emerald-400 shadow-inner' : 'bg-red-100 border-red-400 shadow-inner'">
            <div class="flex items-center justify-between">
              <span class="text-base font-semibold text-gray-700">{{ matchInfo?.away_team || 'Away' }} Edge</span>
              <span :class="edge.away > 0 ? 'text-emerald-700' : 'text-red-700'" class="font-extrabold text-xl">
                {{ edge.away > 0 ? '+' : '' }}{{ formatPercentage(edge.away) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Info -->
      <div v-if="meta" class="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h3 class="text-lg font-bold text-gray-800 mb-3">System Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="truncate">
            <span class="text-gray-500 font-medium">Model:</span>
            <span class="ml-2 font-semibold text-gray-800">{{ getModelDisplayName(prediction) }} ({{ getModelType(prediction) }})</span>
          </div>
          <div class="truncate">
            <span class="text-gray-500 font-medium">Training Data:</span>
            <span class="ml-2 font-semibold text-gray-800">{{ meta.n_train?.toLocaleString() || 'N/A' }} matches</span>
          </div>
          <div class="truncate">
            <span class="text-gray-500 font-medium">Last Updated:</span>
            <span class="ml-2 font-semibold text-gray-800">{{ formatModelDate(meta.created_at) }}</span>
          </div>
        </div>
      </div>

      <!-- Chart Preview -->
      <div class="mt-8">
        <ChartPreview :probs="probs" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChartPreview from './ChartPreview.vue'

const props = defineProps({
  prediction: {
    type: Object,
    required: true
  }
})

// Local model names mapping
const modelNames = ['Aria-3', 'Aria-2', 'Aria-1']

// Model type formatting methods
const formatModelType = (modelType) => {
  if (!modelType) return 'N/A'
  return modelType.toUpperCase()
}

const getModelType = (modelData) => {
  const modelType = modelData?.model_meta?.model_type || modelData?.model_type
  return formatModelType(modelType)
}

// Function to get Aria display name for model
const getModelDisplayName = (prediction) => {
  if (!prediction) return 'Unknown Model'
  
  // Try to get model data from different possible locations
  const modelData = prediction.model || prediction
  
  // Option 1: If you have model ID
  if (modelData?.id) {
    const modelIndex = (modelData.id - 1) % modelNames.length
    return modelNames[modelIndex] || `Aria-${modelIndex + 1}`
  }
  
  // Option 2: If you have model_name, create consistent hash
  if (modelData?.model_name) {
    const hash = modelData.model_name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const modelIndex = Math.abs(hash) % modelNames.length
    return modelNames[modelIndex]
  }
  
  // Option 3: If you have prediction ID, use that
  if (prediction.id) {
    const modelIndex = (prediction.id - 1) % modelNames.length
    return modelNames[modelIndex] || `Aria-${modelIndex + 1}`
  }
  
  // Option 4: Fallback to first model name
  return modelNames[0]
}

const probs = computed(() => {
  return props.prediction?.probabilities || {}
})

const features = computed(() => {
  return props.prediction?.features || null
})

const edge = computed(() => {
  return props.prediction?.edge || null
})

const meta = computed(() => {
  return props.prediction?.model_meta || null
})

const matchInfo = computed(() => {
  const matchId = props.prediction?.match_id
  if (!matchId) return null
  
  // Example match_id format: "20231027_ManUtd_ManCity"
  const parts = matchId.split('_')
  return {
    date: parts[0],
    home_team: parts[1],
    away_team: parts[2]
  }
})

const formatPercentage = (val) => {
  if (val === null || val === undefined) return 'N/A'
  // Ensures val is a number before multiplication
  const numVal = typeof val === 'number' ? val : 0;
  return (numVal * 100).toFixed(1) + '%'
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  try {
    // Attempt to parse YYYYMMDD string
    const year = dateStr.slice(0, 4)
    const month = dateStr.slice(4, 6)
    const day = dateStr.slice(6, 8)
    const date = new Date(`${year}-${month}-${day}`)

    if (isNaN(date)) throw new Error('Invalid Date')

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateStr // return original string if parsing fails
  }
}

const formatModelDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  try {
    // Format from YYYYMMDD_HHMMSS
    const [datePart] = dateStr.split('_');
    const year = datePart.slice(0, 4)
    const month = datePart.slice(4, 6)
    const day = datePart.slice(6, 8)
    return new Date(`${year}-${month}-${day}`).toLocaleDateString()
  } catch {
    return dateStr
  }
}
</script>