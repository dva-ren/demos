<script lang="ts" setup>
import mp3 from './music.mp3'

const canvas = ref<HTMLCanvasElement>()
const audio = ref<HTMLAudioElement>()
const barwidth = ref(6)

let isInit = false
let analyser: AnalyserNode

function init() {
  if (isInit)
    return
  const audCtx = new AudioContext()
  const source = audCtx.createMediaElementSource(audio.value!)
  analyser = audCtx.createAnalyser()
  analyser.fftSize = 512
  source.connect(analyser)
  analyser.connect(audCtx.destination)
  isInit = true
}

function drawBar(ctx: CanvasRenderingContext2D, x: number, y: number, height: number) {
  ctx.beginPath()
  ctx.rect(x, y, barwidth.value, height)
  ctx.fillStyle = 'rgb(222, 222, 222)'
  ctx.fill()
  ctx.closePath()
}

function draw(ctx: CanvasRenderingContext2D, data: Uint8Array) {
  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
  data.forEach((h, idx) => {
    drawBar(ctx, idx * (barwidth.value + 1), 100, h)
  })
}
onMounted(() => {
  canvas.value!.width = document.documentElement.clientWidth
  canvas.value!.height = document.documentElement.clientHeight
  const ctx = canvas.value!.getContext('2d')!

  let requestAnimationFrameId: number

  const start = () => {
    requestAnimationFrameId = requestAnimationFrame(() => {
      if (!isInit)
        return
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)
      // console.log('dataArray', dataArray)
      draw(ctx, dataArray)
      start()
    })
  }
  audio.value!.onplay = () => {
    init()
    start()
  }
  audio.value!.onpause = () => {
    cancelAnimationFrame(requestAnimationFrameId)
  }
})
</script>

<template>
  <div>
    <audio ref="audio" :src="mp3" controls inset-0 fixed />
    <canvas ref="canvas" />
  </div>
</template>
