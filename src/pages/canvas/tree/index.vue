<script lang="ts" setup>
const el = ref<HTMLCanvasElement>()
onMounted(() => {
  el.value!.width = document.documentElement.clientWidth
  el.value!.height = document.documentElement.clientHeight
})
const ctx = computed(() => el.value.getContext('2d')!)

const taskBucket: Function[] = []
interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  angle: number
}

function init() {
  ctx.value.strokeStyle = '#000'
  step({
    start: { x: 400, y: el.value.height },
    length: 10,
    angle: -Math.PI / 2,
  }, 0)
  start()
}

function drawBranch(b: Branch): Point {
  const end = getEnd(b)
  draw(b.start, end)
  return end
}

function step(b: Branch, depth: number) {
  if (depth > 1000)
    return
  const end = drawBranch(b)
  if (depth < 8 || Math.random() < 0.5) {
    depth += 1
    const leftBranch = {
      start: end,
      length: b.length,
      angle: b.angle - (0.1 * (Math.random() * 2 - 2)),
    }
    taskBucket.push(() => step(leftBranch, depth + 1))
  }
  if (depth < 8 || Math.random() < 0.5) {
    depth += 1
    const rightBranch = {
      start: end,
      length: b.length,
      angle: b.angle + (0.1 * (Math.random() * 2 - 2)),
    }
    taskBucket.push(() => step(rightBranch, depth + 1))
  }
}
let stopId = 0
function start() {
  if (taskBucket.length === 0) {
    cancelAnimationFrame(stopId)
    return
  }

  const task = [...taskBucket]
  taskBucket.length = 0
  stopId = requestAnimationFrame(() => {
    const frame = 0
    if (frame % 20 === 0) {
      task.forEach(fn => fn())
      // cancelAnimationFrame(stopId)
      start()
    }
  })
}
function draw(p1: Point, p2: Point) {
  ctx.value.moveTo(p1.x, p1.y)
  ctx.value.lineTo(p2.x, p2.y)
  ctx.value.stroke()
}

function getEnd(b: Branch): Point {
  const { start, length, angle } = b
  return {
    x: start.x + length * (Math.cos(angle)),
    y: start.y + length * (Math.sin(angle)),
  }
}
onMounted(() => {
  init()
})
</script>

<template>
  <div style="background: #F0EAEA;" scale-50>
    <canvas ref="el" />
  </div>
</template>
