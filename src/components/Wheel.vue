<script setup>
  import { ref, computed, onMounted } from 'vue'
  import s from '@/lib/state'
  import { toDegrees } from '@/lib/aux_functions'
  import Konva from 'konva'
  import buttonAudio from '@/assets/button.mp3'
  import celebrationAudio from '@/assets/celebration.mp3'

  let layer = ref(null)
  let wheel = ref(null)

  const width = 600
  const height = width
  const center = { x: width / 2, y: height / 2 }
  const radius = width / 2
  const innerAngle = computed(() => s.wedges.length === 0 ? 360 : toDegrees(2 * Math.PI / s.wedges.length))

  let anim = null
  const startRotate = () => {
    if (anim) return

    const startTime = Date.now()
    anim = new Konva.Animation(frame => {
      s.timeElapsed = Date.now() - startTime

      const rotationDiff = () => {
        const x = s.timeElapsed

        // linear
        // s.speed = ((-s.initialSpeed * x) / s.duration) + s.initialSpeed

        // quadratic (decreasing slope)
        // const c = (-s.initialSpeed / Math.pow(s.duration, 2))
        // s.speed = (Math.pow(x, 2) * c) + 30

        // quadratic (increasing slope)
        const c = (s.initialSpeed / Math.pow(s.duration, 2))
        s.speed = (Math.pow((x - s.duration), 2) * c)

        return s.speed
      }

      const prevRotation = s.wheelAngle
      const curRotation = prevRotation + rotationDiff()

      if (s.timeElapsed >= s.duration) stopRotate()

      s.wheelAngle = curRotation
    }, layer.value.getNode())

    anim.start()
    s.wheelIsRotating = true
  }

  const celebrationAudioRef = ref(null)
  const stopRotate = () => {
    if (!anim) return

    anim.stop()
    anim = null
    console.log('stop angle:', s.wheelAngle)
    s.wheelIsRotating = false
    s.timeElapsed = 0
    s.speed = s.initialSpeed
    if (celebrationAudioRef.value) celebrationAudioRef.value.play()
  }

  const buttonAudioRef = ref(null)
  const handleWheelButton = () => {
    if (s.wheelIsRotating) {
      stopRotate()
    } else {
      startRotate()
      if (buttonAudioRef.value) buttonAudioRef.value.play()
    }
  }

  let rotateButtonHeight = 50
  let rotateButtonWidth = 50
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
        <v-group ref="wheel" :config="{ x: center.y, y: center.y, rotation: s.wheelAngle }">
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
    <audio ref="buttonAudioRef" :src="buttonAudio"></audio>
    <audio ref="celebrationAudioRef" :src="celebrationAudio"></audio>
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