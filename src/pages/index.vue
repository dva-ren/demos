<script setup lang="ts">
const router = useRouter()
let routes: string[] = $ref([])

onMounted(() => {
  const _routes = router.getRoutes()
  const temp: string[] = []
  for (let i = 0; i < _routes.length; i++) {
    if (_routes[i].path === '/:all(.*)*' || _routes[i].path === '/')
      continue
    temp.push(_routes[i].path.slice(1))
  }
  routes = temp.sort()
})
</script>

<template>
  <div p-4>
    <div v-for="route, index in routes" :key="index" box-border p-1 border="~ gray-100" hover:border-gray>
      <router-link :to="route">
        {{ route }}
      </router-link>
    </div>
  </div>
</template>

<style>

</style>
