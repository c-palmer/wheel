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

  let wheelAngle = ref(0)

  // // const calcRotationX = x => x === 0 ? 0 : 1 / x
  // const calcRotationX = x => {
  //   // return s.speed * (10 - x * .0005)
  //   // return (1 - Math.pow(1 - (x * s.speed), 4))
  //   return ((x * s.speed) / -5) + 10
  //   // if (x === 0 || x < 5_000) return s.speed
    
  //   // return -Math.log((x - 3_000) / 10) + 5
  // }
  // // const calcRotationX = x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
  // const calcNextRotation = prevRotation => {
  //   // if (prevRotation === 0)
  //   return prevRotation + 1
  // }

  const handleWheelButton = () => {
    if (s.wheelIsRotating) {
      stopRotate()
    } else {
      startRotate()
    }
  }

  let rotateButtonHeight = 50
  let rotateButtonWidth = 50

  let anim = null
  let animStart = false
  const startRotate = () => {
    if (anim) return

    const startTime = Date.now()
    anim = new Konva.Animation(frame => {
      if (!wheel.value) return

      const prevRotation = wheel.value.getNode().rotation()
      // const newRotation = calcNextRotation(prevRotation)

      const newRotation = prevRotation + s.speed

      if (Date.now() - startTime >= s.duration || s.speed === 0) {
        s.speed = s.initialSpeed
        console.log('wheel stop')
        anim.stop()
        s.wheelIsRotating = false
        anim = null
        animStart = false
      }

      console.log(prevRotation, newRotation)

      if (newRotation < 0) {
        s.speed = s.initialSpeed
        console.log('wheel stop')
        anim.stop()
        s.wheelIsRotating = false
        anim = null
        animStart = false
      }

      wheel.value.getNode().rotation(newRotation)
    }, layer.value.getNode())

    anim.start()
    s.wheelIsRotating = true
    animStart = true
  }

  const stopRotate = () => {
    if (!anim) return
    if (!wheel.value) return

    anim.stop()
    console.log('stop angle:', wheel.value.getNode().rotation())
    s.wheelIsRotating = false
    anim = null
    animStart = false
  }

  const wheelStyle = {
    width: rotateButtonWidth + 'px',
    height: rotateButtonHeight + 'px',
    top: ((height - rotateButtonHeight) / 2) + 'px',
    left: ((width - rotateButtonWidth) / 2) + 'px',
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
    <button class="rotate" :style="wheelStyle" @click="handleWheelButton">{{ s.wheelIsRotating ? 'STOP' : 'SPIN' }}</button>
  </div>
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