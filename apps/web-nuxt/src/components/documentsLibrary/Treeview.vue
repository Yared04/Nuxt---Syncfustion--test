<template>
  <section id="app">
    <Title title="Name" />
    <div class="control_wrapper">
      <!-- Conditionally render the tree view only when data is ready -->
      <ejs-treeview
        id="treeView"
        :key="JSON.stringify(files)"
        :fields="treeFields"
        node-template="nodeTemplate"
        @node-selected="onNodeSelected"
      />
    </div>
  </section>
</template>

<script setup>
import Title from './Title.vue'

const updateSelectedFile = inject('updateSelectedFile')
const files = ref([])
const idToNodeMap = ref({})
const treeFields = ref({
  dataSource: files.value,
  id: 'id',
  parentID: 'parentID',
  text: 'name',
  child: 'children',
  iconCss: 'iconCss',
})

let nodeId = 1

// Fetch files from the GitHub API
async function fetchFiles(path = 'Images', parentID = null) {
  const apiUrl = `https://api.github.com/repos/Yared04/Node-js-FSP/contents/${path}`
  const headers = {
    Authorization: process.env.AUTHORIZATION_TOKEN,
  }

  try {
    const response = await fetch(apiUrl, { headers })
    const fetchedData = await response.json()

    return fetchedData.map((item) => {
      const node = {
        id: nodeId++,
        parentID,
        name: item.name,
        path: item.path,
        download_url: item.download_url || null,
        isDirectory: item.type === 'dir',
        children: item.type === 'dir' ? [] : null,
        iconCss: item.type === 'dir' ? 'e-fe-folder' : 'e-fe-pdf',
      }
      idToNodeMap.value[node.id] = node
      return node
    })
  }
  catch (error) {
    console.error('Error fetching files:', error)
    return []
  }
}

// Recursive function to fetch and process folder contents
async function processFolders(data, _parentID = null) {
  for (const item of data) {
    if (item.isDirectory) {
      const subfolderFiles = await fetchFiles(item.path, item.id) // Fetch subfolder contents
      item.children = await processFolders(subfolderFiles, item.id) // Recursively process children
    }
  }
  return data
}

// Initialize TreeView data
async function loadTree() {
  const rootData = await fetchFiles() // Fetch initial root-level files
  files.value = await processFolders(rootData) // Process folders recursively
  treeFields.value.dataSource = files.value // Assign the processed data to the TreeView
}

// Load the tree on mount
loadTree()

function onNodeSelected(args) {
  const selectedNodeId = args.nodeData.id // Get the selected node's ID
  const selectedNode = idToNodeMap.value[selectedNodeId] // Look up the node in the map
  if (selectedNode)
    updateSelectedFile(selectedNode)
}
</script>

<style scoped>
.folder-icon{
  color: inherit;
  font-size: 18px;
}
:deep(.e-fe-folder) {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath fill="%236b7280" d="M64 464h384c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48H301.3c-12.7 0-24.9-5.1-33.9-14.1L231.4 62.1c-9-9-21.2-14.1-33.9-14.1H64C37.5 48 16 69.5 16 96v320c0 26.5 21.5 48 48 48zm384 16H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h133.5c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64z" /%3E%3C/svg%3E');
}
:deep(.e-list-item.e-active> .e-text-content .e-list-icon.e-fe-folder)
{
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath d="M64 464h384c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48H301.3c-12.7 0-24.9-5.1-33.9-14.1L231.4 62.1c-9-9-21.2-14.1-33.9-14.1H64C37.5 48 16 69.5 16 96v320c0 26.5 21.5 48 48 48zm384 16H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h133.5c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64z" fill="%23009EE2"/%3E%3C/svg%3E');
}
:deep(.e-fe-pdf) {
    background-image: url('data:image/svg+xml,%3Csvg width="auto" height="auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cg clip-path="url(%23clip0)"%3E%3Cg filter="url(%23filter0_i)"%3E%3Cpath d="M9 40H31C33.2091 40 35 38.2091 35 36V10L25 0H9C6.79086 0 5 1.79086 5 4V36C5 38.2091 6.79086 40 9 40Z" fill="%23FF8484"/%3E%3C/g%3E%3Cg filter="url(%23filter1_d)"%3E%3Cpath d="M27 10H35L25 0V8C25 9.10457 25.8954 10 27 10Z" fill="white" fill-opacity="0.5"/%3E%3C/g%3E%3Cpath d="M8.75 28.75V23.75M8.75 23.75V18.75H11.75C12.8546 18.75 13.75 19.6454 13.75 20.75V21.75C13.75 22.8546 12.8546 23.75 11.75 23.75H8.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M26.25 28.75V23.75V18.75H32.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M26.25 23.75H31.25" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M20.5 18.75H17.5V28.75H20.5C21.6046 28.75 22.5 27.8546 22.5 26.75V20.75C22.5 19.6454 21.6046 18.75 20.5 18.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id="filter0_i" x="5" y="0" width="30" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/%3E%3CfeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation="2"/%3E%3CfeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/%3E%3CfeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/%3E%3CfeBlend mode="normal" in2="shape" result="effect1_innerShadow"/%3E%3C/filter%3E%3Cfilter id="filter1_d" x="23" y="-1" width="14" height="14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/%3E%3CfeOffset dy="1"/%3E%3CfeGaussianBlur stdDeviation="1"/%3E%3CfeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/%3E%3CfeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/%3E%3CfeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/%3E%3C/filter%3E%3CclipPath id="clip0"%3E%3Crect width="40" height="40" fill="white"/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A');
}
/* Custom styles for the TreeView */
:deep(.e-treeview .e-list-item .e-list-text){
  color: #6b7280!important;
  white-space: nowrap;          /* Prevent text from wrapping */
  overflow: hidden;             /* Hide overflow text */
  text-overflow: ellipsis;
}

:deep(.e-treeview .e-list-item.e-active){
  font-weight: 400;
}
/* Active State */
:deep(.e-treeview .e-list-item.e-active > .e-text-content),
:deep(.e-treeview .e-list-item.e-active > .e-fullrow)
{
    color: #009EE2 !important;
    background-color: #f9fafb !important;
    border-color: #f9fafb;
}
/* Hover State */
:deep(.e-treeview .e-list-item.e-hover > .e-text-content),
:deep(.e-treeview .e-list-item.e-hover > .e-fullrow){
    background-color: #f9fafb !important;
    border-color: #f9fafb;
    color: #6b7280;
}
/* active and hover state */
:deep(.e-treeview .e-list-item.e-active.e-hover > .e-fullrow),
:deep(.e-treeview .e-list-item.e-active.e-hover > .e-text-content),
:deep(.e-treeview .e-list-item.e-active.e-node-focus > .e-fullrow) {
    background-color: #f9fafb !important;
    color: #009EE2 !important;
}
:deep(.e-treeview .e-list-item.e-active > .e-text-content .e-list-text),
:deep(.e-treeview .e-list-item.e-hover > .e-text-content .e-list-text),
:deep(.e-treeview .e-list-item.e-hover > .e-text-content .e-icons),
:deep(.e-treeview .e-list-item.e-active > .e-text-content .e-icons) {
    color: inherit !important;
}
</style>
