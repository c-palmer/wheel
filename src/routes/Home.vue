<script setup lang="ts">
  import s from '@/lib/state'
  import Wheel from '@/components/Wheel.vue'
  import WedgeManager from '@/components/WedgeManager.vue'
  import AnimTest from '@/components/AnimTest.vue'
</script>

<template>
  <h1>Wheel</h1>

  <Wheel />
  <WedgeManager />
  <!-- <AnimTest /> -->

  <!-- <ul>
    <li v-for="wedge in s.wedges">{{ wedge.text }}</li>
  </ul> -->
</template>