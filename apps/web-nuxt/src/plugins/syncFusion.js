import { registerLicense } from '@syncfusion/ej2-base'
import {
  DetailsView,
  FileManager,
  FileManagerPlugin,
  NavigationPane,
  Toolbar,
} from '@syncfusion/ej2-vue-filemanager'
import { defineNuxtPlugin } from '#app'

// plugins/syncfusion.js

export default defineNuxtPlugin((nuxtApp) => {
  // Register your Syncfusion license key
  registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5DQmFIYVF2R2dJfFRxcV9HZkwxOX1dQl9nSH5RdERlWHhbdXdVQmk=')

  nuxtApp.vueApp.use(FileManagerPlugin)
  FileManager.Inject(DetailsView, NavigationPane, Toolbar)
})
