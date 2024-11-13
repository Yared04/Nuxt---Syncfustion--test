<template class="text-blue-400">
  <EjsFilemanager
    id="file-manager"
    :context-menu-settings="contextMenuSettings"
    :toolbar-settings="toolbarSettings"
    :navigation-pane-settings="navigationPaneSettings"
    :upload-settings="uploadSettings"
    :ajax-settings="ajaxSettings"
    :show-item-check-boxes="false"
    path="/Assets Library"
    root-alias-name="Images"
    @before-send="beforeSend"
    @popup-open="onPopupOpen"
    @before-popup-open="beforePopupOpen"
    @file-open="fileOpen"
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

let currentFolder = ref('')

// create a folder list with allowed permissions
const folderPermissions = {
  'My Images': ['jpg', 'jpeg', 'png', 'svg'],
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
    const path = json[0].path
    const fileExtension = json[3].filename.split('.').pop()
    const folder = path.split('/').slice(-2)[0]
    if (folder === 'Templates Library') {
      args.cancel = true
    }
    else if (folderPermissions[folder] && !folderPermissions[folder].includes(fileExtension)) {
      args.cancel = true
      // show a message if the file is not allowed
      toast.add({ severity: 'error', summary: 'Error', detail: 'The selected file type isn’t allowed in this folder.', life: 3000 })
    }
  }
}

function outsideClickHandler(event, args) {
  if (
    args.popupModule
    && args.popupModule.element
    && !args.popupModule.element.contains(event.target)
  ) {
    // Close the popup using hide()
    args.popupModule.hide()

    // Remove the event listener once the popup is closed
    document.removeEventListener('mousedown', e => outsideClickHandler(e, args))
  }
}

// To close the popup when clicked outside
function onPopupOpen(args) {
  // Check if popupModule and element exist before proceeding
  if (!args.popupModule || !args.popupModule.element) {
    console.warn('Popup module or element is not available.')
    return
  }

  // Add the event listener when the popup opens
  document.addEventListener('mousedown', e => outsideClickHandler(e, args))
}

// To get the current folder name
function fileOpen(args) {
  currentFolder = args.fileDetails.name
  updateDropZoneMessage(currentFolder)
}

function beforePopupOpen(args) {
  if (args.popupName === 'Upload' && currentFolder === 'Templates Library') {
    // disableDropZone()
    args.cancel = true
    toast.add({ severity: 'error', summary: 'Error', detail: 'You are not allowed to upload files to this folder.', life: 3000 })
  }
}

function updateDropZoneMessage(folderName) {
  const dropZone = document.querySelector('.e-filemanager .e-fe-overlay')
  // Clear any previous message if it exists
  const existingMessage = dropZone.querySelector('.drop-zone-message')
  if (existingMessage)
    existingMessage.remove()

  // Create and style the message container
  const messageContainer = document.createElement('div')
  messageContainer.className = 'drop-zone-message'
  messageContainer.style.position = 'absolute'
  messageContainer.style.top = '50%'
  messageContainer.style.left = '50%'
  messageContainer.style.transform = 'translate(-50%, -50%)'
  messageContainer.style.textAlign = 'center'

  // Create the icon (you can use an icon of your choice)
  const icon = document.createElement('div')
  icon.className = 'drop-zone-icon'
  icon.style.fontSize = '24px'
  icon.style.marginBottom = '16px'
  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="70" height="70" fill="#009EE2"><path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>'

  // Create the message text
  const messageText = document.createElement('div')
  messageText.style.fontSize = '18px'
  messageText.style.color = '#009EE2'
  messageText.innerHTML = `Drop your items here`

  // Get allowed file formats based on folder
  const allowedFormats = folderPermissions[folderName]
  let fileFormatsMessage = ''

  if (allowedFormats) {
    fileFormatsMessage = `Supported file formats: <br> ${allowedFormats.join(', ')}`
  }
  else {
    messageText.innerHTML = 'Uploading isn\'t allowed in this folder'
    messageText.style.color = 'red'
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50" height="50" fill="#fa4441"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>'
  }

  // Create the file formats message
  const fileFormatsText = document.createElement('div')
  fileFormatsText.style.fontSize = '13px'
  fileFormatsText.innerHTML = fileFormatsMessage

  // Append elements to the message container
  messageContainer.appendChild(icon)
  messageContainer.appendChild(messageText)
  messageContainer.appendChild(fileFormatsText)

  // Append the message container to the drop zone
  dropZone.appendChild(messageContainer)
}

