import { registerLicense } from '@syncfusion/ej2-base'
import { FileManagerPlugin } from '@syncfusion/ej2-vue-filemanager'
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-vue-layouts'
import { TreeViewPlugin } from '@syncfusion/ej2-vue-navigations'
import { Annotation, BookmarkView, FormDesigner, FormFields, LinkAnnotation, Magnification, Navigation, PdfViewer, PdfViewerPlugin, Print, TextSearch, TextSelection, ThumbnailView, Toolbar } from '@syncfusion/ej2-vue-pdfviewer'
import { defineNuxtPlugin } from '#app'

// plugins/syncfusion.js

export default defineNuxtPlugin((nuxtApp) => {
  // Register your Syncfusion license key
  registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5DQmFIYVF2R2dJfFRxcV9HZkwxOX1dQl9nSH5RdERlWHhbdXdVQmk=')
  nuxtApp.vueApp.component('EjsSplitter', SplitterComponent)
  nuxtApp.vueApp.component('EPane', PaneDirective)
  nuxtApp.vueApp.component('EPanes', PanesDirective)
  nuxtApp.vueApp.use(TreeViewPlugin)
  nuxtApp.vueApp.use(PdfViewerPlugin)
  nuxtApp.vueApp.use(FileManagerPlugin)

  PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields)
})
