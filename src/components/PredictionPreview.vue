<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <h2 class="text-2xl font-bold text-white flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        Match Prediction Results
      </h2>
      <p class="text-blue-100 mt-1">AI-powered football match analysis</p>
    </div>

    <div class="p-8">
      <!-- Match Info -->
      <div v-if="matchInfo" class="mb-8 p-4 bg-gray-50 rounded-xl">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Match Details</h3>
        <p class="text-gray-600">{{ matchInfo.home_team }} vs {{ matchInfo.away_team }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(matchInfo.date) }}</p>
      </div>

      <!-- Main Predictions -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <!-- Home Win -->
        <div class="text-center p-6 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ formatPercentage(probs.home) }}</div>
          <div class="text-sm font-semibold text-green-700 mb-1">Home Win</div>
          <div class="w-full bg-green-200 rounded-full h-2">
            <div class="bg-green-500 h-2 rounded-full transition-all duration-700" :style="`width: ${probs.home * 100}%`"></div>
          </div>
        </div>

        <!-- Draw -->
        <div class="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-100 hover:shadow-md transition-shadow">
          <div class="text-3xl font-bold text-yellow-600 mb-2">{{ formatPercentage(probs.draw) }}</div>
          <div class="text-sm font-semibold text-yellow-700 mb-1">Draw</div>
          <div class="w-full bg-yellow-200 rounded-full h-2">
            <div class="bg-yellow-500 h-2 rounded-full transition-all duration-700" :style="`width: ${probs.draw * 100}%`"></div>
          </div>
        </div>

        <!-- Away Win -->
        <div class="text-center p-6 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition-shadow">
          <div class="text-3xl font-bold text-red-600 mb-2">{{ formatPercentage(probs.away) }}</div>
          <div class="text-sm font-semibold text-red-700 mb-1">Away Win</div>
          <div class="w-full bg-red-200 rounded-full h-2">
            <div class="bg-red-500 h-2 rounded-full transition-all duration-700" :style="`width: ${probs.away * 100}%`"></div>
          </div>
        </div>
      </div>

      <!-- Key Stats -->
      <div v-if="features" class="mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Match Statistics</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="text-sm text-blue-600 font-medium">Expected Goals</div>
            <div class="text-2xl font-bold text-blue-700">{{ features.total_avg_goals?.toFixed(1) || 'N/A' }}</div>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <div class="text-sm text-purple-600 font-medium">Form Difference</div>
            <div class="text-2xl font-bold text-purple-700">{{ features.form_diff?.toFixed(2) || 'N/A' }}</div>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <div class="text-sm text-green-600 font-medium">Home Shots Avg</div>
            <div class="text-2xl font-bold text-green-700">{{ features.home_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <div class="text-sm text-orange-600 font-medium">Away Shots Avg</div>
            <div class="text-2xl font-bold text-orange-700">{{ features.away_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
          </div>
        </div>
      </div>

      <!-- Betting Edge -->
      <div v-if="edge" class="mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Value Analysis</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg" :class="edge.home > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-600">Home Edge</span>
              <span :class="edge.home > 0 ? 'text-green-600' : 'text-red-600'" class="font-bold">
                {{ edge.home > 0 ? '+' : '' }}{{ formatPercentage(edge.home) }}
              </span>
            </div>
          </div>
          <div class="p-4 rounded-lg" :class="edge.draw > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-600">Draw Edge</span>
              <span :class="edge.draw > 0 ? 'text-green-600' : 'text-red-600'" class="font-bold">
                {{ edge.draw > 0 ? '+' : '' }}{{ formatPercentage(edge.draw) }}
              </span>
            </div>
          </div>
          <div class="p-4 rounded-lg" :class="edge.away > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-600">Away Edge</span>
              <span :class="edge.away > 0 ? 'text-green-600' : 'text-red-600'" class="font-bold">
                {{ edge.away > 0 ? '+' : '' }}{{ formatPercentage(edge.away) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Info -->
      <div v-if="meta" class="bg-gray-50 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Model Information</h3>
        <div class="grid md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="text-gray-600">Model Name:</span>
          <span class="ml-2 font-medium text-gray-800">{{ getModelDisplayName(prediction) }}</span>
        </div>
          <div>
            <span class="text-gray-600">Training Data:</span>
            <span class="ml-2 font-medium text-gray-800">{{ meta.n_train?.toLocaleString() || 'N/A' }} matches</span>
          </div>
          <div>
            <span class="text-gray-600">Last Updated:</span>
            <span class="ml-2 font-medium text-gray-800">{{ formatModelDate(meta.created_at) }}</span>
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
const modelNames = ['Aria-1', 'Aria-2', 'Aria-3']

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
  
  const parts = matchId.split('_')
  return {
    date: parts[0],
    home_team: parts[1],
    away_team: parts[2]
  }
})

const formatPercentage = (val) => {
  if (val === null || val === undefined) return 'N/A'
  return (val * 100).toFixed(1) + '%'
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatModelDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  // Format from YYYYMMDD_HHMMSS to readable date
  const year = dateStr.slice(0, 4)
  const month = dateStr.slice(4, 6)
  const day = dateStr.slice(6, 8)
  return new Date(`${year}-${month}-${day}`).toLocaleDateString()
}
</script>