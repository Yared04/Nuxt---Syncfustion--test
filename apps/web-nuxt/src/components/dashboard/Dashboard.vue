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
      :columns="6"
      :cell-spacing="cellSpacing"
      :allow-floating="true"
      :allow-resizing="isEditing"
      @resize-stop="onResizeStop"
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
          :max-size-x="contentSize[panelsConfig.panel1.content].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel1.content].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel1.content].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel1.content].minSizeY"
          header="header1"
          content="content1"
        >
          <template #header1>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel1')" />
            <EditIcon v-if="isEditing" @edit-panel="editPanel('panel1')" />
          </template>
          <template #content1>
            <PanelContentOptions v-if="panelsConfig.panel1.editMode" :size-x="panelsConfig.panel1.sizeX" :size-y="panelsConfig.panel1.sizeY" @selected-content="(item) => assignContent(item, 'panel1')" />
            <component :is="componentMap[panelsConfig.panel1.content]" v-else />
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
          :max-size-x="contentSize[panelsConfig.panel2.content].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel2.content].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel2.content].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel2.content].minSizeY"
          header="header2"
          content="content2"
        >
          <template #header2>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel2')" />
            <EditIcon v-if="isEditing" @edit-panel="editPanel('panel2')" />
          </template>
          <template #content2>
            <!-- <FavouritesCard /> -->
            <PanelContentOptions v-if="panelsConfig.panel2.editMode" :size-x="panelsConfig.panel2.sizeX" :size-y="panelsConfig.panel2.sizeY" @selected-content="(item) => assignContent(item, 'panel2')" />
            <component :is="componentMap[panelsConfig.panel2.content]" v-else />
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
          :max-size-x="contentSize[panelsConfig.panel3.content].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel3.content].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel3.content].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel3.content].minSizeY"
          header="header3"
          content="content3"
        >
          <template #header3>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel3')" />
            <EditIcon v-if="isEditing" @edit-panel="editPanel('panel3')" />
          </template>
          <template #content3>
            <PanelContentOptions v-if="panelsConfig.panel3.editMode" :size-x="panelsConfig.panel3.sizeX" :size-y="panelsConfig.panel3.sizeY" @selected-content="(item) => assignContent(item, 'panel3')" />
            <component :is="componentMap[panelsConfig.panel3.content]" v-else />
          </template>
        </e-panel>

        <!-- panel 4 -->
        <e-panel
          v-if="panelsConfig.panel4.visible"
          id="panel4"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panelsConfig.panel4.row"
          :col="panelsConfig.panel4.col"
          :size-x="panelsConfig.panel4.sizeX"
          :size-y="panelsConfig.panel4.sizeY"
          :max-size-x="contentSize[panelsConfig.panel4.content].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel4.content].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel4.content].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel4.content].minSizeY"
          header="header4"
          content="content4"
        >
          <template #header4>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel4')" />
            <EditIcon v-if="isEditing" @edit-panel="editPanel('panel4')" />
          </template>
          <template #content4>
            <PanelContentOptions v-if="panelsConfig.panel4.editMode" :size-x="panelsConfig.panel4.sizeX" :size-y="panelsConfig.panel4.sizeY" @selected-content="(item) => assignContent(item, 'panel4')" />
            <component :is="componentMap[panelsConfig.panel4.content]" v-else />
          </template>
        </e-panel>

        <!-- panel 5 -->
        <e-panel
          v-if="panelsConfig.panel5.visible"
          id="panel5"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panelsConfig.panel5.row"
          :col="panelsConfig.panel5.col"
          :size-x="panelsConfig.panel5.sizeX"
          :size-y="panelsConfig.panel5.sizeY"
          :max-size-x="contentSize[panelsConfig.panel5.content].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel5.content].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel5.content].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel5.content].minSizeY"
          header="header5"
          content="content5"
        >
          <template #header5>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel5')" />
            <EditIcon v-if="isEditing" @edit-panel="editPanel('panel5')" />
          </template>
          <template #content5>
            <PanelContentOptions v-if="panelsConfig.panel5.editMode" :size-x="panelsConfig.panel5.sizeX" :size-y="panelsConfig.panel5.sizeY" @selected-content="(item) => assignContent(item, 'panel5')" />
            <component :is="componentMap[panelsConfig.panel5.content]" v-else />
          </template>
        </e-panel>

        <!-- panel 6 -->
        <e-panel
          v-if="panelsConfig.panel6.visible"
          id="panel6"
          :css-class="isEditing ? 'editing-mode' : ''"
          :row="panelsConfig.panel6.row"
          :col="panelsConfig.panel6.col"
          :size-x="panelsConfig.panel6.sizeX"
          :size-y="panelsConfig.panel6.sizeY"
          :max-size-x="contentSize[panelsConfig.panel6.content].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel6.content].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel6.content].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel6.content].minSizeY"
          header="header6"
          content="content6"
        >
          <template #header6>
            <RemoveIcon v-if="isEditing" @remove-panel="removePanel('panel6')" />
            <EditIcon v-if="isEditing" @edit-panel="editPanel('panel6')" />
          </template>
          <template #content6>
            <PanelContentOptions v-if="panelsConfig.panel6.editMode" :size-x="panelsConfig.panel6.sizeX" :size-y="panelsConfig.panel6.sizeY" @selected-content="(item) => assignContent(item, 'panel6')" />
            <component :is="componentMap[panelsConfig.panel6.content]" v-else />
          </template>
        </e-panel>
      </e-panels>
    </ejs-dashboardlayout>
  </div>