provide('filemanager', [DetailsView, NavigationPane, Toolbar])
</script>

<style>
/* Upload dropzone styles */
.e-filemanager .e-fe-overlay{
  background-color: rgba(249, 250, 251, 0.6);
}
.drop-zone-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.e-toolbar-items.e-tbar-pos {
  margin-top: -17px;
}

/* General Active State */
.e-treeview .e-list-item.e-active > .e-text-content,
.e-treeview .e-list-item.e-active > .e-fullrow {
    color: #009EE2 !important;
    background-color: #f9fafb !important;
    border: none;
}

/* Hover State */
.e-treeview .e-list-item.e-hover > .e-text-content,
.e-treeview .e-list-item.e-hover > .e-fullrow {
    color: #009EE2 !important;
    background-color: #f9fafb !important;
    border: none;
}

/* Active and Hover Combined State */
.e-treeview .e-list-item.e-active.e-hover > .e-fullrow,
.e-treeview .e-list-item.e-active.e-hover > .e-text-content,
.e-treeview .e-list-item.e-active.e-node-focus > .e-fullrow {
    background-color: #f9fafb !important;
    color: #009EE2 !important;
}

/* Text Color */
.e-treeview .e-list-item.e-active > .e-text-content .e-list-text,
.e-treeview .e-list-item.e-hover > .e-text-content .e-list-text {
    color: inherit !important;
}

.e-treeview .e-list-item.e-active{
  font-weight: 400;
}
.e-listview .e-list-header {
  font-size: 13px;
}
.e-treeview .e-list-text {
  font-size: 13px;
}
.e-filemanager .e-address .e-search-wrap .e-input-group .e-input{
  font-size: 13px;
}
.e-filemanager .e-address .e-list-text {
  font-size: 13px;
  font-weight: 400;
}
.e-filemanager .e-address .e-list-text:hover {
  color: #009EE2 !important;
}

.e-filemanager .e-large-icons .e-large-icon.e-active {
  color:#009EE2;
  background-color: #f9fafb;
}
.e-filemanager .e-large-icons .e-large-icon.e-active:hover {
background-color: #f9fafb;
border-color: #f9fafb
}

.e-filemanager .e-large-icons .e-large-icon:hover {
  color:#009EE2;
  background-color: #f9fafb;
}
.e-filemanager .e-large-icons .e-large-icon.e-focus {
  border-color: #f9fafb;
}

