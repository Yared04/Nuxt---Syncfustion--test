<template>
  <button
    class="absolute bottom-1 right-14"
    @click="() => $emit('editPanel')"
  >
    <font-awesome-icon class="w-5 h-5 text-primaryBlue" :icon="['fal', 'pen-to-square']" />
  </button>
</template>

<script setup>
defineEmits(['editPanel'])
</script>
