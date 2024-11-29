<template>
  <div class="m-auto p-14 border rounded-lg w-fit">
    <h1 class="text-lg text-center font-bold">
      {{ props.title }}
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,

})
</script>