.e-filemanager .e-large-icons .e-list-text {
  font-size: 13px;
}
.e-dialog .e-dlg-content{
  font-size: 13px;
}
.e-upload .e-upload-files .e-upload-file-list .e-file-container .e-file-name{
  font-size: 13px;
}
.e-upload .e-upload-files .e-upload-file-list .e-file-container .e-file-type {
  font-size: 13px;
}
.e-upload .e-upload-files .e-upload-file-list .e-file-container .e-file-status, .e-upload .e-upload-files .e-upload-file-list .e-file-container .e-file-information {
  font-size: 13px;
}
.e-dialog .e-dlg-header{
  font-size: 14px;
}
.e-fe-popup.e-dialog td {
  font-size: 13px;
}
.e-filemanager .e-fe-folder {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath fill="%236b7280" d="M64 464h384c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48H301.3c-12.7 0-24.9-5.1-33.9-14.1L231.4 62.1c-9-9-21.2-14.1-33.9-14.1H64C37.5 48 16 69.5 16 96v320c0 26.5 21.5 48 48 48zm384 16H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h133.5c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64z" /%3E%3C/svg%3E');
}
.e-list-item.e-active> .e-text-content .e-list-icon.e-fe-folder {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath d="M64 464h384c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48H301.3c-12.7 0-24.9-5.1-33.9-14.1L231.4 62.1c-9-9-21.2-14.1-33.9-14.1H64C37.5 48 16 69.5 16 96v320c0 26.5 21.5 48 48 48zm384 16H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h133.5c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64z" fill="%23009EE2"/%3E%3C/svg%3E');
}
.e-list-item.e-hover> .e-text-content .e-list-icon.e-fe-folder {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath d="M64 464h384c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48H301.3c-12.7 0-24.9-5.1-33.9-14.1L231.4 62.1c-9-9-21.2-14.1-33.9-14.1H64C37.5 48 16 69.5 16 96v320c0 26.5 21.5 48 48 48zm384 16H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h133.5c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64z" fill="%23009EE2"/%3E%3C/svg%3E');
}
.e-list-item.e-level-1[title="Images"] > .e-text-content .e-list-icon.e-fe-folder {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M448%20464L64%20464c-26.5%200-48-21.5-48-48L16%2096c0-26.5%2021.5-48%2048-48l133.5%200c12.7%200%2024.9%205.1%2033.9%2014.1l35.9%2035.9c9%209%2021.2%2014.1%2033.9%2014.1L448%20112c26.5%200%2048%2021.5%2048%2048l0%20256c0%2026.5-21.5%2048-48%2048zM64%20480l384%200c35.3%200%2064-28.7%2064-64l0-256c0-35.3-28.7-64-64-64L301.3%2096c-8.5%200-16.6-3.4-22.6-9.4L242.7%2050.7c-12-12-28.3-18.7-45.3-18.7L64%2032C28.7%2032%200%2060.7%200%2096L0%20416c0%2035.3%2028.7%2064%2064%2064zM168%20208a40%2040%200%201%200%20-80%200%2040%2040%200%201%200%2080%200zm-40-24a24%2024%200%201%201%200%2048%2024%2024%200%201%201%200-48zm167.9%2040c2.3%200%204.5%201.2%205.7%203.1L407.3%20393.3c.5%20.7%20.7%201.5%20.7%202.4c0%202.4-2%204.4-4.4%204.4l-295.3%200c-2.4%200-4.3-1.9-4.3-4.3c0-.8%20.3-1.7%20.7-2.4L162%20307.5c1.4-2.2%203.9-3.5%206.4-3.5c2.4%200%204.6%201.1%206.1%202.9L201.8%20341c1.6%202%204%203.1%206.6%203s4.9-1.4%206.3-3.6L290.3%20227c1.3-1.9%203.4-3%205.6-3zM277%20218.1L207.4%20322.5%20187%20296.9c-4.5-5.6-11.3-8.9-18.5-8.9c-7.9%200-15.4%204-19.8%2010.6L91.4%20384.5c-2.2%203.3-3.4%207.2-3.4%2011.3c0%2011.2%209.1%2020.3%2020.3%2020.3l295.3%200c11.3%200%2020.4-9.1%2020.4-20.4c0-3.9-1.1-7.7-3.2-11L315.1%20218.5c-4.2-6.6-11.4-10.5-19.2-10.5c-7.6%200-14.7%203.8-18.9%2010.1z%22%2F%3E%3C%2Fsvg%3E');
}
.e-list-item.e-level-1.e-active[title="Images"] > .e-text-content .e-list-icon.e-fe-folder {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%20fill%3D%22%23009EE2%22%3E%3Cpath%20d%3D%22M448%20464L64%20464c-26.5%200-48-21.5-48-48L16%2096c0-26.5%2021.5-48%2048-48l133.5%200c12.7%200%2024.9%205.1%2033.9%2014.1l35.9%2035.9c9%209%2021.2%2014.1%2033.9%2014.1L448%20112c26.5%200%2048%2021.5%2048%2048l0%20256c0%2026.5-21.5%2048-48%2048zM64%20480l384%200c35.3%200%2064-28.7%2064-64l0-256c0-35.3-28.7-64-64-64L301.3%2096c-8.5%200-16.6-3.4-22.6-9.4L242.7%2050.7c-12-12-28.3-18.7-45.3-18.7L64%2032C28.7%2032%200%2060.7%200%2096L0%20416c0%2035.3%2028.7%2064%2064%2064zM168%20208a40%2040%200%201%200%20-80%200%2040%2040%200%201%200%2080%200zm-40-24a24%2024%200%201%201%200%2048%2024%2024%200%201%201%200-48zm167.9%2040c2.3%200%204.5%201.2%205.7%203.1L407.3%20393.3c.5%20.7%20.7%201.5%20.7%202.4c0%202.4-2%204.4-4.4%204.4l-295.3%200c-2.4%200-4.3-1.9-4.3-4.3c0-.8%20.3-1.7%20.7-2.4L162%20307.5c1.4-2.2%203.9-3.5%206.4-3.5c2.4%200%204.6%201.1%206.1%202.9L201.8%20341c1.6%202%204%203.1%206.6%203s4.9-1.4%206.3-3.6L290.3%20227c1.3-1.9%203.4-3%205.6-3zM277%20218.1L207.4%20322.5%20187%20296.9c-4.5-5.6-11.3-8.9-18.5-8.9c-7.9%200-15.4%204-19.8%2010.6L91.4%20384.5c-2.2%203.3-3.4%207.2-3.4%2011.3c0%2011.2%209.1%2020.3%2020.3%2020.3l295.3%200c11.3%200%2020.4-9.1%2020.4-20.4c0-3.9-1.1-7.7-3.2-11L315.1%20218.5c-4.2-6.6-11.4-10.5-19.2-10.5c-7.6%200-14.7%203.8-18.9%2010.1z%22%2F%3E%3C%2Fsvg%3E');
}
.e-list-item.e-level-1.e-hover[title="Images"] > .e-text-content .e-list-icon.e-fe-folder {
  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%20fill%3D%22%23009EE2%22%3E%3Cpath%20d%3D%22M448%20464L64%20464c-26.5%200-48-21.5-48-48L16%2096c0-26.5%2021.5-48%2048-48l133.5%200c12.7%200%2024.9%205.1%2033.9%2014.1l35.9%2035.9c9%209%2021.2%2014.1%2033.9%2014.1L448%20112c26.5%200%2048%2021.5%2048%2048l0%20256c0%2026.5-21.5%2048-48%2048zM64%20480l384%200c35.3%200%2064-28.7%2064-64l0-256c0-35.3-28.7-64-64-64L301.3%2096c-8.5%200-16.6-3.4-22.6-9.4L242.7%2050.7c-12-12-28.3-18.7-45.3-18.7L64%2032C28.7%2032%200%2060.7%200%2096L0%20416c0%2035.3%2028.7%2064%2064%2064zM168%20208a40%2040%200%201%200%20-80%200%2040%2040%200%201%200%2080%200zm-40-24a24%2024%200%201%201%200%2048%2024%2024%200%201%201%200-48zm167.9%2040c2.3%200%204.5%201.2%205.7%203.1L407.3%20393.3c.5%20.7%20.7%201.5%20.7%202.4c0%202.4-2%204.4-4.4%204.4l-295.3%200c-2.4%200-4.3-1.9-4.3-4.3c0-.8%20.3-1.7%20.7-2.4L162%20307.5c1.4-2.2%203.9-3.5%206.4-3.5c2.4%200%204.6%201.1%206.1%202.9L201.8%20341c1.6%202%204%203.1%206.6%203s4.9-1.4%206.3-3.6L290.3%20227c1.3-1.9%203.4-3%205.6-3zM277%20218.1L207.4%20322.5%20187%20296.9c-4.5-5.6-11.3-8.9-18.5-8.9c-7.9%200-15.4%204-19.8%2010.6L91.4%20384.5c-2.2%203.3-3.4%207.2-3.4%2011.3c0%2011.2%209.1%2020.3%2020.3%2020.3l295.3%200c11.3%200%2020.4-9.1%2020.4-20.4c0-3.9-1.1-7.7-3.2-11L315.1%20218.5c-4.2-6.6-11.4-10.5-19.2-10.5c-7.6%200-14.7%203.8-18.9%2010.1z%22%2F%3E%3C%2Fsvg%3E');
}

