<template>
  <div class="right-pane">
    <div v-if="selectedFile">
      <h3>{{ selectedFile.name }}</h3>
      <p>{{ selectedFile.path }}</p>
      <p>{{ selectedFile.download_url }}</p>
    </div>
  </div>
</template>

<script setup>
const selectedFile = inject('selectedFile')
</script>
