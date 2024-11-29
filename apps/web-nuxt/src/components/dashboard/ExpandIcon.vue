<template>
  <button
    class="absolute top-3 right-9"
    @click="() => $emit('expandPanel')"
  >
    <font-awesome-icon class="text-primaryBlue w-4 h-4" :icon="['fal', 'up-right-and-down-left-from-center']" />
  </button>
</template>

<script setup>
defineEmits(['expandPanel'])
</script>
