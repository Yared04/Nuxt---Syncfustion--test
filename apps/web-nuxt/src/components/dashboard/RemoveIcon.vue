<template>
  <button
    class="absolute bottom-1 right-6"
    @click="() => $emit('removePanel')"
  >
    <font-awesome-icon class="text-red-500 w-5 h-5" :icon="['fal', 'circle-minus']" />
  </button>
</template>

<script setup>
defineEmits(['removePanel'])
</script>