</template>

<script setup>
import KPICards from './KPICards.vue'
import FavouritesCard from './FavouritesCard.vue'
import RemoveIcon from './RemoveIcon.vue'
import PanelContentOptions from './PanelContentOptions.vue'
import EditIcon from './EditIcon.vue'
import DocumentLibraryCard from './DocumentLibraryCard.vue'

// Dashboard configurations
const cellSpacing = [10, 10]
const isEditing = ref(false)
const dashboard = ref(null)

const componentMap = {
  'KPI 1': KPICards,
  'KPI 2': KPICards,
  'Favourite 1': FavouritesCard,
  'Favourite 2': FavouritesCard,
  'Document Library': DocumentLibraryCard,
}

// Assign min and max size for panels based on the content
const contentSize = {
  'KPI 1': { minSizeX: 1, minSizeY: 1, maxSizeX: 2, maxSizeY: 2 },
  'KPI 2': { minSizeX: 1, minSizeY: 1, maxSizeX: 2, maxSizeY: 2 },
  'Favourite 1': { minSizeX: 2, minSizeY: 1, maxSizeX: 4, maxSizeY: 2 },
  'Favourite 2': { minSizeX: 2, minSizeY: 1, maxSizeX: 4, maxSizeY: 2 },
  'Document Library': { minSizeX: 3, minSizeY: 1, maxSizeX: 6, maxSizeY: 2 },
}

// Panel configurations
const panelsConfig = ref({
  panel1: { row: 0, col: 0, sizeX: 2, sizeY: 1, visible: true, content: 'KPI 1', editMode: false },
  panel2: { row: 1, col: 0, sizeX: 2, sizeY: 1, visible: true, content: 'Favourite 1', editMode: false },
  panel3: { row: 3, col: 0, sizeX: 1, sizeY: 1, visible: true, content: 'Document Library', editMode: false },
  panel4: { row: 2, col: 1, sizeX: 1, sizeY: 1, visible: false, content: 'Favourite 2', editMode: false },
  panel5: { row: 2, col: 2, sizeX: 1, sizeY: 1, visible: false, content: 'Favourite 2', editMode: false },
  panel6: { row: 2, col: 3, sizeX: 1, sizeY: 1, visible: false, content: 'KPI 2', editMode: false },
})

// Update layout based on user interaction
function updateLayout(editMode) {
  const updatedPanels = dashboard.value.serialize()
  updatedPanels.forEach((panel) => {
    const panelConfig = panelsConfig.value[panel.id]
    panelConfig.row = panel.row
    panelConfig.col = panel.col
    panelConfig.sizeX = panel.sizeX
    panelConfig.sizeY = panel.sizeY
    if (editMode !== undefined)
      panelConfig.editMode = editMode
  })
}

function toggleEditMode() {
  if (isEditing.value) {
    updateLayout(false)
    localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
  }
  isEditing.value = !isEditing.value
}

// Remove a panel from the dashboard by setting visible to false
function removePanel(panelId) {
  updateLayout()
  panelsConfig.value[panelId].visible = false
  localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
}

// Open panel in edit mode
function editPanel(panelId) {
  panelsConfig.value[panelId].editMode = !panelsConfig.value[panelId].editMode
}

// Add a hidden panel back to the dashboard by setting visible to true
function addHiddenPanel(panelId) {
  updateLayout()
  panelsConfig.value[panelId].visible = true
  localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
}

// Assign content to a panel based on user selection
function assignContent(selectedItem, panelId) {
  panelsConfig.value[panelId].content = selectedItem
  panelsConfig.value[panelId].editMode = false
  localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
}

function onResizeStop(arg) {
  updateLayout()
  const panelId = arg.element.id
  const sizeX = Number(arg.element.dataset.sizex)
  const sizeY = Number(arg.element.dataset.sizey)
  panelsConfig.value[panelId].sizeX = sizeX
  panelsConfig.value[panelId].sizeY = sizeY
  localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
}

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
