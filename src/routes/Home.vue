<script setup>
  import s from '@/lib/state'
  import Wheel from '@/components/Wheel.vue'
  import WedgeManager from '@/components/WedgeManager.vue'
  import { computed } from 'vue'

  const tableData = computed( () => [
    [ 'spinning', s.wheelIsRotating ],
    [ 'winner', s.winner ],
    [ 'initialSpeed', s.initialSpeed ],
    [ 'speed', s.speed ],
    [ 'duration (ms)', s.duration ],
    [ 'timeElapsed', s.timeElapsed ],
    [ 'wheelAngle', s.wheelAngle ],
  ])
</script>

<template>
  <h1>Wheel</h1>

  <div class="container">
    <Wheel />
    <WedgeManager />
  </div>
  <label>Initial Speed: <input type="number" v-model="s.initialSpeed"></label>
  <label>Duration: <input type="number" v-model="s.duration"></label>
  <table>
    <thead>
      <tr>
        <th>Attribute</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[attr, val] in tableData">
        <td>{{ attr }}</td>
        <td>{{ val }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
  }

  table {
    border-collapse: collapse;
  }

  td, th {
    border: 1px solid #ddd;
    text-align: left;
    padding: calc(var(--gap) / 2);
  }

  tbody tr:nth-child(odd) {
    background-color: #ddd;
  }
</style>