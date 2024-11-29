<template>
  <div>
    <!-- Toggle Edit Mode -->
    <div class="flex gap-2 justify-end mb-2 pr-4">
      <button
        v-if="isEditing"
        class="border-primaryBlue rounded-lg text-primaryBlue px-4 py-2 hover:bg-primaryBlue hover:text-white border"
        @click="openAddCardDialog"
      >
        Add Cards
      </button>
      <button
        class="px-4 py-2 rounded-lg text-primaryBlue hover:bg-primaryBlue hover:text-white"
        @click="toggleEditMode"
      >
        <font-awesome-icon v-if="isEditing" :icon="['fal', 'lock-open']" />
        <font-awesome-icon v-else :icon="['fal', 'lock']" />
      </button>
    </div>

    <!-- Add Card Dialog -->
    <AddCard v-if="showAddCardDialog === true" @dialog-close="closeAddCardDialog" @selected-card="addHiddenPanel" />

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
          :max-size-x="contentSize[panelsConfig.panel1.category].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel1.category].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel1.category].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel1.category].minSizeY"
          header="header1"
          content="content1"
        >
          <template #header1>
            <ExpandIcon v-if="isEditing && !panelsConfig.panel1.editMode" @remove-panel="removePanel('panel1')" />
            <EditIcon v-if="isEditing && !panelsConfig.panel1.editMode" @edit-panel="editPanel('panel1')" />
            <DragIcon v-if="isEditing && !panelsConfig.panel1.editMode" @allow-drag="toggleDragging" />
            <SaveAndRemoveIcons v-if="isEditing && panelsConfig.panel1.editMode" @save-panel="editPanel('panel1')" @remove-panel="removePanel('panel1')" />
            <h1 v-if="!panelsConfig.panel1.editMode" :class="isEditing ? 'pl-3 text-lg font-bold' : 'text-lg font-bold'">
              {{ panelsConfig.panel1.header }}
            </h1>
          </template>
          <template #content1>
            <PanelContentOptions v-if="panelsConfig.panel1.editMode" v-model="panelsConfig.panel1.header" :category="panelsConfig.panel1.category" :content="panelsConfig.panel1.content" :size-x="panelsConfig.panel1.sizeX" :size-y="panelsConfig.panel1.sizeY" @selected-content="(item) => assignContent(item, 'panel1')" />
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
          :max-size-x="contentSize[panelsConfig.panel2.category].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel2.category].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel2.category].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel2.category].minSizeY"
          header="header2"
          content="content2"
        >
          <template #header2>
            <ExpandIcon v-if="isEditing && !panelsConfig.panel2.editMode" @remove-panel="removePanel('panel2')" />
            <EditIcon v-if="isEditing && !panelsConfig.panel2.editMode" @edit-panel="editPanel('panel2')" />
            <DragIcon v-if="isEditing && !panelsConfig.panel2.editMode" @allow-drag="toggleDragging" />
            <SaveAndRemoveIcons v-if="isEditing && panelsConfig.panel2.editMode" @save-panel="editPanel('panel2')" @remove-panel="removePanel('panel2')" />
            <h1 v-if="!panelsConfig.panel2.editMode" :class="isEditing ? 'pl-3 text-lg font-bold' : 'text-lg font-bold'">
              {{ panelsConfig.panel2.header }}
            </h1>
          </template>
          <template #content2>
            <PanelContentOptions v-if="panelsConfig.panel2.editMode" v-model="panelsConfig.panel2.header" :category="panelsConfig.panel2.category" :content="panelsConfig.panel2.content" :size-x="panelsConfig.panel2.sizeX" :size-y="panelsConfig.panel2.sizeY" @selected-content="(item) => assignContent(item, 'panel2')" />
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
          :max-size-x="contentSize[panelsConfig.panel3.category].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel3.category].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel3.category].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel3.category].minSizeY"
          header="header3"
          content="content3"
        >
          <template #header3>
            <ExpandIcon v-if="isEditing && !panelsConfig.panel3.editMode" @remove-panel="removePanel('panel3')" />
            <EditIcon v-if="isEditing && !panelsConfig.panel3.editMode" @edit-panel="editPanel('panel3')" />
            <DragIcon v-if="isEditing && !panelsConfig.panel3.editMode" @allow-drag="toggleDragging" />
            <SaveAndRemoveIcons v-if="isEditing && panelsConfig.panel3.editMode" @save-panel="editPanel('panel3')" @remove-panel="removePanel('panel3')" />
            <h1 v-if="!panelsConfig.panel3.editMode" :class="isEditing ? 'pl-3 text-lg font-bold' : 'text-lg font-bold'">
              {{ panelsConfig.panel3.header }}
            </h1>
          </template>
          <template #content3>
            <PanelContentOptions v-if="panelsConfig.panel3.editMode" v-model="panelsConfig.panel3.header" :category="panelsConfig.panel3.category" :content="panelsConfig.panel3.content" :size-x="panelsConfig.panel3.sizeX" :size-y="panelsConfig.panel3.sizeY" @selected-content="(item) => assignContent(item, 'panel3')" />
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
          :max-size-x="contentSize[panelsConfig.panel4.category].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel4.category].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel4.category].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel4.category].minSizeY"
          header="header4"
          content="content4"
        >
          <template #header4>
            <ExpandIcon v-if="isEditing && !panelsConfig.panel4.editMode" @remove-panel="removePanel('panel4')" />
            <EditIcon v-if="isEditing && !panelsConfig.panel4.editMode" @edit-panel="editPanel('panel4')" />
            <DragIcon v-if="isEditing && !panelsConfig.panel4.editMode" @allow-drag="toggleDragging" />
            <SaveAndRemoveIcons v-if="isEditing && panelsConfig.panel4.editMode" @save-panel="editPanel('panel4')" @remove-panel="removePanel('panel4')" />
            <h1 v-if="!panelsConfig.panel4.editMode" :class="isEditing ? 'pl-3 text-lg font-bold' : 'text-lg font-bold'">
              {{ panelsConfig.panel4.header }}
            </h1>
          </template>
          <template #content4>
            <PanelContentOptions v-if="panelsConfig.panel4.editMode" v-model="panelsConfig.panel4.header" :category="panelsConfig.panel4.category" :content="panelsConfig.panel4.content" :size-x="panelsConfig.panel4.sizeX" :size-y="panelsConfig.panel4.sizeY" @selected-content="(item) => assignContent(item, 'panel4')" />
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
          :max-size-x="contentSize[panelsConfig.panel5.category].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel5.category].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel5.category].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel5.category].minSizeY"
          header="header5"
          content="content5"
        >
          <template #header5>
            <ExpandIcon v-if="isEditing && !panelsConfig.panel5.editMode" @remove-panel="removePanel('panel5')" />
            <EditIcon v-if="isEditing && !panelsConfig.panel5.editMode" @edit-panel="editPanel('panel5')" />
            <DragIcon v-if="isEditing && !panelsConfig.panel5.editMode" @allow-drag="toggleDragging" />
            <SaveAndRemoveIcons v-if="isEditing && panelsConfig.panel5.editMode" @save-panel="editPanel('panel5')" @remove-panel="removePanel('panel5')" />
            <h1 v-if="!panelsConfig.panel5.editMode" :class="isEditing ? 'pl-3 text-lg font-bold' : 'text-lg font-bold'">
              {{ panelsConfig.panel5.header }}
            </h1>
          </template>
          <template #content5>
            <PanelContentOptions v-if="panelsConfig.panel5.editMode" v-model="panelsConfig.panel5.header" :category="panelsConfig.panel5.category" :content="panelsConfig.panel5.content" :size-x="panelsConfig.panel5.sizeX" :size-y="panelsConfig.panel5.sizeY" @selected-content="(item) => assignContent(item, 'panel5')" />
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
          :max-size-x="contentSize[panelsConfig.panel6.category].maxSizeX"
          :max-size-y="contentSize[panelsConfig.panel6.category].maxSizeY"
          :min-size-x="contentSize[panelsConfig.panel6.category].minSizeX"
          :min-size-y="contentSize[panelsConfig.panel6.category].minSizeY"
          header="header6"
          content="content6"
        >
          <template #header6>
            <ExpandIcon v-if="isEditing && !panelsConfig.panel6.editMode" @remove-panel="removePanel('panel6')" />
            <EditIcon v-if="isEditing && !panelsConfig.panel6.editMode" @edit-panel="editPanel('panel6')" />
            <DragIcon v-if="isEditing && !panelsConfig.panel6.editMode" @allow-drag="toggleDragging" />
            <SaveAndRemoveIcons v-if="isEditing && panelsConfig.panel6.editMode" @save-panel="editPanel('panel6')" @remove-panel="removePanel('panel6')" />
            <h1 v-if="!panelsConfig.panel6.editMode" :class="isEditing ? 'pl-3 text-lg font-bold' : 'text-lg font-bold'">
              {{ panelsConfig.panel6.header }}
            </h1>
          </template>
          <template #content6>
            <PanelContentOptions v-if="panelsConfig.panel6.editMode" v-model="panelsConfig.panel6.header" :category="panelsConfig.panel6.category" :content="panelsConfig.panel6.content" :size-x="panelsConfig.panel6.sizeX" :size-y="panelsConfig.panel6.sizeY" @selected-content="(item) => assignContent(item, 'panel6')" />
            <component :is="componentMap[panelsConfig.panel6.content]" v-else />
          </template>
        </e-panel>
      </e-panels>
    </ejs-dashboardlayout>
  </div>
  <Toast />
