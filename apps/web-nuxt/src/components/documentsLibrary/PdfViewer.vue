<template>
  <ejs-pdfviewer
    ref="pdfViewer"
    :service-url="serviceUrl"
    :document-path="documentPath"
    :style="{ height: '800px', width: '1200px' }"
  />
</template>

<script setup>
const serviceUrl = 'https://services.syncfusion.com/vue/production/api/pdfviewer'
const documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf'
const pdfViewer = null
</script>
