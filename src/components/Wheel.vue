<script setup>
  import { ref, computed, onMounted } from 'vue'
  import s from '@/lib/state'
  import { toDegrees } from '@/lib/aux_functions'
  import Konva from 'konva'

  const width = 600
  const height = width
  const center = { x: width / 2, y: height / 2 }
  const radius = width / 2
  const innerAngle = computed(() => s.wedges.length === 0 ? 360 : toDegrees(2 * Math.PI / s.wedges.length))

  let wheelRotation = ref(0)
  let layer = ref(null)
  let wheel = ref(null)

  let speed = ref(1)
  let wheelAngle = ref(0)

  // const calcRotation = x => x === 0 ? 0 : 1 / x
  const calcRotation = x => {
    if (x === 0) return 10

    if (x < 5_000) return 10
    
    return -Math.log((x - 3_000) / 10) + 5
  }
  // const calcRotation = x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x)

  let rotateButtonHeight = 50
  let rotateButtonWidth = 50

  let anim = null
  let animStart = false
  const startRotate = () => {
    if (anim) return

    anim = new Konva.Animation(frame => {
      const curRotation = wheel.value.getNode().rotation()
      const diff = calcRotation(frame.time)
      if (diff < 0) {
        speed.value = 0
        console.log('wheel stop')
        anim.stop()
        anim = null
        animStart = false
      }

      const newRotation = curRotation + diff
      wheel.value.getNode().rotation(curRotation + diff)
      console.log(diff, newRotation)
      // speed.value -= frame.time * 0.001
    }, layer.value.getNode())

    anim.start()
    animStart = true
  }

  const stopRotate = () => {
    if (!anim) return

    anim.stop()
    anim = null
    animStart = false
  }
</script>

<template>
  <div class="container">
    <v-stage :config="{ width, height }">
      <v-layer ref="layer">
        <v-group ref="wheel" :config="{ x: center.y, y: center.y, rotation: wheelRotation }">
          <v-group v-for="({ color, text, id }, i) in s.wedges" :key="id" :config="{ rotation: innerAngle * i }">
            <v-wedge :config="{ radius, angle: innerAngle, fill: color, stroke: color, strokeWidth: 1 }" />
            <v-group :config="{ rotation: innerAngle / 2 }">
              <v-text :config="{ text: text, x: 100, y: -5, fontSize: 20 }" />
            </v-group>
          </v-group>
        </v-group>
      </v-layer>
    </v-stage>
    <button class="rotate" :style="{ width: `${rotateButtonWidth}px`, height: `${rotateButtonHeight}px`, top: `${(height - rotateButtonHeight) / 2}px`, left: `${(width - rotateButtonWidth) / 2}px` }" @click="startRotate">rotate</button>
  </div>

  <button @click="stopRotate">stop rotation</button>
  <input type="number" v-model="speed">
</template>

<style scoped>
  .container {
    position: relative;
  }

  .rotate::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background-color: black;
    z-index: -1;
    transform: rotate(45deg);

    border-radius: 100%;
    border-top-right-radius: 0;
  }

  .rotate {
    background-color: black;
    color: white;
    position: absolute;
    border: none;
    border-radius: 100%;
    z-index: 1;
  }
</style>