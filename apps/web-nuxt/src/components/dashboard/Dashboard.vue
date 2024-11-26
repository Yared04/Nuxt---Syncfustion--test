<template>
  <div>
    <!-- Toggle Edit Mode -->
    <div class="flex justify-end mb-2 pr-4">
      <button
        class="px-4 py-2 rounded-lg text-primaryBlue hover:bg-primaryBlue hover:text-white border border-primaryBlue"
        @click="toggleEditMode"
      >
        <font-awesome-icon v-if="isEditing" :icon="['fal', 'floppy-disk']" />
        <font-awesome-icon v-else :icon="['fal', 'pen-to-square']" />
      </button>
    </div>

    <!-- Hidden Panel Chips -->
    <div v-if="isEditing" class="flex space-x-2 mb-4">
      <button
        v-for="(panel, id) in Object.entries(panelsConfig).filter(([key, panel]) => !panel.visible)"
        :key="id"
        class="border-primaryBlue rounded-lg text-primaryBlue px-4 py-2 hover:bg-primaryBlue hover:text-white border"
        @click="addHiddenPanel(panel[0])"
      >
        <span class="capitalize">
          <font-awesome-icon :icon="['fal', 'plus']" class="mr-2" />{{ panel[0] }}
        </span>
      </button>
    </div>

    <!-- Dashboard Layout -->
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
        <!-- Loop through panels and set dynamic content based on panel config -->
        <e-panel
          v-if="panelsConfig.panel1.visible"
          id="panel1"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panelsConfig.panel1.row"
          :col="panelsConfig.panel1.col"
          :size-x="panelsConfig.panel1.sizeX"
          :size-y="panelsConfig.panel1.sizeY"
          header="header1"
          content="content1"
        >
          <template #header1>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel1')" />
          </template>
          <template #content1>
            <KPICards />
          </template>
        </e-panel>

        <!-- Panel 2 -->
        <e-panel
          v-if="panelsConfig.panel2.visible"
          id="panel2"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panelsConfig.panel2.row"
          :col="panelsConfig.panel2.col"
          :size-x="panelsConfig.panel2.sizeX"
          :size-y="panelsConfig.panel2.sizeY"
          header="header2"
          content="content2"
        >
          <template #header2>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel2')" />
          </template>
          <template #content2>
            <FavouritesCard />
          </template>
        </e-panel>
        <e-panel
          v-if="panelsConfig.panel3.visible"
          id="panel3"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panelsConfig.panel3.row"
          :col="panelsConfig.panel3.col"
          :size-x="panelsConfig.panel3.sizeX"
          :size-y="panelsConfig.panel3.sizeY"
          header="header3"
          content="content3"
        >
          <template #header3>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel3')" />
          </template>
          <template #content3>
            <div>Contet 3</div>
          </template>
        </e-panel>
        <e-panel
          v-if="panelsConfig.panel4.visible"
          id="panel4"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panelsConfig.panel4.row"
          :col="panelsConfig.panel4.col"
          :size-x="panelsConfig.panel4.sizeX"
          :size-y="panelsConfig.panel4.sizeY"
          header="header4"
          content="content4"
        >
          <template #header4>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel4')" />
          </template>
          <template #content4>
            <div>Contet 4</div>
          </template>
        </e-panel>
      </e-panels>
    </ejs-dashboardlayout>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import KPICards from './KPICards.vue'
import FavouritesCard from './FavouritesCard.vue'
import RemoveIcon from './RemoveIcon.vue'

// Dashboard configurations
const cellSpacing = [10, 10]
const cellAspectRatio = 100 / 27
const isEditing = ref(false)
const dashboard = ref(null)

// Panel configurations
const panelsConfig = ref({
  panel1: { row: 0, col: 0, sizeX: 2, sizeY: 1, visible: true },
  panel2: { row: 1, col: 0, sizeX: 2, sizeY: 1, visible: true },
  panel3: { row: 2, col: 0, sizeX: 1, sizeY: 1, visible: true },
  panel4: { row: 2, col: 1, sizeX: 1, sizeY: 1, visible: false },
})

function toggleEditMode() {
  if (isEditing.value) {
    // Save updated configurations when exiting edit mode
    const updatedPanels = dashboard.value.serialize() // Assuming serialize() returns panels with IDs
    updatedPanels.forEach((panel) => {
      const panelConfig = panelsConfig.value[panel.id]
      panelConfig.row = panel.row
      panelConfig.col = panel.col
      panelConfig.sizeX = panel.sizeX
      panelConfig.sizeY = panel.sizeY
    })
    localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
  }
  isEditing.value = !isEditing.value
}

// Remove a panel and store its configuration in hiddenPanels
function removePanel(panelId) {
  panelsConfig.value[panelId].visible = false
  const storedPanels = JSON.parse(localStorage.getItem('dashboardPanels')) || { ...panelsConfig.value }
  storedPanels[panelId].visible = false
  localStorage.setItem('dashboardPanels', JSON.stringify(storedPanels))
}

// Add a hidden panel back to the dashboard
function addHiddenPanel(panelId) {
  panelsConfig.value[panelId].visible = true
  localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
}

// Load panels from localStorage on mount
onMounted(() => {
  const storedPanels = localStorage.getItem('dashboardPanels')
  if (storedPanels)
    panelsConfig.value = JSON.parse(storedPanels)
})
</script>

  <style scoped>
  :deep(.editing-mode) {
    border: 1px dotted #009ee2;
    border-radius: inherit;
  }

  button {
    cursor: pointer;
  }

  button.bg-red-500 {
    position: absolute;
    top: 1px;
    right: 1px;
    background-color: red;
    color: white;
    padding: 0.5rem;
    border-radius: 50%;
  }

  .e-dashboardlayout.e-control :deep(.e-panel .e-panel-container .e-panel-header) {
    background-color: white;
    margin: 0!important;
    padding: 0!important;
    max-height: 0!important;
}
  </style>
