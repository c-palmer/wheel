<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="loaded-component">
    <RouterView />
  </div>
</template>

<style scoped>
  .loaded-component {
    padding: var(--gap);
  }
</style>