.e-filemanager .e-navigation.e-pane {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.e-control.e-toolbar.e-lib.e-keyboard.e-toolpop {
  background: #ffffff;
}
.e-toolbar .e-toolbar-item .e-tbar-btn{
  background-color: #ffffff;
}
.e-toolbar .e-toolbar-item .e-tbar-btn .e-tbar-btn-text{
  font-size: 13px;
}

.e-toolbar.e-extended-toolbar .e-toolbar-extended.e-toolbar-pop .e-toolbar-item .e-tbar-btn .e-icons.e-btn-icon {
  font-size: 13px;
}
.e-toolbar .e-toolbar-item .e-tbar-btn:hover {
  background-color: #f9fafb;
  color: #009EE2;
}

.e-toolbar .e-toolbar-item .e-tbar-btn:hover .e-icons,
.e-toolbar .e-toolbar-item .e-tbar-btn:hover .e-tbar-btn-text {
  color: inherit;
}

.e-toolbar .e-toolbar-item .e-tbar-btn.active {
  background-color: #f9fafb;
  color: #009EE2;
}

.e-toolbar .e-toolbar-item .e-tbar-btn.active .e-icons,
.e-toolbar .e-toolbar-item .e-tbar-btn.active .e-tbar-btn-text {
  color: inherit;
}

.e-filemanager .e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.e-btn.e-tbar-btn:hover {
  background-color: #f9fafb;
}
.e-filemanager .e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.e-btn.e-tbar-btn.e-active {
  background-color: #f9fafb;
  color:#009EE2;
}
.e-filemanager .e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.e-btn.e-tbar-btn.e-active .e-tbar-btn-text.e-tbar-ddb-text, .e-filemanager .e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.e-btn.e-tbar-btn.e-active .e-icons.e-btn-icon {
  color: inherit;
}
.e-filemanager .e-toolbar .e-toolbar-items .e-toolbar-item .e-dropdown-btn.e-btn.e-tbar-btn:focus {
  background-color: #f9fafb;
}

.e-dropdown-popup .e-item:hover {
  background-color: #f9fafb !important;
  color: #009EE2 !important;
}
.e-fe-popup.e-dropdown-popup ul .e-item .e-fe-dot{
  color: inherit;
}
.e-dropdown-popup ul {
  font-size: 13px;
}
.e-treeview .e-popup .e-content{
  font-size: 13px;
}
.e-filemanager .e-grid .e-gridheader .e-headercell .e-headertext {
  font-size: 13px;
}
.e-filemanager .e-grid .e-content .e-rowcell {
  font-size: 13px;
}
.e-filemanager .e-grid .e-content .e-rowcell.e-active {
  color: #009EE2;
  background-color: #f9fafb;
}
.e-filemanager .e-grid .e-content .e-row:hover .e-rowcell {
  color: #009EE2 !important;
  background-color: #f9fafb !important;
}

.e-filemanager .e-grid .e-content .e-row:hover .e-rowcell:hover {
  color: #009EE2;
  background-color: #f9fafb !important;
}
.e-contextmenu-wrapper ul .e-menu-item.e-selected, .e-contextmenu-container ul .e-menu-item.e-selected{
  background-color: #f9fafb;
  color: #009EE2;
}
.e-contextmenu-wrapper ul .e-menu-item:hover, .e-contextmenu-container ul .e-menu-item:hover{
  background-color: #f9fafb;
  color: #009EE2;
}
.e-contextmenu-wrapper ul, .e-contextmenu-container ul{
  font-size: 13px;
}
.e-contextmenu-wrapper ul .e-menu-item.e-selected .e-menu-icon, .e-contextmenu-container ul .e-menu-item.e-selected .e-menu-icon{
  color: inherit;
}
.e-contextmenu-wrapper ul .e-menu-item:hover .e-menu-icon, .e-contextmenu-container ul .e-menu-item:hover .e-menu-icon{
  color: inherit;
}
</style>
