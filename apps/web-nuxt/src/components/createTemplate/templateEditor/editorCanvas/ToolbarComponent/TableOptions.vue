<template>
  <!-- Button to open the dialog -->
  <Button
    v-tooltip="$t('Cp_templateEditor_tiptap_topbar.table_options')"
    outlined
    class="w-[40px] px-0 h-[40px]"
    @click="isDialogVisible = true"
  >
    <FontAwesomeIcon icon="fa-solid fa-table" size="lg" />
  </Button>

  <!-- Dialog with Table Options -->
  <Dialog
    v-model:visible="isDialogVisible"
    header="Table Options"
    :modal="true"
    :closable="true"
    class="w-[250px]"
  >
    <div class="">
      <!-- Insert Table -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.insert_table')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().insertTable()"
        @click="addTable"
      >
        <FontAwesomeIcon icon="fa-solid fa-table" /> Insert Table
      </Button>

      <!-- Delete Table -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_table')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().deleteTable()"
        @click="deleteTable"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Table
      </Button>

      <!-- Add Column Before -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_column_before')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addColumnBefore()"
        @click="addColumnBefore"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Add Column Before
      </Button>

      <!-- Add Column After -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_column_after')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addColumnAfter()"
        @click="addColumnAfter"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> Add Column After
      </Button>

      <!-- Delete Column -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_column')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().deleteColumn()"
        @click="deleteColumn"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash-alt" /> Delete Column
      </Button>

      <!-- Add Row Before -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_row_before')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addRowBefore()"
        @click="addRowBefore"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-up" /> Add Row Before
      </Button>

      <!-- Add Row After -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.add_row_after')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().addRowAfter()"
        @click="addRowAfter"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-down" /> Add Row After
      </Button>

      <!-- Delete Row -->
      <Button
        v-tooltip="$t('Cp_templateEditor_tiptap_topbar.delete_row')"
        outlined
        class="w-full mb-2"
        :disabled="!editor.can().deleteRow()"
        @click="deleteRow"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash-alt" /> Delete Row
      </Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'

// PrimeVue Button and Dialog imports
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

// Import FontAwesomeIcon if needed
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps(['editor'])
const isDialogVisible = ref(false)
// Define the functions for table actions
function addTable() {
  props?.editor.chain().focus().insertTable().run()
  isDialogVisible.value = false
}

function deleteTable() {
  props?.editor.chain().focus().deleteTable().run()
  isDialogVisible.value = false
}

function addColumnBefore() {
  props?.editor.chain().focus().addColumnBefore().run()
  isDialogVisible.value = false
}

function addColumnAfter() {
  props?.editor.chain().focus().addColumnAfter().run()
  isDialogVisible.value = false
}

function deleteColumn() {
  props?.editor.chain().focus().deleteColumn().run()
  isDialogVisible.value = false
}

function addRowBefore() {
  props?.editor.chain().focus().addRowBefore().run()
  isDialogVisible.value = false
}

function addRowAfter() {
  props?.editor.chain().focus().addRowAfter().run()
  isDialogVisible.value = false
}

function deleteRow() {
  props?.editor.chain().focus().deleteRow().run()
  isDialogVisible.value = false
}
</script>

  <style scoped>
  .table-options-dialog {
    width: 150px;
  }

  .table-options .w-full {
    width: 100%;
  }
  </style>
