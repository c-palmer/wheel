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

type Wedge = {
  id: number
  text: string
  color: string
}

const wedges: Wedge[] = reactive([])

const s = reactive({
  wedges
})

export default s