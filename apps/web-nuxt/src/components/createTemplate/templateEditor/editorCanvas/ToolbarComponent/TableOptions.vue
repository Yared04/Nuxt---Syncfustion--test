<template>
  <!-- Button to open the overlay -->
  <Button
    ref="targetButton"
    v-tooltip="$t('Cp_templateEditor_tiptap_topbar.table_options')"
    outlined

    class="w-[40px] px-0 h-[40px]"
    @click="toggleOverlay"
  >
    <FontAwesomeIcon icon="fa-solid fa-table" size="lg" />
  </Button>

  <!-- OverlayPanel with Table Options -->
  <!-- :show-close-icon="true" -->
  <OverlayPanel
    ref="overlayPanel"
    class="w-[300px] max-h-[300px] overflow-y-auto relative flex flex-col"
    :dismissable="true"
  >
    <!-- <template #closeicon> -->

    <!-- </template> -->
    <div class="p-0">
      <!-- Insert Table -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.insert_table')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().insertTable()"
        @click="addTable"
      >
        <FontAwesomeIcon icon="fa-solid fa-table" class="mr-2" />
        Insert Table
      </Button>

      <!-- Delete Table -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_table')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().deleteTable()"
        @click="deleteTable"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash" class="mr-2" />
        Delete Table
      </Button>

      <!-- Add Column Before -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_column_before')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addColumnBefore()"
        @click="addColumnBefore"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" class="mr-2" />
        Add Column Before
      </Button>

      <!-- Add Column After -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_column_after')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addColumnAfter()"
        @click="addColumnAfter"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="mr-2" />
        Add Column After
      </Button>

      <!-- Delete Column -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_column')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().deleteColumn()"
        @click="deleteColumn"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash-alt" class="mr-2" />
        Delete Column
      </Button>

      <!-- Add Row Before -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_row_before')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addRowBefore()"
        @click="addRowBefore"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-up" class="mr-2" />
        Add Row Before
      </Button>

      <!-- Add Row After -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_row_after')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addRowAfter()"
        @click="addRowAfter"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-down" class="mr-2" />
        Add Row After
      </Button>

      <!-- Delete Row -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_row')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().deleteRow()"
        @click="deleteRow"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash-alt" class="mr-2" />
        Delete Row
      </Button>

      <!-- Merge Cells -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.merge_cells')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().mergeCells()"
        @click="mergeCells"
      >
        <FontAwesomeIcon icon="fa-solid fa-compress-arrows-alt" class="mr-2" />
        Merge Cells
      </Button>

      <!-- Split Cell -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.split_cell')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().splitCell()"
        @click="splitCell"
      >
        <FontAwesomeIcon icon="fa-solid fa-expand-arrows-alt" class="mr-2" />
        Split Cell
      </Button>

      <!-- Toggle Header Column -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.toggle_header_column')"
        text
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().toggleHeaderColumn()"
        @click="toggleHeaderColumn"
      >
        <FontAwesomeIcon icon="fa-solid fa-columns" class="mr-2" />
        Toggle Header Column
      </Button>

      <!-- Toggle Header Row -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.toggle_header_row')"
        text
        outlined
        class="w-full"
        :disabled="!editor.can().toggleHeaderRow()"
        @click="toggleHeaderRow"
      >
        <FontAwesomeIcon icon="fa-solid fa-grip-horizontal" class="mr-2" />
        Toggle Header Row
      </Button>
      <Button
        text
        class="w-full flex gap-2 mt-2"
        label="cancel"
        @click="closeOverlay"
      >
        <FontAwesomeIcon icon="fa-solid fa-times" />
        Cancel
      </Button>
    </div>
  </OverlayPanel>
</template>

<script setup>
import { ref } from 'vue'

// PrimeVue imports
import Button from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

const targetButton = ref(null)
const overlayPanel = ref(null)

function toggleOverlay(event) {
  overlayPanel.value.toggle(event)
}
function closeOverlay() {
  overlayPanel.value.hide()
}
// Table operation functions
function addTable() {
  props.editor?.chain().focus().insertTable({
    rows: 3,
    cols: 3,
    withHeaderRow: true,
  }).run()
  overlayPanel.value.hide()
}

function deleteTable() {
  props.editor?.chain().focus().deleteTable().run()
  overlayPanel.value.hide()
}

function addColumnBefore() {
  props.editor?.chain().focus().addColumnBefore().run()
  overlayPanel.value.hide()
}

function addColumnAfter() {
  props.editor?.chain().focus().addColumnAfter().run()
  overlayPanel.value.hide()
}

function deleteColumn() {
  props.editor?.chain().focus().deleteColumn().run()
  overlayPanel.value.hide()
}

function addRowBefore() {
  props.editor?.chain().focus().addRowBefore().run()
  overlayPanel.value.hide()
}

function addRowAfter() {
  props.editor?.chain().focus().addRowAfter().run()
  overlayPanel.value.hide()
}

function deleteRow() {
  props.editor?.chain().focus().deleteRow().run()
  overlayPanel.value.hide()
}

function mergeCells() {
  props.editor?.chain().focus().mergeCells().run()
  overlayPanel.value.hide()
}

function splitCell() {
  props.editor?.chain().focus().splitCell().run()
  overlayPanel.value.hide()
}

function toggleHeaderColumn() {
  props.editor?.chain().focus().toggleHeaderColumn().run()
  overlayPanel.value.hide()
}

function toggleHeaderRow() {
  props.editor?.chain().focus().toggleHeaderRow().run()
  overlayPanel.value.hide()
}
</script>

<style scoped>
:deep(.p-overlaypanel) {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;  /* Add this */
}

:deep(.p-overlaypanel::after),
:deep(.p-overlaypanel::before) {
  border-width: 8px;
}

:deep(.p-button) {
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}

:deep(.p-button:disabled) {
  opacity: 0.6;
}

:deep(.p-overlaypanel-content) {
  padding: 0.5rem;
}
</style>
