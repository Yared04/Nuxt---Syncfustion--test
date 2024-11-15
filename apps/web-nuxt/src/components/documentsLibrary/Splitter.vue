<template class="relative">
  <ejs-splitter id="default-splitter" class="m-10 mr-12 mt-20" height="600px">
    <e-panes>
      <e-pane :content="leftPaneContent" />
      <e-pane v-if="showMiddlePane" :content="middlePaneContent" />
      <e-pane v-if="showRightPane" content="Right Pane" />
    </e-panes>
  </ejs-splitter>
  <div class="absolute mt-40 -right-5 flex flex-col space-y-20">
    <button class="bg-primaryBlue text-white px-3 py-2.5 rounded-lg rotate-90" @click="toggleMiddlePane">
      Preview
    </button>
    <button class="bg-primaryBlue text-white px-3 py-2.5 rounded-lg rotate-90" @click="toggleRightPane">
      Metadata
    </button>
  </div>
</template>

<script setup>
import { createApp } from 'vue'
import LeftPane from './LeftPane.vue'
import MiddlePane from './MiddlePane.vue'

const pane1Content = createApp({}).component('LeftPane', LeftPane)
const pane2Content = createApp({}).component('MiddlePane', MiddlePane)
const leftPaneContent = function () {
  return {
    template: pane1Content,
  }
}
const middlePaneContent = function () {
  return {
    template: pane2Content,
  }
}
const showMiddlePane = ref(true)
const showRightPane = ref(true)

function toggleMiddlePane() {
  showMiddlePane.value = !showMiddlePane.value
}
function toggleRightPane() {
  showRightPane.value = !showRightPane.value
}
</script>

<style>
.e-splitter.e-splitter-horizontal .e-pane, .e-splitter.e-splitter-vertical .e-pane {
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  border: 1px solid #f0f1f2;
}
.e-splitter.e-splitter-horizontal, .e-splitter.e-splitter-vertical{
    border: none;
}
.e-splitter .e-split-bar.e-split-bar-horizontal{
    background-color: #f9fafb;
    border: none;
}
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover, .e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active{
    background-color: #f9fafb;
    border: none;
}

.e-split-bar.e-split-bar-horizontal.e-resizable-split-bar{
    width: 12px !important;
}
.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler{
    display: none;
}
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-resize-handler, .e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-resize-handler{
    background-color: #f9fafb;
    color: #f9fafb;
}
</style>
