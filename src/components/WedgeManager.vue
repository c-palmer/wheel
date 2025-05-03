<script setup lang="ts">
  import s from '@/lib/state'
  import { ref } from 'vue'
  import { randomColor } from '@/lib/aux_functions'

  s.wedges.push(...[
    {
      id: 1,
      text: 'a',
      color: randomColor()
    },
    {
      id: 2,
      text: 'b',
      color: randomColor()
    },
    {
      id: 3,
      text: 'c',
      color: randomColor()
    },
  ])

  let newText = ref('')

  const handleEnter = (e: Event) => {
    const id = s.wedges.length === 0 ? 1 : s.wedges[s.wedges.length - 1].id + 1

    s.wedges.push({ id, text: newText.value, color: randomColor() })

    newText.value = ''
  }
</script>

<template>
  <div>
    <h2>Add Movie</h2>

    <input type="text" v-model="newText" @keyup.enter="handleEnter" placeholder="Add a Movie">

    <div v-for="wedge in s.wedges" :key="wedge.id">
      <input type="text" v-model="wedge.text">
      <button @click="() => s.wedges = s.wedges.filter(({ id }) => wedge.id !== id)">X</button>
    </div>
  </div>
</template>