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
  downloadUrl: `${hostUrl}Download`,
}
const uploadSettings = {
  autoUpload: true,
  autoClose: true,
}

// Toolbar settings including an upload button
const toolbarSettings = ref({
  items: [
    'Cut',
    'Copy',
    'Paste',
    'Delete',
    'Rename',
    'SortBy',
    'Refresh',
    'Upload',
    'View',
    'Details',
  ],
  visible: true,
})

const toolbarKey = ref(0)

watch(toolbarSettings, () => {
  toolbarKey.value += 1
})

// Restrict context menu options
const contextMenuSettings = ref({
  file: ['Cut', 'Copy', '|', 'Delete', 'Rename', '|', 'Download', '|', 'Details'],
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
})

// Navigation pane settings
const navigationPaneSettings = {
  visible: true,
  maxWidth: '1200px',
  minWidth: '140px',

}

// create a folder list with allowed permissions
const folderPermissions = {
  'My Images': ['jpg', 'jpeg', 'png'],
  'Organization Assets': ['pdf', 'docx', 'xlsx'],
}

// use the beforeSend event to check if the file is allowed to be uploaded to the specified folder
function beforeSend(args) {
  if (args.action === 'read') {
    const json = JSON.parse(args.ajaxSettings.data)
    const folder = json.path.split('/').slice(-2)[0]
    if (folder === 'Templates Library') {
      toolbarSettings.value = {
        ...toolbarSettings.value,
        items: ['Cut', 'Copy', 'Paste', 'Delete', 'Rename', 'SortBy', 'Refresh', 'View', 'Details'],
      }
      contextMenuSettings.value = {
        ...contextMenuSettings.value,
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'Details', '|', 'SelectAll'],
      }
    }

    else {
    // // Restore default toolbar items if not in 'Templates Library'
      toolbarSettings.value = {
        ...toolbarSettings.value,
        items: [
          'Cut',
          'Copy',
          'Paste',
          'Delete',
          'Rename',
          'SortBy',
          'Refresh',
          'Upload',
          'View',
          'Details',
        ],
      }
      contextMenuSettings.value = {
        ...contextMenuSettings.value,
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
      }
    }
  }

  else if (args.action === 'Upload') {
    const json = JSON.parse(args.ajaxSettings.data)
    const path = json && json[0]?.path
    const fileExtension = json && json[3]?.filename?.split('.')?.pop()
    const folder = path && path.split('/').slice(-2)[0]
    // get the path from args.ajaxSettings.data by Json parsing
    if (folder === 'Templates Library') {
      args.cancel = true
      toast.add({ severity: 'error', summary: 'Error', detail: 'You are not allowed to upload files to this folder.', life: 3000 })
    }
    else if (!folderPermissions[folder]?.includes(fileExtension)) {
      args.cancel = true
      // show a message if the file is not allowed
      toast.add({ severity: 'error', summary: 'Error', detail: 'The selected file type isn’t allowed in this folder.', life: 3000 })
    }
  }
}

provide('filemanager', [DetailsView, NavigationPane, Toolbar])
</script>

  <style>
@import url('assets/css/SyncFusion-Filemanager-custom-style.css');
</style>
