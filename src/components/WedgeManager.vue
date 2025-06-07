<script setup>
  import s from '@/lib/state'
  import { ref } from 'vue'
  import { randomChoice, randomColor } from '@/lib/aux_functions'

  const initialColors = [ '#2b580c', '#fdef96', '#f7b71d', '#afa939' ]

  if (s.wedges.length === 0) {
    s.wedges.push(...Array.from({ length: 8 }, (_, i) => ({ id: i, text: i % 2 === 0 ? 'YES' : 'NO', color: initialColors[i % initialColors.length] })))
  }

  let newText = ref('')

  const handleEnter = e => {
    const id = s.wedges.length === 0 ? 1 : s.wedges[s.wedges.length - 1].id + 1

    s.wedges.push({ id, text: newText.value, color: randomColor() })

    newText.value = ''
  }

  const removeWedge = id => {
    const index = s.wedges.findIndex(wedge => wedge.id === id)
    s.wedges.splice(index, 1)
  }
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <h2>Add Movie</h2>

    <input type="text" v-model="newText" @keyup.enter="handleEnter" placeholder="Add a Movie">

    <div v-for="wedge in s.wedges" :key="wedge.id" class="wedge-entry">
      <input type="text" v-model="wedge.text">
      <input type="color" v-model="wedge.color">
      <button @click="removeWedge(wedge.id)">X</button>
    </div>
  </div>
</template>

<style scoped>
  .wedge-entry {
    border: 1px solid black;
    display: flex;
    padding: var(--gap);
  }
</style>