<template>
  <div>
    <div class="flex justify-end mb-2 pr-4">
      <button
        class="px-4 py-2 rounded-lg text-primaryBlue hover:bg-primaryBlue hover:text-white border border-primaryBlue"
        @click="toggleEditMode"
      >
        <span class=""><font-awesome-icon v-if="isEditing" :icon="['fal', 'floppy-disk']" /><font-awesome-icon v-else :icon="['fal', 'pen-to-square']" /></span>
      </button>
    </div>
    <ejs-dashboardlayout
      id="defaultLayout"
      ref="dashboard"
      class="mx-auto"
      :allow-dragging="isEditing"
      :columns="2"
      :cell-spacing="cellSpacing"
      :cell-aspect-ratio="cellAspectRatio"
      :allow-floating="true"
    >
      <e-panels>
        <e-panel
          v-for="(panel, index) in panels"
          :key="index"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panel.row"
          :col="panel.col"
          :size-x="panel.sizeX"
          :size-y="panel.sizeY"
          :content="panel.content"
        />
      </e-panels>
    </ejs-dashboardlayout>
  </div>
</template>

<script setup>
import { createApp, onMounted, ref } from 'vue'
import Card from './Card.vue'

const cellSpacing = [10, 10]
const cellAspectRatio = 100 / 27
const isEditing = ref(false)
const dashboard = ref(null)

// Define the KPI Content as a Vue component
const KPICards = createApp({}).component('KPICards', {
  components: { Card },
  data() {
    return {}
  },
  template: `
      <div id="KPIContent" class="flex h-full overflow-auto p-2 space-x-4">
        <Card title="Documents generated this month" amount="100" icon="/google-docs.png" />
        <Card title="Card 2" amount="200" icon="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" />
        <Card title="Card 3" amount="300" icon="https://cdn-icons-png.flaticon.com/512/1822/1822899.png" />
      </div>
    `,
})

const favourites = createApp({}).component('FavouriteTemplates', {
  components: { Card },
  data() {
    return {}
  },
  template: `<div class="panel-content">3</div>`,
})

const card3 = createApp({}).component('Card3', {
  components: { Card },
  data() {
    return {}
  },
  template: `<div class="panel-content">4</div>`,
})

const card4 = createApp({}).component('Card4', {
  components: { Card },
  data() {
    return {}
  },
  template: `<div class="panel-content">5</div>`,
})
// Map to store the content functions for different panels
const contentFunctionsMap = {
  panel1() {
    return { template: KPICards }
  },
  // Define more mappings for future panels here
  panel2() {
    return { template: favourites }
  },
  panel3() {
    return { template: card3 }
  },
  panel4() {
    return { template: card4 }
  },
}

// Define initial panel configurations
const panels = ref([
  { row: 0, col: 0, sizeX: 2, sizeY: 1, content: 'panel1', id: 'panel1' }, // Using the mapping key
  { row: 1, col: 0, sizeX: 2, sizeY: 1, content: 'panel2', id: 'panel2' },
  { row: 2, col: 0, sizeX: 1, sizeY: 1, content: 'panel3', id: 'panel3' },
  { row: 2, col: 1, sizeX: 1, sizeY: 1, content: 'panel4', id: 'panel4' },
])

function toggleEditMode() {
  if (isEditing.value) {
    // Save current panel positions when leaving edit mode
    const currentPanels = dashboard.value.serialize() // Get serialized panel data
    panels.value = currentPanels.map((panel, index) => ({
      row: panel.row,
      col: panel.col,
      sizeX: panel.sizeX,
      sizeY: panel.sizeY,
      id: panels.value[index]?.id,
      content: panels.value[index]?.content || ``, // Match content by index
    }))
    localStorage.setItem('dashboardPanels', JSON.stringify(panels.value.map(panel => ({ ...panel, content: panel.id }))))
  }
  isEditing.value = !isEditing.value // Toggle between edit and save mode
}

onMounted(() => {
  // Load panels from localStorage on mount
  const storedPanels = localStorage.getItem('dashboardPanels')
  if (storedPanels)
    panels.value = JSON.parse(storedPanels)

  // Map content functions to panels dynamically on load
  panels.value.forEach((panel) => {
    if (panel.content && contentFunctionsMap[panel.content])
      panel.content = contentFunctionsMap[panel.content] // Map the panel to the corresponding content function
  })
})
</script>

  <style>
  .editing-mode {
    border: 1px dotted #009ee2;
    border-radius: inherit;
  }

  button {
    cursor: pointer;
  }
  </style>