</template>

<script setup>
import KPICards from './KPICards.vue'
import FavouritesCard from './FavouritesCard.vue'
import ExpandIcon from './ExpandIcon.vue'
import PanelContentOptions from './PanelContentOptions.vue'
import EditIcon from './EditIcon.vue'
import DragIcon from './DragIcon.vue'
import DocumentLibraryCard from './DocumentLibraryCard.vue'
import AddCard from './AddCard.vue'
import SaveAndRemoveIcons from './SaveAndRemoveIcons.vue'

const toast = useToast()

// Dashboard configurations
const cellSpacing = [10, 10]
const isEditing = ref(false)
const dashboard = ref(null)
const showAddCardDialog = ref(false)
const allowDragging = ref(false)

const componentMap = {
  'KPI 1': KPICards,
  'KPI 2': KPICards,
  'Favourite 1': FavouritesCard,
  'Favourite 2': FavouritesCard,
  'Document Library': DocumentLibraryCard,
}

// Assign min and max size for panels based on the content
const contentSize = {
  'KPI': { minSizeX: 1, minSizeY: 1, maxSizeX: 2, maxSizeY: 2 },
  'Favourites': { minSizeX: 2, minSizeY: 1, maxSizeX: 4, maxSizeY: 2 },
  'Document Library': { minSizeX: 3, minSizeY: 1, maxSizeX: 6, maxSizeY: 2 },
}

