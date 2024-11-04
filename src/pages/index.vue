<template>
  <div class="flex gap-8 w-screen p-5 min-h-[800px]">
    <div class="basis-1/6">
      <Title title="Snippets" />
      <List />
    </div>
    <div class="basis-5/6">
      <Title title="Snippet Editor" />
      <SnippetLibraryIntegration v-if="selectedNode" />
    </div>
    <div class="basis-1/6">
      <Title title="Snippet Options" />
      <RightSideMenu v-if="selectedNode" />
    </div>
  </div>
</template>

<script setup>
import List from "~/components/settings/list/list.vue";
import SnippetLibraryIntegration from "~/components/createTemplate/ExpertEditor/SnippetLibraryIntegration";
import RightSideMenu from "~/components/createTemplate/SnippetOption/RightSideMenu.vue";
import Title from "~/components/common/Title.vue";
let selectedNode = ref(null);
//provide the selected node to using provide/inject
provide("selectedNode", selectedNode);
</script>

<style scoped>
.highlight {
  background-color: yellow;
  color: black;
}
</style>
