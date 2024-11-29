<template>
  <button
    class="absolute top-3 right-2"
    @click="() => $emit('editPanel')"
  >
    <font-awesome-icon class="w-4 h-4 text-primaryBlue" :icon="['fal', 'pen-to-square']" />
  </button>
</template>

<script setup>
defineEmits(['editPanel'])
</script>
