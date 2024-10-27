<template>
  <!-- Button to open the overlay -->
  <!-- <Button
    ref="targetButton"
    v-tooltip="$t('Cp_templateEditor_tiptap_topbar.table_options')"
    outlined

    class="w-[40px] px-0 h-[40px]"
  >
    <FontAwesomeIcon icon="fa-solid fa-table" size="lg" />
  </Button> -->
  <Button
    v-tooltip="$t('Cp_templateEditor_tiptap_topbar.heading_1')"
    outlined
    class="w-[40px] px-0 h-[40px]"
    @click="toggleOverlay"
  >
    <FontAwesomeIcon icon="fa-solid fa-heading" size="lg" />
  </Button>

  <!-- OverlayPanel with Table Options -->
  <!-- :show-close-icon="true" -->
  <OverlayPanel
    ref="overlayPanel"
    class="w-[200px] max-h-[300px] overflow-y-auto relative flex flex-col"
    :dismissable="true"
  >
    <!-- <template #closeicon> -->

    <!-- </template> -->
    <div class="p-0 flex flex-col">
      <!-- Insert Table -->
      <Button
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        :contained="editor.isActive('heading', { level: 1 }) ? true : false"
        :text="editor.isActive('heading', { level: 1 }) ? false : true"

        class="w-full mb-1"
        @click="() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run()
          closeOverlay()
        }"
      >
        <!-- <FontAwesomeIcon icon="fa-solid fa-heading" size="lg" /> -->
        {{ $t('Cp_templateEditor_tiptap_topbar.heading_1') }}
      </Button>

      <Button

        :contained="editor.isActive('heading', { level: 2 }) ? true : false"
        :text="editor.isActive('heading', { level: 2 }) ? false : true"
        class="w-full mb-1"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run()
          closeOverlay()
        }"
      >
        <!-- <FontAwesomeIcon icon="fa-solid fa-heading" size="lg" /> -->
        {{ $t('Cp_templateEditor_tiptap_topbar.heading_2') }}
      </Button>

      <Button

        :contained="editor.isActive('heading', { level: 3 }) ? true : false"
        :text="editor.isActive('heading', { level: 3 }) ? false : true"
        class="w-full mb-1"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run()
          closeOverlay()
        }"
      >
        <!-- <FontAwesomeIcon icon="fa-solid fa-heading" size="lg" /> -->
        {{ $t('Cp_templateEditor_tiptap_topbar.heading_3') }}
      </Button>
      <Button

        :contained="editor.isActive('heading', { level: 4 }) ? true : false"
        :text="editor.isActive('heading', { level: 4 }) ? false : true"
        class="w-full mb-1"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="() => {
          editor.chain().focus().toggleHeading({ level: 4 }).run()
          closeOverlay()
        }"
      >
        <!-- <FontAwesomeIcon icon="fa-solid fa-heading" size="lg" /> -->
        {{ $t('Cp_templateEditor_tiptap_topbar.heading_4') }}
      </Button>
      <Button

        :contained="editor.isActive('heading', { level: 5 }) ? true : false"
        :text="editor.isActive('heading', { level: 5 }) ? false : true"
        class="w-full mb-1"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="() => {
          editor.chain().focus().toggleHeading({ level: 5 }).run()
          closeOverlay()
        }"
      >
        <!-- <FontAwesomeIcon icon="fa-solid fa-heading" size="lg" /> -->
        {{ $t('Cp_templateEditor_tiptap_topbar.heading_5') }}
      </Button>
      <Button

        :contained="editor.isActive('heading', { level: 6 }) ? true : false"
        :text="editor.isActive('heading', { level: 6 }) ? false : true"
        class="w-full mb-1"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="() => {
          editor.chain().focus().toggleHeading({ level: 6 }).run()
          closeOverlay()
        }"
      >
        <!-- <FontAwesomeIcon icon="fa-solid fa-heading" size="lg" /> -->
        {{ $t('Cp_templateEditor_tiptap_topbar.heading_6') }}
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

<!-- <template>
  <div>
    <Button
      outlined
      class="dropdown-icon-button"
      @click="openDialog"
    >
      <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
    </Button>

    <Dialog
      v-model:visible="isDialogVisible"
      header="Select Heading Level"
      :modal="true"
      :closable="true"
      class="w-[250px]"
    >
      <div class="">
        <Button
          v-for="option in headingOptions"
          :key="option.level"
          :outlined="activeHeadingLevel !== option.level"
          class="w-full mb-1"
          @click="applyHeading(option.level)"
        >
          {{ option.label }}
        </Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
const props = defineProps(['editor'])

const isDialogVisible = ref(false)
const activeHeadingLevel = ref(null)

const headingOptions = [
  { label: 'Heading 1', level: 1 },
  { label: 'Heading 2', level: 2 },
  { label: 'Heading 3', level: 3 },
  { label: 'Heading 4', level: 4 },
  { label: 'Heading 5', level: 5 },
  { label: 'Heading 6', level: 6 },
]

function openDialog() {
  isDialogVisible.value = true

  // Check the current active heading level in the editor
  const currentHeading = headingOptions.find(option =>
    props.editor.isActive('heading', { level: option.level }),
  )
  activeHeadingLevel.value = currentHeading ? currentHeading.level : null
}

function applyHeading(level) {
  props.editor.chain().focus().toggleHeading({ level }).run()
  activeHeadingLevel.value = level // Update the active heading level
  isDialogVisible.value = false // Close dialog after selection
}
</script>

  <style scoped>
  .dropdown-icon-button {
    width: 40px;
    height: 40px;
    padding: 0;
  }

  .heading-options-dialog .heading-options Button {
    width: 100%;
    margin-bottom: 8px;
  }
  </style> -->
