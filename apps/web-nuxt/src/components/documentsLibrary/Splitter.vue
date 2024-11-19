<template class="relative doc-lib">
  <ejs-splitter id="default-splitter" class="mx-12 my-10" height="600px">
    <e-panes>
      <e-pane content="#leftPaneContent" size="25%" min="15%" />
      <e-pane v-if="showMiddlePane" size="50%" min="15%" content="#middlePaneContent" />
      <e-pane v-if="showRightPane" size="25%" min="15%" content="#rightPaneContent" />
    </e-panes>
  </ejs-splitter>
  <div class="absolute mt-40 -right-5 flex flex-col space-y-20">
    <button :class="showMiddlePane ? 'bg-blue-100' : 'bg-secondary '" class="px-3 py-2.5 rounded-lg rotate-90" @click="toggleMiddlePane">
      Preview
    </button>
    <button :class="showRightPane ? 'bg-blue-100' : 'bg-secondary '" class="px-3 py-2.5 rounded-lg rotate-90" @click="toggleRightPane">
      Metadata
    </button>
  </div>
  <div id="leftPaneContent">
    <Treeview />
  </div>
  <div id="middlePaneContent">
    <PdfViewer />
  </div>
  <div id="rightPaneContent">
    <RightPane />
  </div>
</template>

<script setup>
import Treeview from './Treeview.vue'
import PdfViewer from './PdfViewer.vue'
import RightPane from './RightPane.vue'

const selectedFile = ref(null)
function updateSelectedFile(file) {
  selectedFile.value = file
}
provide('updateSelectedFile', updateSelectedFile)
provide('selectedFile', selectedFile)
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
.e-splitter.e-splitter-horizontal, .e-splitter.e-splitter-vertical{
    border: none;
}
.e-navigation.e-pane.e-pane-horizontal.e-scrollable.e-static-pane.e-collapsed.e-pane-hidden,
.e-layout-content.e-pane.e-pane-horizontal.e-scrollable.e-resizable.e-expanded{
    border: none!important;
    padding: 0!important;
}
</style>

<style scoped>
.e-splitter.e-splitter-horizontal :deep(.e-pane), .e-splitter.e-splitter-vertical :deep(.e-pane) {
  border-radius: 8px;
  background-color: white;
  padding: 10px;
  border: 1px solid #f0f1f2;
}
.e-splitter :deep(.e-split-bar.e-split-bar-horizontal){
    background-color: #f9fafb;
    border: none;
}
.e-splitter :deep(.e-split-bar.e-split-bar-horizontal.e-split-bar-hover), .e-splitter :deep(.e-split-bar.e-split-bar-horizontal.e-split-bar-active){
    background-color: #f9fafb;
    border: none;
}

:deep(.e-split-bar.e-split-bar-horizontal.e-resizable-split-bar){
    width: 12px !important;
}
.e-splitter :deep(.e-split-bar.e-split-bar-horizontal .e-resize-handler){
    display: none;
}
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-resize-handler, .e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-active .e-resize-handler{
    background-color: #f9fafb;
    color: #f9fafb;
}
</style>
