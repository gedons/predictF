<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <h2 class="text-2xl font-bold text-white flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
        AI-Enhanced Match Analysis
      </h2>
      <p class="text-blue-100 mt-1">Machine Learning + LLM Intelligence</p>
    </div>

    <div class="p-8">
      <!-- Match Info -->
      <div v-if="matchInfo" class="mb-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Match Details</h3>
        <div class="flex items-center justify-between">
          <p class="text-gray-600 font-medium">{{ matchInfo.home_team }} vs {{ matchInfo.away_team }}</p>
          <p class="text-sm text-gray-500">{{ formatDate(matchInfo.date) }}</p>
        </div>
      </div>

      <!-- LLM Analysis Section -->
      <div v-if="llmAnalysis" class="mb-8 space-y-6">
        <!-- Verdict -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <h3 class="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Expert Verdict
          </h3>
          <p class="text-gray-700 leading-relaxed">{{ llmAnalysis.verdict }}</p>
        </div>

        <!-- Explanation -->
        <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 class="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Analysis
          </h3>
          <p class="text-gray-700 leading-relaxed">{{ llmAnalysis.explanation }}</p>
        </div>

        <!-- Confidence Level -->
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center space-x-3">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span class="text-sm font-medium text-gray-600">Confidence Level:</span>
            </div>
            <div class="flex items-center space-x-2">
              <span 
                class="px-3 py-1 rounded-full text-sm font-semibold"
                :class="getConfidenceClass(llmAnalysis.confidence)"
              >
                {{ llmAnalysis.confidence?.toUpperCase() }}
              </span>
            </div>
          </div>
        </div>

        <!-- Confidence Reason -->
        <div v-if="llmAnalysis.confidence_reason" class="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p class="text-sm text-yellow-800">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            {{ llmAnalysis.confidence_reason }}
          </p>
        </div>
      </div>

      <!-- Model Predictions Grid -->
      <div v-if="modelData" class="grid md:grid-cols-3 gap-6 mb-8">
        <!-- Home Win -->
        <div class="text-center p-6 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ formatPercentage(modelData.probabilities?.home) }}</div>
          <div class="text-sm font-semibold text-green-700 mb-3">{{ getTeamName('home') }} Win</div>
          <div class="w-full bg-green-200 rounded-full h-3 mb-3">
            <div 
              class="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out" 
              :style="`width: ${(modelData.probabilities?.home || 0) * 100}%`"
            ></div>
          </div>
          <div v-if="modelData.edge" class="text-xs font-medium" :class="modelData.edge.home > 0 ? 'text-green-600' : 'text-red-500'">
            Edge: {{ formatPercentage(modelData.edge.home, true) }}
          </div>
        </div>

        <!-- Draw -->
        <div class="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200 hover:shadow-md transition-all duration-200">
          <div class="text-3xl font-bold text-yellow-600 mb-2">{{ formatPercentage(modelData.probabilities?.draw) }}</div>
          <div class="text-sm font-semibold text-yellow-700 mb-3">Draw</div>
          <div class="w-full bg-yellow-200 rounded-full h-3 mb-3">
            <div 
              class="bg-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out delay-300" 
              :style="`width: ${(modelData.probabilities?.draw || 0) * 100}%`"
            ></div>
          </div>
          <div v-if="modelData.edge" class="text-xs font-medium" :class="modelData.edge.draw > 0 ? 'text-green-600' : 'text-red-500'">
            Edge: {{ formatPercentage(modelData.edge.draw, true) }}
          </div>
        </div>

        <!-- Away Win -->
        <div class="text-center p-6 bg-red-50 rounded-xl border border-red-200 hover:shadow-md transition-all duration-200">
          <div class="text-3xl font-bold text-red-600 mb-2">{{ formatPercentage(modelData.probabilities?.away) }}</div>
          <div class="text-sm font-semibold text-red-700 mb-3">{{ getTeamName('away') }} Win</div>
          <div class="w-full bg-red-200 rounded-full h-3 mb-3">
            <div 
              class="bg-red-500 h-3 rounded-full transition-all duration-1000 ease-out delay-500" 
              :style="`width: ${(modelData.probabilities?.away || 0) * 100}%`"
            ></div>
          </div>
          <div v-if="modelData.edge" class="text-xs font-medium" :class="modelData.edge.away > 0 ? 'text-green-600' : 'text-red-500'">
            Edge: {{ formatPercentage(modelData.edge.away, true) }}
          </div>
        </div>
      </div>

      <!-- Chart Preview -->
      <div v-if="modelData?.probabilities" class="mb-8">
        <EnrichedChartPreview :probs="modelData.probabilities" :teams="{ home: getTeamName('home'), away: getTeamName('away') }" />
      </div>

      <!-- Key Statistics -->
      <div v-if="features" class="mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">Key Match Statistics</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div class="text-sm text-blue-600 font-medium mb-1">Expected Goals</div>
            <div class="text-2xl font-bold text-blue-700">{{ features.total_avg_goals?.toFixed(1) || 'N/A' }}</div>
            <div class="text-xs text-blue-500 mt-1">Combined average</div>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div class="text-sm text-purple-600 font-medium mb-1">Form Difference</div>
            <div class="text-2xl font-bold text-purple-700">{{ formatFormDiff(features.form_diff) }}</div>
            <div class="text-xs text-purple-500 mt-1">Home advantage</div>
          </div>
          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <div class="text-sm text-green-600 font-medium mb-1">Home Attack</div>
            <div class="text-2xl font-bold text-green-700">{{ features.home_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
            <div class="text-xs text-green-500 mt-1">Shots per game</div>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div class="text-sm text-orange-600 font-medium mb-1">Away Attack</div>
            <div class="text-2xl font-bold text-orange-700">{{ features.away_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
            <div class="text-xs text-orange-500 mt-1">Shots per game</div>
          </div>
        </div>
      </div>

      <!-- LLM Suggestions -->
      <div v-if="llmAnalysis?.suggestions" class="mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          Expert Suggestions
        </h3>
        <div class="space-y-3">
          <div 
            v-for="(suggestion, index) in llmAnalysis.suggestions" 
            :key="index"
            class="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              {{ index + 1 }}
            </div>
            <p class="text-green-800 leading-relaxed">{{ suggestion }}</p>
          </div>
        </div>
      </div>

      <!-- Risks Section -->
      <div v-if="llmAnalysis?.risks" class="mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          Risk Factors
        </h3>
        <div class="space-y-3">
          <div 
            v-for="(risk, index) in llmAnalysis.risks" 
            :key="index"
            class="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <svg class="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <p class="text-red-800 leading-relaxed">{{ risk }}</p>
          </div>
        </div>
      </div>

      <!-- Model Information -->
      <div v-if="modelData?.model_meta" class="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Model Information</h3>
        <div class="grid md:grid-cols-3 gap-4 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Model Type:</span>
            <span class="font-medium text-gray-800 uppercase">{{ modelData.model_meta.model_type || 'N/A' }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Training Data:</span>
            <span class="font-medium text-gray-800">{{ modelData.model_meta.n_train?.toLocaleString() || 'N/A' }} matches</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Last Updated:</span>
            <span class="font-medium text-gray-800">{{ formatModelDate(modelData.model_meta.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import EnrichedChartPreview from './EnrichedChartPreview.vue'

const props = defineProps({
  prediction: {
    type: Object,
    required: true
  }
})

const modelData = computed(() => {
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
  
  const parts = matchId.split('_')
  if (parts.length < 3) return null
  
  return {
    date: parts[0],
    home_team: parts[1],
    away_team: parts[2]
  }
})

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
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatModelDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const year = dateStr.slice(0, 4)
  const month = dateStr.slice(4, 6)
  const day = dateStr.slice(6, 8)
  return new Date(`${year}-${month}-${day}`).toLocaleDateString()
}

const getTeamName = (type) => {
  if (!matchInfo.value) return type === 'home' ? 'Home' : 'Away'
  return type === 'home' ? matchInfo.value.home_team : matchInfo.value.away_team
}

const getConfidenceClass = (confidence) => {
  switch (confidence?.toLowerCase()) {
    case 'high':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'low':
      return 'bg-red-100 text-red-800 border border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}
</script>