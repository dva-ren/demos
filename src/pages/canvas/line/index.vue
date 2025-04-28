<script lang="ts" setup>
import { Line } from './Line'

const canvas = ref<HTMLCanvasElement>()
onMounted(() => {
  canvas.value!.width = document.documentElement.clientWidth
  canvas.value!.height = document.documentElement.clientHeight
  const instance = new Line(canvas.value!, 120)
  const fn = () => {
    requestAnimationFrame(() => {
      instance.draw()
      fn()
    })
  }
  fn()
  // instance.draw()
})
</script>

<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>
