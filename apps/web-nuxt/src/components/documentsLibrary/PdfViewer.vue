<template>
  <ejs-pdfviewer
    ref="pdfViewer"
    :service-url="serviceUrl"
    :style="{ height: '550px', width: '100%' }"
    :document-path="selectedFile?.download_url"
  />
</template>

<script setup>
const selectedFile = inject('selectedFile')
const serviceUrl = 'https://services.syncfusion.com/vue/production/api/pdfviewer'
const pdfViewer = null
</script>
