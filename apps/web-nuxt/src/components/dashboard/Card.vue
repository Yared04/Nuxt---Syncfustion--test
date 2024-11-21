<template>
  <div class="flex flex-1 items-center bg-white rounded-lg shadow h-full p-4">
    <div class=" mr-10">
      <img :src="icon" alt="icon" class="w-20 h-20" />
    </div>
    <div class="flex-grow">
      <h2 class="text-6xl font-bold text-center">
        {{ amount }}+
      </h2>
      <h3 class="text-lg font-semibold text-center">
        {{ title }}
      </h3>
    </div>
  </div>
</template>

<script setup>
const _props = defineProps({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
</style>
