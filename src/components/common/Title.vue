<template>
  <div
    class="justify-left h-[62px] rounded-md text-lg text-primary-500 bg-primary-50 flex items-center justify-center gap-2 transition-all ease-linear duration-75"
  >
    <p class="font-poppins">{{ title }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
