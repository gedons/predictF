<template>
  <div class="min-h-screen font-sans antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-700">
    
    <!-- Navigation -->
    <nav class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg fixed w-full z-50 top-0 border-b border-gray-200 dark:border-gray-800 transition-all duration-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center cursor-pointer" @click="scrollToTop">
            <div class="flex-shrink-0 flex items-center group">
              <div class="bg-gradient-to-br from-red-600 to-amber-600 rounded-xl p-2.5 mr-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-red-500/30">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <span class="text-2xl font-black bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent tracking-tight">MatchCraft AI</span>
            </div>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-10">
            <a href="#features" class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-amber-500 transition-all duration-300 font-semibold text-sm tracking-wide hover:scale-105">Features</a>
            <a href="#how-it-works" class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-amber-500 transition-all duration-300 font-semibold text-sm tracking-wide hover:scale-105">Methodology</a>            
            
            <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
              class="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-amber-500 transition-all duration-500 hover:rotate-180 cursor-pointer border border-gray-300 dark:border-gray-600"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              title="Toggle Dark Mode"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <router-link to="/register" class="bg-gradient-to-br from-red-600 to-amber-600 text-white px-7 py-3.5 rounded-2xl hover:shadow-xl hover:shadow-red-500/30 transition-all duration-500 transform hover:-translate-y-1 font-bold text-sm tracking-wide group">
              <span class="group-hover:scale-105 transition-transform duration-300">Begin Analysis</span>
            </router-link>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center space-x-4">
            <button
              @click="toggleDarkMode"
              class="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-amber-500 cursor-pointer"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </button>
            
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-amber-500 focus:outline-none p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile Navigation Menu -->
      <div v-show="mobileMenuOpen" class="md:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 absolute w-full shadow-lg">
        <div class="px-4 pt-4 pb-6 space-y-3">
          <a href="#features" @click="mobileMenuOpen = false" class="block px-4 py-3 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 transform hover:translate-x-2">Features</a>
          <a href="#how-it-works" @click="mobileMenuOpen = false" class="block px-4 py-3 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 transform hover:translate-x-2">Methodology</a>
          <a href="#login" class="block px-4 py-3 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 transform hover:translate-x-2">Access</a>
          <a href="#register" class="block w-full mt-4 bg-gradient-to-br from-red-600 to-amber-600 text-white px-6 py-4 rounded-2xl hover:shadow-xl hover:shadow-red-500/30 transition-all duration-500 text-center font-bold transform hover:-translate-y-0.5">
            Begin Analysis
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-36 pb-28 bg-gradient-to-br from-white via-amber-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-red-900/20 relative overflow-hidden transition-colors duration-700">
      <!-- Geometric Background Pattern -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-30">
          <div class="absolute top-20 left-10 w-72 h-72 bg-red-300 dark:bg-red-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-float-slow"></div>
          <div class="absolute bottom-32 right-16 w-96 h-96 bg-amber-300 dark:bg-amber-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-float-medium"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-300 dark:bg-emerald-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-float-fast"></div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center animate-rise-up">
          <div class="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-amber-500 border border-red-200 dark:border-amber-500/30 text-sm font-bold tracking-wide">
            <span class="w-2 h-2 bg-red-600 dark:bg-amber-500 rounded-full mr-2 animate-pulse"></span>
            Neural Networks Active • Real-time Analytics
          </div>
          <h1 class="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight tracking-tighter">
            Decode The
            <br>
            <span class="bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent animate-glow">
              Game's DNA
            </span>
          </h1>
          <p class="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto font-medium leading-relaxed tracking-wide">
           Leverage advanced machine learning algorithms to analyze team performance, player statistics, and historical data for 85% more accurate predictions.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <router-link to="/register" class="w-full sm:w-auto group bg-gradient-to-br from-red-600 to-amber-600 text-white px-10 py-5 rounded-2xl text-xl font-black tracking-wide hover:shadow-xl hover:shadow-red-500/40 transition-all duration-500 transform hover:-translate-y-2 flex items-center justify-center border-2 border-transparent hover:border-amber-400">
              <span class="group-hover:scale-105 transition-transform duration-300">Initiate Analysis</span>
              <svg class="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </router-link>
            <button class="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-10 py-5 rounded-2xl text-xl font-bold tracking-wide hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-500 flex items-center justify-center group bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
              <svg class="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="group-hover:scale-105 transition-transform duration-300">View Case Study</span>
            </button>
          </div>
        </div>
        
        <!-- Hero Stats Cards -->
        <div class="mt-24 animate-rise-up animation-delay-300">
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-xl p-10 border border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              <div class="text-center px-6 pt-6 md:pt-0 group">
                <div class="text-5xl font-black bg-gradient-to-br from-red-600 to-amber-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">87.3%</div>
                <h3 class="font-black text-gray-900 dark:text-white text-xl tracking-tight mb-2">Prediction Accuracy</h3>
                <p class="text-gray-600 dark:text-gray-400 text-base tracking-wide">Verified across 55,000+ matches</p>
              </div>
              <div class="text-center px-6 pt-10 md:pt-0 group">
                <div class="text-5xl font-black bg-gradient-to-br from-amber-600 to-emerald-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">100k</div>
                <h3 class="font-black text-gray-900 dark:text-white text-xl tracking-tight mb-2">Data Points/Match</h3>
                <p class="text-gray-600 dark:text-gray-400 text-base tracking-wide">Real-time neural processing</p>
              </div>
              <div class="text-center px-6 pt-10 md:pt-0 group">
                <div class="text-5xl font-black bg-gradient-to-br from-emerald-600 to-red-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">5+</div>
                <h3 class="font-black text-gray-900 dark:text-white text-xl tracking-tight mb-2">Global Leagues</h3>
                <p class="text-gray-600 dark:text-gray-400 text-base tracking-wide">Premier League to J-League</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            The Architecture of Insight
          </h2>
          <p class="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium tracking-wide">
            Our platform doesn't just predict outcomes—it understands the soul of the game through layered intelligence systems.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <!-- Feature 1 -->
          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-amber-500">
            <div class="bg-gradient-to-br from-red-100 to-amber-100 dark:from-red-900/20 dark:to-amber-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <svg class="w-8 h-8 text-red-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Quantum Neural Analysis</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed tracking-wide text-lg">Our proprietary quantum-inspired algorithms process game data across multiple dimensional layers, revealing patterns traditional AI misses.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-emerald-500">
            <div class="bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-amber-900/20 dark:to-emerald-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <svg class="w-8 h-8 text-amber-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Temporal Pattern Mapping</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed tracking-wide text-lg">We don't just analyze the present—we map temporal sequences to predict momentum shifts before they manifest on the field.</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-red-500">
            <div class="bg-gradient-to-br from-emerald-100 to-red-100 dark:from-emerald-900/20 dark:to-red-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <svg class="w-8 h-8 text-emerald-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Psychometric Team Dynamics</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed tracking-wide text-lg">Beyond statistics, we analyze team chemistry, pressure response, and leadership dynamics through behavioral pattern recognition.</p>
          </div>

          <!-- Feature 4 -->
          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-amber-500">
            <div class="bg-gradient-to-br from-red-100 to-amber-100 dark:from-red-900/20 dark:to-amber-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <svg class="w-8 h-8 text-red-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Adaptive Interface Engine</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed tracking-wide text-lg">Our UI morphs based on game context, emphasizing relevant data through intelligent visual prioritization and spatial computing.</p>
          </div>

          <!-- Feature 5 -->
          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-emerald-500">
            <div class="bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-amber-900/20 dark:to-emerald-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <svg class="w-8 h-8 text-amber-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Collective Intelligence Synthesis</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed tracking-wide text-lg">We aggregate wisdom from global expert networks, blending quantitative analysis with qualitative human insight.</p>
          </div>

          <!-- Feature 6 -->
          <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-red-500">
            <div class="bg-gradient-to-br from-emerald-100 to-red-100 dark:from-emerald-900/20 dark:to-red-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <svg class="w-8 h-8 text-emerald-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Proprietary Confidence Scoring</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed tracking-wide text-lg">Our confidence metrics don't just show probability—they visualize the structural integrity of each prediction through multi-factor validation.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-28 bg-gradient-to-t from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-700 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            The Analytical Pipeline
          </h2>
          <p class="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium tracking-wide">
            From raw data to actionable intelligence—witness the transformation through our multi-layered analytical engine.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <!-- Animated Connector Line -->
          <div class="hidden md:block absolute top-16 left-[15%] right-[15%] h-1 bg-gradient-to-r from-red-200 via-amber-200 to-emerald-200 dark:from-red-800 dark:via-amber-800 dark:to-emerald-800 z-0 rounded-full">
            <div class="h-full w-1/3 bg-gradient-to-r from-red-600 to-amber-600 rounded-full animate-progress"></div>
          </div>

          <div class="text-center group relative z-10">
            <div class="bg-white dark:bg-gray-800 p-3 rounded-3xl inline-block mb-8 border border-gray-200 dark:border-gray-700">
              <div class="bg-gradient-to-br from-red-600 to-amber-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span class="text-4xl font-black text-white">01</span>
              </div>
            </div>
            <h3 class="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Data Ingestion</h3>
            <p class="text-gray-600 dark:text-gray-400 text-xl leading-relaxed tracking-wide px-6">Real-time streams from 280+ global sources, processed through our quantum data validation gateways.</p>
          </div>
          
          <div class="text-center group relative z-10">
            <div class="bg-white dark:bg-gray-800 p-3 rounded-3xl inline-block mb-8 border border-gray-200 dark:border-gray-700">
              <div class="bg-gradient-to-br from-amber-600 to-emerald-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span class="text-4xl font-black text-white">02</span>
              </div>
            </div>
            <h3 class="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Pattern Synthesis</h3>
            <p class="text-gray-600 dark:text-gray-400 text-xl leading-relaxed tracking-wide px-6">Multi-dimensional neural networks identify emergent patterns across temporal and spatial domains.</p>
          </div>
          
          <div class="text-center group relative z-10">
            <div class="bg-white dark:bg-gray-800 p-3 rounded-3xl inline-block mb-8 border border-gray-200 dark:border-gray-700">
              <div class="bg-gradient-to-br from-emerald-600 to-red-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span class="text-4xl font-black text-white">03</span>
              </div>
            </div>
            <h3 class="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Intelligence Delivery</h3>
            <p class="text-gray-600 dark:text-gray-400 text-xl leading-relaxed tracking-wide px-6">Context-aware insights delivered through adaptive interfaces that prioritize what matters most.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter">
          Ready to See Beyond the Game?
        </h2>
        <p class="text-2xl md:text-3xl text-amber-200 mb-14 max-w-3xl mx-auto font-medium tracking-wide">
          Join the elite analysts who use MatchCraft AI to transform raw data into championship-level insights.
        </p>
        <div class="flex flex-col sm:flex-row gap-8 justify-center">
          <router-link to="/register" class="font-black bg-gradient-to-br from-red-600 to-amber-600 text-white px-12 py-6 rounded-2xl text-xl tracking-wide hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-2 border-amber-400">
            Begin Your Analysis
          </router-link>
          <router-link to="/login" class="font-black bg-transparent text-amber-400 border-2 border-amber-400 px-12 py-6 rounded-2xl text-xl tracking-wide hover:bg-amber-400/10 hover:border-amber-300 transition-all duration-500 transform hover:-translate-y-1">
            Access Platform
          </router-link>
        </div>
        <p class="mt-8 text-lg text-amber-300/70 tracking-wide">7-day analytical deep dive • No commitment required</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-gray-900 border-t border-gray-800 pt-20 pb-12 transition-colors duration-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center mb-8">
              <div class="bg-gradient-to-br from-red-600 to-amber-600 rounded-xl p-2.5 mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <span class="text-2xl font-black text-white tracking-tight">MatchCraft AI</span>
            </div>
            <p class="text-gray-400 text-base leading-relaxed tracking-wide">
              We architect intelligence systems that reveal the hidden narratives within athletic competition. Beyond prediction—understanding.
            </p>
          </div>
          
          <div>
            <h3 class="text-sm font-black text-amber-500 tracking-wider uppercase mb-6">Platform</h3>
            <ul class="space-y-4">
              <li><a href="#features" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Analytical Engine</a></li>
              <li><a href="#pricing" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Enterprise Access</a></li>
              <li><a href="#" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">API Integration</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-black text-amber-500 tracking-wider uppercase mb-6">Research</h3>
            <ul class="space-y-4">
              <li><a href="#" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Methodology Papers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Case Studies</a></li>
              <li><a href="#" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Research Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-black text-amber-500 tracking-wider uppercase mb-6">Governance</h3>
            <ul class="space-y-4">
              <li><a href="#" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Ethical Framework</a></li>
              <li><a href="#" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Data Integrity</a></li>
              <li><a href="#" class="text-gray-400 hover:text-amber-500 transition-all duration-300 tracking-wide hover:translate-x-1 inline-block">Transparency</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm text-center md:text-left tracking-wide">
            © 2025 MatchCraft AI Systems. All intelligence protected.
          </p>
          <div class="flex space-x-8 mt-6 md:mt-0">
            <a href="#" class="text-gray-500 hover:text-amber-500 transition-all duration-300 hover:scale-110">
              <span class="sr-only">Research Network</span>
              <svg class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 16v-6H7v6h4zm6 0v-6h-4v6h4z"/></svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-amber-500 transition-all duration-300 hover:scale-110">
              <span class="sr-only">Academic Portal</span>
              <svg class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" clip-rule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      mobileMenuOpen: false,
      isDark: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    // Check for saved theme preference or respect OS preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDark = true
      document.documentElement.classList.add('dark')
    } else {
      this.isDark = false
      document.documentElement.classList.remove('dark')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* Custom Animations */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(90deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(45deg); }
}

@keyframes glow {
  0%, 100% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(45deg);
  }
}

@keyframes rise-up {
  from { 
    opacity: 0; 
    transform: translateY(40px) scale(0.95);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
}

@keyframes progress {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(300%); }
}

.animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
.animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
.animate-float-fast { animation: float-fast 4s ease-in-out infinite; }

.animate-glow {
  background-size: 200% 200%;
  animation: glow 4s ease infinite;
}

.animate-rise-up {
  animation: rise-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.animate-progress {
  animation: progress 3s ease-in-out infinite;
}

.animation-delay-300 { 
  animation-delay: 0.3s; 
  animation-fill-mode: both;
}

/* Enhanced scrollbar */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #f5f1e6, #fefdf8);
}

.dark ::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #1a1a1a, #050505);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #dc2626, #d97706);
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #d97706, #059669);
}
</style>