<template>
  <div class="w-full h-full ml-4 bg-white overflow-scroll no-scrollbar">
    <div class="px-8 py-8 rounded-lg">
      <div id="lists">
        <List />
      </div>
      <div id="databases">
        <DataSources />
      </div>
      <div id="integration">
        <Integration />
      </div>
      <div id="assets-library" class="">
        <AssetsLibrary />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DataSources from './data_sources'
import List from '~/components/settings/list/list.vue'
import Integration from '~/components/settings/integration/Integration.vue'
import AssetsLibrary from '~/components/settings/data_source/AssetsLibrary.vue'
</script>

<style scoped>
.highlight {
    background-color: yellow;
    color: black;
}
</style>
