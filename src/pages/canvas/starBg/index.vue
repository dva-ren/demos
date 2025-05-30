<script setup lang="ts">
import type { Star } from './Star'
import { createStars, drawStars } from './Star'

const canvas = ref<HTMLCanvasElement>()
onMounted(() => {
  initCanvas(canvas.value!)
  const ctx = canvas.value!.getContext('2d')
  const list: Star[][] = []
  const depth = 6
  for (let i = 0; i < depth; i++) {
    const stars = createStars(50 * (depth - i), i, i / 4, canvas.value!.width, canvas.value!.height)
    list.push(stars)
  }

  function animate() {
    if (!ctx)
      return
    ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
    for (const stars of list) {
      drawStars(ctx, stars)
    }
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

<template>
  <div>
    <canvas ref="canvas" bg-black />
  </div>
</template>
