<template>
  <div class="favourites-card flex overflow-x-auto h-full w-full">
    <div class="card-container flex gap-4 m-4">
      <Card title="Card 1" amount="100" icon="/google-docs.png" />
      <Card title="Card 2" amount="200" icon="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" />
      <Card title="Card 3" amount="300" icon="https://cdn-icons-png.flaticon.com/512/1822/1822899.png" />
      <Card title="Card 4" amount="400" icon="https://cdn-icons-png.flaticon.com/512/1822/1822899.png" />
      <Card title="Card 5" amount="500" icon="https://cdn-icons-png.flaticon.com/512/1822/1822899.png" />
      <Card title="Card 6" amount="600" icon="https://cdn-icons-png.flaticon.com/512/1822/1822899.png" />
      <Card title="Card 7" amount="700" icon="https://cdn-icons-png.flaticon.com/512/1822/1822899.png" />
      <Card title="Card 8" amount="800" icon="https://cdn-icons-png.flaticon.com/512/1822/1822899.png" />
    </div>
  </div>
</template>

<script setup>
import Card from './Card.vue'
</script>

<style scoped>
.card {
    width: calc(100% / 4 - 32px); /* Adjust the width calculation as needed */
}
</style>
