<template>
  <!-- Main Container: Wider, softer shadow, and a bit of elevated look -->
  <div class="bg-white rounded-3xl shadow-2xl shadow-indigo-100 overflow-hidden border border-gray-100">

    <!-- Header: Vibrant Gradient with subtle rounded corners -->
    <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
        <!-- Icon uses Lucide for a modern feel (assuming Tailwind ecosystem has similar icons or SVGs) -->
        <svg class="w-7 h-7 mr-3 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        AI-Enhanced Match Analysis
      </h2>
      <p class="text-indigo-200 mt-1 text-sm sm:text-base">Machine Learning + LLM Intelligence</p>
    </div>

    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Match Info: Highlighted banner -->
      <div v-if="matchInfo" class="mb-8 p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-500 shadow-sm">
        <h3 class="text-sm font-semibold text-gray-500 mb-1">Match Details</h3>
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <p class="text-xl font-bold text-gray-800">{{ matchInfo.home_team }} vs {{ matchInfo.away_team }}</p>
          <p class="text-sm text-gray-500 sm:mt-0 mt-1">{{ formatDate(matchInfo.date) }}</p>
        </div>
      </div>

      <!-- LLM Analysis Section -->
      <div v-if="llmAnalysis" class="mb-10 space-y-6">
        
        <!-- Verdict Card: Focus on the key takeaway -->
        <div class="bg-indigo-50 rounded-2xl p-6 border-t-4 border-indigo-500 shadow-md">
          <h3 class="text-xl font-extrabold text-indigo-700 mb-3 flex items-center">
            <svg class="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Expert Verdict
          </h3>
          <p class="text-gray-700 leading-relaxed text-lg font-medium">{{ llmAnalysis.verdict }}</p>
        </div>

        <!-- Explanation Card -->
        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center border-b pb-2">
            <svg class="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            In-Depth Analysis
          </h3>
          <p class="text-gray-600 leading-relaxed mt-4">{{ llmAnalysis.explanation }}</p>
        </div>

        <!-- Confidence and Reason: Compact and aligned -->
        <div class="space-y-4">
          <!-- Confidence Level -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Confidence Level:</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span
                class="px-4 py-1.5 rounded-full text-sm font-bold shadow-sm transition-colors duration-300"
                :class="getConfidenceClass(llmAnalysis.confidence)"
              >
                {{ llmAnalysis.confidence?.toUpperCase() }}
              </span>
            </div>
          </div>

          <!-- Confidence Reason -->
          <div v-if="llmAnalysis.confidence_reason" class="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p class="text-sm text-yellow-800 flex items-start">
              <svg class="flex-shrink-0 w-5 h-5 mr-2 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span class="font-medium">Caveat:</span> {{ llmAnalysis.confidence_reason }}
            </p>
          </div>
        </div>
      </div>

      <!-- Model Predictions Grid: Responsive 3-column layout -->
      <div v-if="modelData" class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <!-- Home Win -->
        <div class="text-center p-6 bg-green-50 rounded-xl border-l-4 border-green-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          <div class="text-4xl font-extrabold text-green-700 mb-2">{{ formatPercentage(modelData.probabilities?.home) }}</div>
          <div class="text-sm font-bold text-green-800 mb-3 uppercase tracking-wider">{{ getTeamName('home') }} Win</div>
          <div class="w-full bg-green-200 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              class="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out"
              :style="`width: ${(modelData.probabilities?.home || 0) * 100}%`"
            ></div>
          </div>
          <div v-if="modelData.edge" class="text-xs font-semibold" :class="modelData.edge.home > 0 ? 'text-green-600' : 'text-red-500'">
            Edge: {{ formatPercentage(modelData.edge.home, true) }}
          </div>
        </div>

        <!-- Draw -->
        <div class="text-center p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          <div class="text-4xl font-extrabold text-yellow-700 mb-2">{{ formatPercentage(modelData.probabilities?.draw) }}</div>
          <div class="text-sm font-bold text-yellow-800 mb-3 uppercase tracking-wider">Draw</div>
          <div class="w-full bg-yellow-200 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              class="bg-yellow-500 h-full rounded-full transition-all duration-1000 ease-out delay-300"
              :style="`width: ${(modelData.probabilities?.draw || 0) * 100}%`"
            ></div>
          </div>
          <div v-if="modelData.edge" class="text-xs font-semibold" :class="modelData.edge.draw > 0 ? 'text-green-600' : 'text-red-500'">
            Edge: {{ formatPercentage(modelData.edge.draw, true) }}
          </div>
        </div>

        <!-- Away Win -->
        <div class="text-center p-6 bg-red-50 rounded-xl border-l-4 border-red-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          <div class="text-4xl font-extrabold text-red-700 mb-2">{{ formatPercentage(modelData.probabilities?.away) }}</div>
          <div class="text-sm font-bold text-red-800 mb-3 uppercase tracking-wider">{{ getTeamName('away') }} Win</div>
          <div class="w-full bg-red-200 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              class="bg-red-500 h-full rounded-full transition-all duration-1000 ease-out delay-500"
              :style="`width: ${(modelData.probabilities?.away || 0) * 100}%`"
            ></div>
          </div>
          <div v-if="modelData.edge" class="text-xs font-semibold" :class="modelData.edge.away > 0 ? 'text-green-600' : 'text-red-500'">
            Edge: {{ formatPercentage(modelData.edge.away, true) }}
          </div>
        </div>
      </div>

      <!-- Chart Preview (Assuming EnrichedChartPreview handles its own styling) -->
      <div v-if="modelData?.probabilities" class="mb-10">
        <EnrichedChartPreview :probs="modelData.probabilities" :teams="{ home: getTeamName('home'), away: getTeamName('away') }" />
      </div>

      <!-- Key Statistics: Responsive 2-column then 4-column layout -->
      <div v-if="features" class="mb-10">
        <h3 class="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Key Match Statistics</h3>
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Stat 1: Expected Goals -->
          <div class="bg-blue-50 p-5 rounded-xl border border-blue-200 hover:shadow-sm">
            <div class="text-sm text-blue-600 font-medium mb-1">Expected Goals (xG)</div>
            <div class="text-3xl font-extrabold text-blue-700">{{ features.total_avg_goals?.toFixed(1) || 'N/A' }}</div>
            <div class="text-xs text-blue-500 mt-1">Combined 5-match avg</div>
          </div>
          <!-- Stat 2: Form Difference -->
          <div class="bg-purple-50 p-5 rounded-xl border border-purple-200 hover:shadow-sm">
            <div class="text-sm text-purple-600 font-medium mb-1">Recent Form Diff</div>
            <div class="text-3xl font-extrabold text-purple-700" :class="features.form_diff > 0 ? 'text-green-700' : 'text-red-700'">{{ formatFormDiff(features.form_diff) }}</div>
            <div class="text-xs text-purple-500 mt-1">Advantage for Home team</div>
          </div>
          <!-- Stat 3: Home Attack -->
          <div class="bg-green-50 p-5 rounded-xl border border-green-200 hover:shadow-sm">
            <div class="text-sm text-green-600 font-medium mb-1">{{ getTeamName('home') }} Shots Avg</div>
            <div class="text-3xl font-extrabold text-green-700">{{ features.home_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
            <div class="text-xs text-green-500 mt-1">Shots on target per game</div>
          </div>
          <!-- Stat 4: Away Attack -->
          <div class="bg-orange-50 p-5 rounded-xl border border-orange-200 hover:shadow-sm">
            <div class="text-sm text-orange-600 font-medium mb-1">{{ getTeamName('away') }} Shots Avg</div>
            <div class="text-3xl font-extrabold text-orange-700">{{ features.away_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
            <div class="text-xs text-orange-500 mt-1">Shots on target per game</div>
          </div>
        </div>
      </div>

      <!-- LLM Suggestions List -->
      <div v-if="llmAnalysis?.suggestions" class="mb-10">
        <h3 class="text-xl font-bold text-gray-800 mb-5 flex items-center">
          <svg class="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Expert Suggestions
        </h3>
        <div class="space-y-4">
          <div
            v-for="(suggestion, index) in llmAnalysis.suggestions"
            :key="index"
            class="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-200"
          >
            <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-extrabold mt-0.5 shadow-md">
              {{ index + 1 }}
            </div>
            <p class="text-green-800 leading-relaxed text-sm">{{ suggestion }}</p>
          </div>
        </div>
      </div>

      <!-- Risks Section List -->
      <div v-if="llmAnalysis?.risks" class="mb-10">
        <h3 class="text-xl font-bold text-gray-800 mb-5 flex items-center">
          <svg class="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Risk Factors & Caveats
        </h3>
        <div class="space-y-4">
          <div
            v-for="(risk, index) in llmAnalysis.risks"
            :key="index"
            class="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border border-red-200"
          >
            <svg class="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p class="text-red-800 leading-relaxed text-sm">{{ risk }}</p>
          </div>
        </div>
      </div>

      <!-- Model Information: Clean footer look, responsive 3-column -->
      <div v-if="modelData?.model_meta" class="bg-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Model Information</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
          <div class="flex flex-col">
            <span class="text-gray-600 font-medium">Model Name:</span>
            <span class="font-bold text-gray-800">{{ getModelDisplayName(modelData) }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-600 font-medium">Training Data:</span>
            <span class="font-bold text-gray-800">{{ modelData.model_meta.n_train?.toLocaleString() || 'N/A' }} matches</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-600 font-medium">Last Updated:</span>
            <span class="font-bold text-gray-800">{{ formatModelDate(modelData.model_meta.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// Assuming EnrichedChartPreview exists in the same directory
import EnrichedChartPreview from './EnrichedChartPreview.vue'

const props = defineProps({
  prediction: {
    type: Object,
    required: true
  }
})

// Local model names mapping
const modelNames = ['Aria-3', 'Aria-2', 'Aria-1']

// --- COMPUTED PROPERTIES ---

const modelData = computed(() => {
  // Use prediction.model if available, otherwise use prediction itself
  return props.prediction?.model || props.prediction
})

const llmAnalysis = computed(() => {
  return props.prediction?.llm_parsed || null
})

const features = computed(() => {
  return modelData.value?.features || null
})

const matchInfo = computed(() => {
  const matchId = modelData.value?.match_id
  if (!matchId) return null

  // Assuming match_id format is 'YYYYMMDD_HOME_AWAY'
  const parts = matchId.split('_')
  if (parts.length < 3) return null

  return {
    date: parts[0],
    home_team: parts[1],
    away_team: parts[2]
  }
})

// --- METHODS ---

// Function to get Aria display name for model
const getModelDisplayName = (modelData) => {
  if (!modelData) return 'Unknown Model'

  // Use model_name for hashing if available
  const identifier = modelData.model_name || modelData.id || 'fallback'

  // Simple deterministic hash function
  const hash = identifier.split('').reduce((a, b) => {
    // eslint-disable-next-line no-bitwise
    a = ((a << 5) - a) + b.charCodeAt(0)
    // eslint-disable-next-line no-bitwise
    return a & a
  }, 0)
  
  const modelIndex = Math.abs(hash) % modelNames.length
  return modelNames[modelIndex]
}

const formatPercentage = (val, showSign = false) => {
  if (val === null || val === undefined) return 'N/A'
  const percentage = (val * 100).toFixed(1) + '%'
  if (showSign && val > 0) return '+' + percentage
  return percentage
}

const formatFormDiff = (val) => {
  if (val === null || val === undefined) return 'N/A'
  return val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  // Convert 'YYYYMMDD' to a Date object if necessary
  const year = dateStr.slice(0, 4)
  const month = dateStr.slice(4, 6)
  const day = dateStr.slice(6, 8)
  const dateObj = new Date(`${year}-${month}-${day}`)
  
  if (isNaN(dateObj)) return dateStr // Return original if invalid

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatModelDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  // Convert 'YYYYMMDD' to 'MM/DD/YYYY'
  const year = dateStr.slice(0, 4)
  const month = dateStr.slice(4, 6)
  const day = dateStr.slice(6, 8)
  return `${month}/${day}/${year}`
}

const getTeamName = (type) => {
  if (!matchInfo.value) return type === 'home' ? 'Home' : 'Away'
  return type === 'home' ? matchInfo.value.home_team : matchInfo.value.away_team
}

const getConfidenceClass = (confidence) => {
  switch (confidence?.toLowerCase()) {
    case 'high':
      return 'bg-green-500 text-white shadow-lg shadow-green-200'
    case 'medium':
      return 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-200'
    case 'low':
      return 'bg-red-500 text-white shadow-lg shadow-red-200'
    default:
      return 'bg-gray-400 text-white'
  }
}
</script>