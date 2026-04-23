<template>
  <div class="flex justify-center pb-4">
    <h1 class="text-3xl text-white">Overwatch Hero Level Tracker</h1>
  </div>
  <div class="flex justify-center">
    <GoalForm />
  </div>
  <SummaryBar />
  <div class="flex justify-center items-center">
    <GridFilters />
    <GridSortBy />
  </div>
  <div>
    <HeroGrid />
  </div>
</template>
<script setup lang="ts">
import SummaryBar from './components/summary-bar.vue'
import GoalForm from './components/goal-form.vue'
import HeroGrid from './components/hero-grid.vue'
import GridFilters from './components/grid-filters.vue'
import GridSortBy from './components/grid-sort-by.vue'
</script>
