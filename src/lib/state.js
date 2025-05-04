// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

import { reactive } from 'vue'

const initialSpeed = 0.1

const s = reactive({
  wedges: [],
  wheelIsRotating: false,
  winner: '',
  initialSpeed,
  speed: initialSpeed,
  duration: 10_000,
})

export default s