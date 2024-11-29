<template>
  <button
    class="absolute top-3 right-2"
    @click="() => $emit('savePanel')"
  >
    <font-awesome-icon class="w-4 h-4 text-primaryBlue" :icon="['fal', 'floppy-disk']" />
  </button>
  <button
    class="absolute top-3 right-9"
    @click="() => $emit('removePanel')"
  >
    <font-awesome-icon class="w-4 h-4 text-red-500" :icon="['fadl', 'minus']" />
  </button>
</template>

<script setup>
defineEmits(['savePanel', 'removePanel'])
</script>
