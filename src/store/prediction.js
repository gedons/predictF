// src/stores/prediction.js
import { defineStore } from "pinia";
import api from "../services/api";

export const usePredictionStore = defineStore("prediction", {
  state: () => ({
    lastPrediction: null,
    matches: [],           // upcoming matches from Sportradar
    cacheStats: {
      cache_enabled: false,
      total_entries: 0,
      entries_last_24h: 0,
      entries_last_7d: 0,
      last_entry: null
    },
    cacheListSample: [],
    schedules: [], 
    schedulesMeta: {         
      count: 0,
      fetched_at: null
    },
    loading: false,
    error: null
  }),
  actions: {
    async predictMatch(payload) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.post("/predict/match", payload);
        this.lastPrediction = res.data;
        return res.data;
      } catch (e) {
        this.error = e.response?.data || e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async predictEnriched(payload) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.post("/predict/enriched", payload);
        this.lastPrediction = res.data;
        return res.data;
      } catch (e) {
        this.error = e.response?.data || e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },

    // -------------------------
    // Schedules (Sportradar)
    // -------------------------
    async fetchSchedules({ seasonId = null, competitionId = 'sr:competition:17' } = {}) {
         this.loading = true
         this.error = null
         try {
           const params = {}
           if (seasonId) params.season_id = seasonId
           if (competitionId) params.competition_id = competitionId
   
           const res = await api.get('/external/sportradar/season_schedules', { params })
           const data = res.data || {}
           this.schedules = (data.matches || []).map(m => {
             // normalize for frontend usage
             const scheduled = m.scheduled || m.start_time || m.start || null
             return {
               id: m.id || m.raw?.id || `${m.home_team}-${m.away_team}-${scheduled}`,
               home_team: m.home_team || (m.raw?.home?.name ?? '') || '',
               away_team: m.away_team || (m.raw?.away?.name ?? '') || '',
               scheduled,
               raw: m.raw || m
             }
           })
           this.schedulesMeta = {
             count: data.count || this.schedules.length,
             fetched_at: new Date().toISOString()
           }
           return this.schedules
         } catch (e) {
           this.error = e.response?.data || e.message
           throw e
         } finally {
           this.loading = false
         }
    }

  }
});
