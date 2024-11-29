<template>
  <button
    class="absolute top-3 left-2"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
  >
    <font-awesome-icon
      class="w-4 h-4 text-primaryBlue"
      :icon="['fal', 'grip-dots-vertical']"
    />
  </button>
</template>

<script setup>
const emit = defineEmits(['allowDrag'])

function startDrag() {
  emit('allowDrag', true)
}

function stopDrag() {
  emit('allowDrag', false)
}
</script>
