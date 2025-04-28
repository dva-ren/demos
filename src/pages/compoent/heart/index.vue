<script lang="ts" setup>
const unfold = ref(false)
function handleClick() {
  unfold.value = !unfold.value
}
</script>

<template>
  <button btn @click="handleClick">
    click
  </button>
  <div class="heart" :class="{ unfold }">
    <div class="heat-right" />
    <div class="heat-left">
      <div class="icon" i-ri:heart-2-fill />
    </div>
  </div>
</template>

<style scoped>
.heart {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 200px;
}
.heat-left,
.heat-right {
  transform-origin: bottom center;
  position: absolute;
  left: 50%;
  top: 50%;
  height: 160px;
  width: 80px;
  border-radius: 40px;
  transition: all 0.3s;
}
.heat-left {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(18px);
}
.heat-right {
  background-color: pink;
}
.unfold .heat-left {
  transform: rotateZ(-35deg) translateX(28px);
}
.unfold .heat-right {
  transform: rotateZ(35deg) translateX(-28px);
}
.heat-left .icon {
  position: absolute;
  color: red;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
}
</style>