// Panel configurations
const panelsConfig = ref({
  panel1: { row: 0, col: 0, sizeX: 2, sizeY: 1, visible: true, content: 'KPI 1', editMode: false, category: 'KPI', header: 'KPI 1' },
  panel2: { row: 1, col: 0, sizeX: 2, sizeY: 1, visible: true, content: 'Favourite 1', editMode: false, category: 'Favourites', header: 'Favourite 1' },
  panel3: { row: 3, col: 0, sizeX: 1, sizeY: 1, visible: true, content: 'Document Library', editMode: false, category: 'Document Library', header: 'Document Library' },
  panel4: { row: 2, col: 1, sizeX: 1, sizeY: 1, visible: false, content: 'Favourite 2', editMode: false, category: 'Favourites', header: 'Favourite 2' },
  panel5: { row: 2, col: 2, sizeX: 1, sizeY: 1, visible: false, content: 'Favourite 2', editMode: false, category: 'Favourites', header: 'Favourite 2' },
  panel6: { row: 2, col: 3, sizeX: 1, sizeY: 1, visible: false, content: 'KPI 2', editMode: false, category: 'KPI', header: 'KPI 2' },
})

// watch(panelsConfig, () => {
//   console.log(panelsConfig.value)
// }, { deep: true })

// Toggle dragging
function toggleDragging(allow) {
  allowDragging.value = allow
}

// Open Add Card Dialog
function openAddCardDialog() {
  showAddCardDialog.value = true
}

// Close Add Card Dialog
function closeAddCardDialog() {
  showAddCardDialog.value = false
}

// Get hidden panel by category
function getHiddenPanel(category) {
  return Object.entries(panelsConfig.value).find(([_key, panel]) => panel.category === category && !panel.visible)
}

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
function addHiddenPanel(category) {
  updateLayout()
  const hiddenPanel = getHiddenPanel(category)
  if (hiddenPanel === undefined) {
    toast.add({ severity: 'error', styleClass: 'custom-toast', summary: `No ${category} cards`, detail: `All the ${category} type cards have been added to the dashboard`, life: 3000 })
    return
  }
  const [panelId, _panel] = hiddenPanel
  panelsConfig.value[panelId].visible = true
  closeAddCardDialog()
  localStorage.setItem('dashboardPanels', JSON.stringify(panelsConfig.value))
}

// Assign content to a panel based on user selection
function assignContent(selectedItem, panelId) {
  panelsConfig.value[panelId].content = selectedItem
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

<style>
.custom-toast {
  white-space: pre-line;
}
</style>

<style scoped>
:deep(.editing-mode) {
  border: 1px dotted #009ee2;
  border-radius: inherit;
}

.e-dashboardlayout.e-control :deep(.e-panel .e-panel-container .e-panel-content) {
  border: none;
  padding-top: 0!important;
  font-size: 14px;

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
  padding-bottom: 0!important;

}
</style>
