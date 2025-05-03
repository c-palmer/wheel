<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Konva from 'konva';

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const rectConfig = ref({
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  fill: 'green'
});

const layerRef = ref(null);
const rectRef = ref(null);
let anim = null;

onMounted(() => {
  anim = new Konva.Animation((frame) => {
    // const time = frame.time;
    // const timeDiff = frame.timeDiff;
    // const frameRate = frame.frameRate;
    
    // // Example: move rectangle in a circle
    // const radius = 50;
    // const x = radius * Math.cos(frame.time * 2 * Math.PI / 2000) + 100;
    // const y = radius * Math.sin(frame.time * 2 * Math.PI / 2000) + 100;
    rectRef.value.getNode().rotation(frame.time);
  }, layerRef.value.getNode());

  anim.start();
});

onUnmounted(() => {
  if (anim) {
    anim.stop();
  }
});
</script>

<template>
  <v-stage :config="stageSize">
    <v-layer ref="layerRef">
      <v-rect
        ref="rectRef"
        :config="rectConfig"
      />
    </v-layer>
  </v-stage>
</template>