import { registerLicense } from '@syncfusion/ej2-base'

// plugins/syncfusion.js
import {
  DetailsView,
  FileManager,
  FileManagerPlugin,
  NavigationPane,
  Toolbar,
} from '@syncfusion/ej2-vue-filemanager'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FileManagerPlugin)
  FileManager.Inject(DetailsView, NavigationPane, Toolbar)
})

// Register your Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5DQmFIYVF2R2dJfFRxcV9HZkwxOX1dQl9nSH5RdERlWHhbdXdVQmk=')
