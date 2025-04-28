<script setup lang="ts" generic="T extends any, O extends any">
import { adaptDPR } from '~/composables/canvas'
import { ParticleEngine } from './particle'

const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()
const count = useLocalStorage('count', 10)
const speed = useLocalStorage('speed', 0.01)

onMounted(() => {
  ctx.value = canvas.value!.getContext('2d')!
  canvas.value!.width = window.innerWidth
  canvas.value!.height = window.innerHeight
  adaptDPR(canvas.value!, ctx.value)
  const engine = new ParticleEngine(ctx.value, count.value, 50)
  engine.run()

  window.onmousemove = useThrottleFn((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY
    engine.update(x, y)
  }, 10)
  watch([count, speed], () => {
    engine.reload(count.value)
  })
})
</script>

<template>
  <div>
    <div p-2 fixed>
      <input v-model="count" type="number" min="1" max="200">
      <input v-model="count" type="range" min="1" max="200" w-3xl>
      <br>
      <input v-model="speed" type="number" min="0.01" max="1" step="0.01">
      <input v-model="speed" type="range" min="0.01" max="0.5" step="0.01" w-3xl>
    </div>
    <canvas ref="canvas" />
  </div>
</template>
