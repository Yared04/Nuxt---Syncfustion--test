<template>
  <section>
    <Title title="Preview" />
    <ejs-pdfviewer
      v-if="selectedFile?.download_url"
      ref="pdfViewer"
      :service-url="serviceUrl"
      :style="{ height: '530px', width: '100%' }"
      :document-path="selectedFile?.download_url"
    />
    <div v-else>
      <img class="w-auto h-96 m-auto" src="../../assets/select-file.jpg" alt="select-file" />
      <p class="text-center text-l">
        Select a document to preview
      </p>
    </div>
  </section>
</template>

<script setup>
import Title from './Title.vue'

const selectedFile = inject('selectedFile')
const serviceUrl = 'https://services.syncfusion.com/vue/production/api/pdfviewer'
const pdfViewer = null
</script>
