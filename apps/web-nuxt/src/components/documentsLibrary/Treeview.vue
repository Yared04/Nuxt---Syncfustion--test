<template>
  <div id="app">
    <div class="control_wrapper">
      <!-- Conditionally render the tree view only when data is ready -->
      <ejs-treeview
        id="treeView"
        :key="JSON.stringify(files)"
        :fields="treeFields"
        @node-selected="onNodeSelected"
      >
        <template #nodeTemplate="{ data }">
          <font-awesome-icon
            v-if="data.children && data.children.length > 0"
            class="mr-2"
            :icon="['far', 'folder']"
          />
          <span>{{ data.text }}</span>
        </template>
      </ejs-treeview>
    </div>
  </div>
</template>

<script setup>
const updateSelectedFile = inject('updateSelectedFile')
const files = ref([]) // Reactive reference for files
const idToNodeMap = ref({}) // Map to store node IDs
const treeFields = ref({
  dataSource: files.value,
  id: 'id', // Unique ID for each node
  parentID: 'parentID', // Parent ID for hierarchical relationships
  text: 'name', // Display name
  child: 'children', // Children mapping
})

let nodeId = 1 // Counter for generating unique IDs

// Fetch files from the GitHub API
async function fetchFiles(path = 'Images', parentID = null) {
  const apiUrl = `https://api.github.com/repos/Yared04/Node-js-FSP/contents/${path}`
  const headers = {
    Authorization: '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',
  }

  try {
    const response = await fetch(apiUrl, { headers })
    const fetchedData = await response.json()

    return fetchedData.map((item) => {
      const node = {
        id: nodeId++, // Assign unique ID
        parentID, // Assign parent ID
        name: item.name,
        path: item.path,
        download_url: item.download_url || null, // Add download URL
        isDirectory: item.type === 'dir',
        children: item.type === 'dir' ? [] : null, // Initialize children for directories
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
async function processFolders(data, parentID = null) {
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
  if (selectedNode && selectedNode.download_url)
    updateSelectedFile(selectedNode)
}
</script>

  <style scoped>
  /* Add your styles here */
  </style>
