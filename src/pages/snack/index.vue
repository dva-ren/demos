<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Snack from './Snack'

let instance: Snack

const canvas = ref<HTMLCanvasElement>()
function handleMove() {
  instance.draw()
}
onMounted(() => {
  canvas.value!.width = document.documentElement.clientWidth
  canvas.value!.height = document.documentElement.clientHeight

  instance = new Snack(canvas.value!)
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'a')
      instance.left()
    if (e.key === 's')
      instance.down()
    if (e.key === 'w')
      instance.up()
    if (e.key === 'd')
      instance.right()
  })
  instance.start()
})
</script>

<template>
  <div>
    <button @click="handleMove">
      move
    </button>
    <canvas ref="canvas" />
  </div>
</template>
