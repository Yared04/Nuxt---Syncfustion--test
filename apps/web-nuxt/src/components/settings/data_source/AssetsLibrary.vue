<template>
  <EjsFilemanager
    id="file-manager"
    :context-menu-settings="contextMenuSettings"
    :toolbar-settings="toolbarSettings"
    :navigation-pane-settings="navigationPaneSettings"
    :upload-settings="uploadSettings"
    :ajax-settings="ajaxSettings"
    @before-send="beforeSend"
  >
    />
  </ejsfilemanager>
</template>

<script setup>
import {
  DetailsView,
  FileManagerComponent as EjsFilemanager,
  NavigationPane,
  Toolbar,
} from '@syncfusion/ej2-vue-filemanager'

const toast = useToast()
const hostUrl = 'https://node-js-fsp.onrender.com/'
const ajaxSettings = {
  url: hostUrl,
  uploadUrl: `${hostUrl}Upload`,
}

const uploadSettings = {
  autoUpload: true,
  autoClose: true,
}
// Toolbar settings including an upload button
const toolbarSettings = {
  items: [
    'Upload',
    'Cut',
    'Copy',
    'Paste',
    'Delete',
    'Rename',
    'SortBy',
    'Refresh',
    'Selection',
    'View',
    'Details',
  ],
  visible: true,
}

// Restrict context menu options
const contextMenuSettings = {
  file: ['Cut', 'Copy', '|', 'Delete', 'Rename', '|', 'Details'],
  folder: [
    'Open',
    '|',
    'Cut',
    'Copy',
    'Paste',
    '|',
    'Delete',
    'Rename',
    '|',
    'Details',
  ],
  layout: [
    'SortBy',
    'View',
    'Refresh',
    '|',
    'Paste',
    '|',
    'NewFolder',
    '|',
    'Details',
    '|',
    'SelectAll',
  ],
  visible: true,
}

// Navigation pane settings
const navigationPaneSettings = {
  visible: true,
  maxWidth: '850px',
  minWidth: '140px',

}

// create a folder list with allowed permissions
const folderPermissions = {
  'My Images': ['jpg', 'jpeg', 'png'],
  'Organization Assets': ['pdf', 'docx', 'xlsx'],
}

// use the beforeSend event to check if the file is allowed to be uploaded to the specified folder
function beforeSend(args) {
  if (args.action === 'Upload') {
    // get the path from args.ajaxSettings.data by Json parsing
    const json = JSON.parse(args.ajaxSettings.data)
    const path = json[0].path
    const fileExtension = json[3].filename.split('.').pop()
    const folder = path.split('/').slice(-2)[0]
    if (!folderPermissions[folder].includes(fileExtension)) {
      args.cancel = true
      // show a message if the file is not allowed
      toast.add({ severity: 'error', summary: 'Error', detail: 'The selected file type isn’t allowed in this folder.', life: 3000 })
    }
  }
}

provide('filemanager', [DetailsView, NavigationPane, Toolbar])
</script>

  <style></style>
