<script lang="ts" setup>
interface Position {
  x: number
  y: number
}
const pArray = ref<Position[]>([])
const zoom = ref(false)

const position = reactive<Position>({
  x: 0,
  y: 0,
})
const idx = ref(0)
function handleClick() {
  // const p = pArray.value[randomIntNumber(0, pArray.value.length - 1)]
}
function handleZoom() {
  zoom.value = !zoom.value
}
function go(a: 1 | -1) {
  idx.value += a
  if (idx.value >= pArray.value.length)
    idx.value = 0
  const p = pArray.value[idx.value]
  position.x = -p.x
  position.y = -p.y
  location.href = `#id-${idx.value}`
}
onMounted(() => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((i) => {
    const b = i.getBoundingClientRect()
    pArray.value.push({
      x: b.x,
      y: b.y,
    })
  })
  document.body.onmousewheel = useThrottleFn((e: any) => {
    console.log(1)
    if (e.wheelDelta < 0)
      go(1)
    else if (idx.value > 0)
      go(-1)
  }, 1000, false)
  document.body.ontouchmove = useThrottleFn((e: any) => {
    console.log('e', e)
    console.log(1)
    if (e.wheelDelta < 0)
      go(1)
    else if (idx.value > 0)
      go(-1)
  }, 1000, false)
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
})

// watch(idx, () => {
//   if (idx.value >= pArray.value.length)
//     idx.value = 0
//   console.log('load', idx.value)
//   const p = pArray.value[idx.value]

// })

onBeforeMount(() => {
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'
})
</script>

<template>
  <div class="page-container" :class="{ zoom }" :style="{ transform: `translate3d(${position.x}px,${position.y}px,0)` }" @scroll="handleScroll">
    <div v-for="item in 5" :key="item" class="card-list">
      <div v-for="i in 4" :id="`id-${item}${i}`" :key="i" class="card" :style="`background-color: rgba(${item * 50},224,224,${1 - i * 0.1})`">
        <div text-3xl text-red>
          {{ `${item} - ${i}` }}
        </div>
      </div>
    </div>
  </div>
  <div fixed right-10 bottom-10>
    <div flex flex-col gap-4>
      <button btn h10 w10 bg-gray rounded-full @click="handleZoom">
        zoom
      </button>
      <button btn h10 w10 bg-gray rounded-full @click="handleClick">
        click
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-container{
  transform-origin:left top;
  display: flex;
  transition: transform 1s,margin 1s;
}
.zoom {
  transform: scale(0.1) translate3d(50vw,50vw,0) !important;
  margin-left: 20vw;
}
.card-list{
  position: relative;
}
.card{
  width: 100vw;
  height: 100vh;
  /* margin: 2rem; */
  margin: 0 2rem 2rem 0;
  transition: all 1s;
}
.card-list:nth-child(2),
.card-list:nth-child(4){
  transform: translate3d(0,40vh,0);
}
.card-list:nth-child(3){
  transform: translate3d(0,80vh,0);
}
.card-list:nth-child(1) > .card:nth-child(2){
  transform: translate3d(-40vw,0,0);
}
.card-list:nth-child(5) > .card:nth-child(2){
  transform: translate3d(40vw,0,0);
}
.card-list:nth-child(1) > .card:nth-child(3){
  transform: translate3d(-20vw,0,0);
}
.card-list:nth-child(5) > .card:nth-child(3){
  transform: translate3d(20vw,0,0);
}
.card-list:nth-child(1) .card,
.card-list:nth-child(5) .card{
  margin-bottom: 6rem;
}
.card-list:nth-child(2) .card,
.card-list:nth-child(4) .card{
  margin-bottom: 8rem;
}
.card-list:nth-child(3) .card{
  margin-bottom: 12rem;
}
.page-container{
  /* ; */
}
.zoom .card{
  aspect-ratio: 0.5;
  width: 400px;
  height: 400px;
}
</style>
