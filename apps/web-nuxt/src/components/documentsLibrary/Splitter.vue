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
.doc-lib :deep(.e-pane)::-webkit-scrollbar {
  width: 8px; /* Adjust scrollbar width */
  border-radius: 8px; /* Add border radius */
}

.doc-lib :deep(.e-pane)::-webkit-scrollbar-thumb {
  background-color: #009EE2; /* Change scrollbar thumb color */
  border-radius: 8px; /* Add border radius to thumb */
}

.doc-lib :deep(.e-pane)::-webkit-scrollbar-track {
  background-color: #f9fafb; /* Change scrollbar track color */
}

.doc-lib :deep(.e-pane)::-webkit-scrollbar-button {
  display: none; /* Remove up/down buttons */
}

/* Optional: Hover effect for thumb */
.doc-lib :deep(.e-pane)::-webkit-scrollbar-thumb:hover {
  background-color: #0078A0; /* Darker color on hover */
}
.doc-lib :deep(.e-pane) {
  scrollbar-color: #009EE2 #f9fafb; /* Thumb and track colors */
  scrollbar-width: thin; /* Narrow scrollbar */
}
</style>

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
