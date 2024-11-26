<template>
  <button
    class="absolute top-1 right-2"
    @click="() => $emit('removePanel')"
  >
    <font-awesome-icon class="text-red-500 w-6 h-6" :icon="['fal', 'circle-minus']" />
  </button>
</template>

<script setup>
defineEmits(['removePanel'])
</script>
