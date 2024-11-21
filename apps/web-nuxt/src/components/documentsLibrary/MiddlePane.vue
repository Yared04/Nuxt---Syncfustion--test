<template>
  <section>
    <Title title="Preview" :show-collapse="true" />
    <ejs-pdfviewer
      v-if="selectedFile?.download_url"
      ref="pdfViewer"
      :resource-url="resourceUrl"
      :style="{ height: '530px', width: '100%' }"
      :document-path="selectedFile?.download_url"
      :toolbar-settings="toolbarSettings"
      :enable-bookmark="false"
    />
    <div v-else>
      <!-- <img class="w-auto h-96 m-auto" src="../../assets/select-file.jpg" alt="select-file" />
      <p class="text-center text-l">
        Select a document to preview
      </p> -->
      <ejs-filemanager
        id="file-manager"
        :ajax-settings="ajaxSettings"
      />
    </div>
  </section>
</template>

<script setup>
import Title from './Title.vue'

const selectedFile = inject('selectedFile')
const resourceUrl = 'https://cdn.syncfusion.com/ej2/26.2.11/dist/ej2-pdfviewer-lib'
const pdfViewer = null
const toolbarSettings = { showTooltip: true, toolbarItems: ['PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'SearchOption', 'DownloadOption'] }
const hostUrl = 'https://node-js-fsp.onrender.com'
const ajaxSettings = {
  url: hostUrl,
  uploadUrl: `${hostUrl}/Upload`,
}
</script>
