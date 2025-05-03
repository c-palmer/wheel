<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>

<style scoped>
  nav {
    background-color: #eee;
    padding: var(--gap);
    display: flex;
    gap: var(--gap);
  }
</style>