<template>
  <h1 class="text-lg mx-3 my-2">
    {{ title }}
  </h1>
</template>

<script setup>
defineProps({
  title: String,
})
</script>
