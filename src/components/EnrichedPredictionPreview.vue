<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
        </div>
        <h1 class="text-5xl font-black text-white mb-4 bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          AI Match Intelligence
        </h1>
        <p class="text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Advanced machine learning meets expert analysis for precise match predictions
        </p>
      </div>

      <!-- Main Prediction Card -->
      <div class="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden mb-8 hover:shadow-purple-500/20 transition-all duration-500 group">
        <!-- Match Info Header -->
        <div v-if="matchInfo" class="relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
          <div class="relative z-10 p-8 text-center">
            <h2 class="text-3xl font-bold text-white mb-2 tracking-tight">
              {{ matchInfo.home_team }} 
              <span class="text-blue-200 font-light mx-4">vs</span> 
              {{ matchInfo.away_team }}
            </h2>
            <p class="text-blue-100 text-lg font-medium">{{ formatDate(matchInfo.date) }}</p>
            <div class="mt-4 flex justify-center">
              <div class="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- LLM Analysis Section -->
        <div v-if="llmAnalysis" class="p-8 space-y-8">
          <!-- Expert Verdict - Hero Section -->
          <div class="relative group/verdict">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
            <div class="relative backdrop-blur-sm bg-white/95 rounded-2xl p-8 border border-white/30 shadow-xl">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Expert Verdict
                </h3>
              </div>
              <p class="text-gray-700 text-lg leading-relaxed font-medium">{{ llmAnalysis.verdict }}</p>
            </div>
          </div>

          <!-- Detailed Analysis -->
          <div class="backdrop-blur-sm bg-white/95 rounded-2xl p-8 border border-white/30 shadow-xl">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Detailed Analysis
              </h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed">{{ llmAnalysis.explanation }}</p>
          </div>

          <!-- Confidence Indicator -->
          <div class="backdrop-blur-sm bg-white/95 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <svg class="w-6 h-6 mr-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <span class="text-lg font-semibold text-slate-700">Confidence Level:</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div 
                    class="px-4 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                    :class="getConfidenceClass(llmAnalysis.confidence)"
                  >
                    {{ llmAnalysis.confidence?.toUpperCase() }}
                  </div>
                  <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full transition-all duration-1000 ease-out"
                      :class="getConfidenceBarClass(llmAnalysis.confidence)"
                      :style="`width: ${getConfidenceWidth(llmAnalysis.confidence)}%`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Confidence Reason -->
          <div v-if="llmAnalysis.confidence_reason" class="backdrop-blur-sm bg-amber-50/90 rounded-2xl p-6 border border-amber-200/50 shadow-xl">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p class="text-amber-800 font-medium leading-relaxed">{{ llmAnalysis.confidence_reason }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Predictions Grid -->
      <div v-if="modelData" class="grid lg:grid-cols-3 gap-6 mb-12">
        <!-- Home Win Card -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-300"></div>
          <div class="relative backdrop-blur-xl bg-white/95 rounded-2xl p-8 border border-white/30 shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div class="text-4xl font-black text-emerald-600 mb-3 tracking-tight">
                {{ formatPercentage(modelData.probabilities?.home) }}
              </div>
              <div class="text-lg font-bold text-emerald-700 mb-4">{{ getTeamName('home') }} Win</div>
              
              <!-- Progress Bar -->
              <div class="w-full bg-emerald-100 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                <div 
                  class="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-2000 ease-out shadow-sm" 
                  :style="`width: ${(modelData.probabilities?.home || 0) * 100}%`"
                ></div>
              </div>
              
              <!-- Edge Indicator -->
              <div v-if="modelData.edge" class="flex items-center justify-center space-x-2">
                <span class="text-sm font-semibold text-gray-600">Edge:</span>
                <span 
                  class="text-sm font-bold px-3 py-1 rounded-full shadow-sm"
                  :class="modelData.edge.home > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                >
                  {{ formatPercentage(modelData.edge.home, true) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Draw Card -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-300"></div>
          <div class="relative backdrop-blur-xl bg-white/95 rounded-2xl p-8 border border-white/30 shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 delay-100">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="text-4xl font-black text-amber-600 mb-3 tracking-tight">
                {{ formatPercentage(modelData.probabilities?.draw) }}
              </div>
              <div class="text-lg font-bold text-amber-700 mb-4">Draw</div>
              
              <div class="w-full bg-amber-100 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                <div 
                  class="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-2000 ease-out delay-300 shadow-sm" 
                  :style="`width: ${(modelData.probabilities?.draw || 0) * 100}%`"
                ></div>
              </div>
              
              <div v-if="modelData.edge" class="flex items-center justify-center space-x-2">
                <span class="text-sm font-semibold text-gray-600">Edge:</span>
                <span 
                  class="text-sm font-bold px-3 py-1 rounded-full shadow-sm"
                  :class="modelData.edge.draw > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                >
                  {{ formatPercentage(modelData.edge.draw, true) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Away Win Card -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-rose-400 to-red-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-300"></div>
          <div class="relative backdrop-blur-xl bg-white/95 rounded-2xl p-8 border border-white/30 shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 delay-200">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-rose-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div class="text-4xl font-black text-rose-600 mb-3 tracking-tight">
                {{ formatPercentage(modelData.probabilities?.away) }}
              </div>
              <div class="text-lg font-bold text-rose-700 mb-4">{{ getTeamName('away') }} Win</div>
              
              <div class="w-full bg-rose-100 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                <div 
                  class="bg-gradient-to-r from-rose-400 to-red-500 h-full rounded-full transition-all duration-2000 ease-out delay-500 shadow-sm" 
                  :style="`width: ${(modelData.probabilities?.away || 0) * 100}%`"
                ></div>
              </div>
              
              <div v-if="modelData.edge" class="flex items-center justify-center space-x-2">
                <span class="text-sm font-semibold text-gray-600">Edge:</span>
                <span 
                  class="text-sm font-bold px-3 py-1 rounded-full shadow-sm"
                  :class="modelData.edge.away > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                >
                  {{ formatPercentage(modelData.edge.away, true) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Section -->
      <div v-if="modelData?.probabilities" class="mb-12 animate-slide-up">
        <EnrichedChartPreview 
          :probs="modelData.probabilities" 
          :teams="{ home: getTeamName('home'), away: getTeamName('away') }" 
          class="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/30"
        />
      </div>

      <!-- Statistics Grid -->
      <div v-if="features" class="mb-12 animate-slide-up">
        <h3 class="text-3xl font-bold text-white mb-8 text-center">
          <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Key Match Statistics
          </span>
        </h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Expected Goals -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div class="relative backdrop-blur-xl bg-white/90 rounded-2xl p-6 border border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-blue-600 font-bold mb-2 tracking-wide uppercase">Expected Goals</div>
                <div class="text-3xl font-black text-blue-700 mb-2">{{ features.total_avg_goals?.toFixed(1) || 'N/A' }}</div>
                <div class="text-xs text-blue-500 font-medium">Combined average</div>
              </div>
            </div>
          </div>

          <!-- Form Difference -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div class="relative backdrop-blur-xl bg-white/90 rounded-2xl p-6 border border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300 delay-75">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-purple-600 font-bold mb-2 tracking-wide uppercase">Form Difference</div>
                <div class="text-3xl font-black text-purple-700 mb-2">{{ formatFormDiff(features.form_diff) }}</div>
                <div class="text-xs text-purple-500 font-medium">Home advantage</div>
              </div>
            </div>
          </div>

          <!-- Home Attack -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div class="relative backdrop-blur-xl bg-white/90 rounded-2xl p-6 border border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300 delay-150">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L5 21h14"/>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-emerald-600 font-bold mb-2 tracking-wide uppercase">Home Attack</div>
                <div class="text-3xl font-black text-emerald-700 mb-2">{{ features.home_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
                <div class="text-xs text-emerald-500 font-medium">Shots per game</div>
              </div>
            </div>
          </div>

          <!-- Away Attack -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div class="relative backdrop-blur-xl bg-white/90 rounded-2xl p-6 border border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300 delay-225">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L5 21h14"/>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-orange-600 font-bold mb-2 tracking-wide uppercase">Away Attack</div>
                <div class="text-3xl font-black text-orange-700 mb-2">{{ features.away_shots_avg_5?.toFixed(1) || 'N/A' }}</div>
                <div class="text-xs text-orange-500 font-medium">Shots per game</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Suggestions and Risks -->
      <div class="grid lg:grid-cols-2 gap-8 mb-12">
        <!-- Expert Suggestions -->
        <div v-if="llmAnalysis?.suggestions" class="animate-slide-up">
          <div class="backdrop-blur-xl bg-white/95 rounded-3xl p-8 border border-white/30 shadow-2xl">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Expert Suggestions
              </h3>
            </div>
            <div class="space-y-4">
              <div 
                v-for="(suggestion, index) in llmAnalysis.suggestions" 
                :key="index"
                class="group/suggestion relative overflow-hidden"
              >
                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border border-rose-200/50 hover:border-rose-300/70 transition-all duration-300 hover:shadow-lg">
                  <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <p class="text-rose-800 leading-relaxed font-medium flex-1">{{ risk }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Information Footer -->
      <div v-if="modelData?.model_meta" class="animate-slide-up">
        <div class="backdrop-blur-xl bg-white/95 rounded-3xl p-8 border border-white/30 shadow-2xl">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              Model Intelligence
            </h3>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-slate-200">
              <div class="text-sm text-slate-600 font-semibold mb-2 uppercase tracking-wide">Model Name</div>
              <div class="text-xl font-bold text-slate-800">{{ getModelDisplayName(modelData) }}</div>
            </div>
            <div class="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-slate-200">
              <div class="text-sm text-slate-600 font-semibold mb-2 uppercase tracking-wide">Training Data</div>
              <div class="text-xl font-bold text-slate-800">{{ modelData.model_meta.n_train?.toLocaleString() || 'N/A' }}</div>
              <div class="text-xs text-slate-500 mt-1">matches analyzed</div>
            </div>
            <div class="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-slate-200">
              <div class="text-sm text-slate-600 font-semibold mb-2 uppercase tracking-wide">Last Updated</div>
              <div class="text-xl font-bold text-slate-800">{{ formatModelDate(modelData.model_meta.created_at) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Action Button -->
      <div class="fixed bottom-8 right-8 z-20">
        <button class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-purple-500/40 transform hover:scale-110 hover:rotate-12 transition-all duration-300 group">
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
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
const getModelDisplayName = (modelData) => {
  if (!modelData) return 'Unknown Model'
  
  // Option 1: If you have model ID
  if (modelData.id) {
    const modelIndex = (modelData.id - 1) % modelNames.length
    return modelNames[modelIndex] || `Aria-${modelIndex + 1}`
  }
  
  // Option 2: If you have model_name, create consistent hash
  if (modelData.model_name) {
    const hash = modelData.model_name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const modelIndex = Math.abs(hash) % modelNames.length
    return modelNames[modelIndex]
  }
  
  // Option 3: Fallback to first model name
  return modelNames[0]
}

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
      return 'bg-emerald-500 text-white shadow-emerald-300/50'
    case 'medium':
      return 'bg-amber-500 text-white shadow-amber-300/50'
    case 'low':
      return 'bg-rose-500 text-white shadow-rose-300/50'
    default:
      return 'bg-slate-500 text-white shadow-slate-300/50'
  }
}

const getConfidenceBarClass = (confidence) => {
  switch (confidence?.toLowerCase()) {
    case 'high':
      return 'bg-gradient-to-r from-emerald-400 to-emerald-600'
    case 'medium':
      return 'bg-gradient-to-r from-amber-400 to-amber-600'
    case 'low':
      return 'bg-gradient-to-r from-rose-400 to-rose-600'
    default:
      return 'bg-gradient-to-r from-slate-400 to-slate-600'
  }
}

const getConfidenceWidth = (confidence) => {
  switch (confidence?.toLowerCase()) {
    case 'high':
      return 85
    case 'medium':
      return 60
    case 'low':
      return 35
    default:
      return 50
  }
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

/* Glassmorphism effect enhancement */
.backdrop-blur-xl {
  backdrop-filter: blur(16px) saturate(180%);
}

/* Enhanced hover effects */
.group:hover .group-hover\:shadow-purple-500\/20 {
  box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.2);
}

/* Parallax scroll effect for background elements */
@media (prefers-reduced-motion: no-preference) {
  .animate-blob {
    animation: blob 7s infinite;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .backdrop-blur-xl {
    backdrop-filter: blur(12px) saturate(160%);
  }
}

/* Focus states for accessibility */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading state shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
</style>