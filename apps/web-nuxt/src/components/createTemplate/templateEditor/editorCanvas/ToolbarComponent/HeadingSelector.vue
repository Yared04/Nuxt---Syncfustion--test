<template>
  <div>
    <!-- Button to open the dialog -->
    <Button
      outlined
      class="dropdown-icon-button"
      @click="openDialog"
    >
      <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
    </Button>

    <!-- Dialog for selecting heading level -->
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
          class="w-full mb-2"
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
  </style>

<!-- <template>
  <div>
    <Dropdown
      v-model="selectedHeading"
      :options="headingOptions"
      option-label="label"
      option-value="level"
      class="icon-dropdown w-[50px]"
      append-to="body"
      @click="updateSelectedHeading"
      @change="applyHeading"
    >
      <template #trigger>
        <Button icon="pi pi-align-left" class="dropdown-icon-button" />
      </template>
    </Dropdown>
  </div>
</template>

<script setup>
const props = defineProps(['editor'])

const headingOptions = [
  { label: 'Heading 1', level: 1 },
  { label: 'Heading 2', level: 2 },
  { label: 'Heading 3', level: 3 },
  { label: 'Heading 4', level: 4 },
  { label: 'Heading 5', level: 5 },
  { label: 'Heading 6', level: 6 },
]

const selectedHeading = ref(null)

function updateSelectedHeading() {
  // Get the current heading level in the editor
  const currentHeading = headingOptions.find(option =>
    props?.editor.isActive('heading', { level: option.level }),
  )
  selectedHeading.value = currentHeading ? currentHeading.level : null
}

function applyHeading() {
  if (selectedHeading.value)
    props?.editor.chain().focus().toggleHeading({ level: selectedHeading.value }).run()
}
</script>

  <style scoped>
  /* Hide the input and style the dropdown as an icon button */
  .icon-dropdown .p-dropdown-label,
  .icon-dropdown .p-dropdown-trigger-icon {
    display: none; /* Hide the dropdown's default label and arrow icon */
  }

  .dropdown-icon-button {
    width: 40px;
    height: 40px;
    padding: 0;
  }
  </style> -->
<!-- <template>
  <div class="dropdown-container">
    <Button icon="pi pi-align-left" class="dropdown-icon-button" @click="toggleDropdown" />
    <div v-if="dropdownVisible" class="dropdown-options">
      <div
        v-for="option in headingOptions"
        :key="option.level"
        class="dropdown-option"
        @click="selectHeading(option.level)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['editor'])

const headingOptions = [
  { label: 'Heading 1', level: 1 },
  { label: 'Heading 2', level: 2 },
  { label: 'Heading 3', level: 3 },
  { label: 'Heading 4', level: 4 },
  { label: 'Heading 5', level: 5 },
  { label: 'Heading 6', level: 6 },
]

const dropdownVisible = ref(false)

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value
}

function selectHeading(level) {
  props?.editor.chain().focus().toggleHeading({ level }).run()
  dropdownVisible.value = false // Close the dropdown after selection
}
</script>

  <style scoped>
  .dropdown-container {
    position: relative;
    display: inline-block;
  }

  .dropdown-icon-button {
    width: 40px;
    height: 40px;
    padding: 0;
  }

  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid gray;
    width: 150px;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .dropdown-option {
    padding: 8px 12px;
    cursor: pointer;
  }

  .dropdown-option:hover {
    background-color: #f0f0f0;
  }
  </style> -->
<!--
<template>
  <div class="dropdown-container">

    <Button icon="pi pi-align-left" class="dropdown-icon-button" @click="toggleDropdown" />

    <div
      v-if="dropdownVisible"
      class="dropdown-options"
      @click.outside="dropdownVisible = false"
    >
      <div
        v-for="option in headingOptions"
        :key="option.level"
        class="dropdown-option"
        @click="selectHeading(option.level)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps(['editor'])

const headingOptions = [
  { label: 'Heading 1', level: 1 },
  { label: 'Heading 2', level: 2 },
  { label: 'Heading 3', level: 3 },
  { label: 'Heading 4', level: 4 },
  { label: 'Heading 5', level: 5 },
  { label: 'Heading 6', level: 6 },
]

const dropdownVisible = ref(false)
const dropdownRef = ref(null)

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value
}

function selectHeading(level) {
  props?.editor.chain().focus().toggleHeading({ level }).run()
  dropdownVisible.value = false // Close the dropdown after selection
}

// Close dropdown on outside click
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target))
    dropdownVisible.value = false
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

  <style scoped>
  .dropdown-container {
    position: relative;
    display: inline-block;
  }

  .dropdown-icon-button {
    width: 40px;
    height: 40px;
    padding: 0;
  }

  /* Dropdown options positioned globally */
  .dropdown-options {
    position: absolute;
    top: 50px; /* Adjust top based on desired button alignment */
    left: 0; /* Adjust to align with the button or use a custom value */
    background-color: white;
    border: 1px solid gray;
    width: 150px;
    z-index: 100000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .dropdown-option {
    padding: 8px 12px;
    cursor: pointer;
  }

  .dropdown-option:hover {
    background-color: #f0f0f0;
  }
  </style> -->

<!--
<template>
  <div>
    <Button
      v-tooltip="'Heading'"
      class="w-[40px] px-0 h-[40px]"
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      @click="showModal = true"
    >
      <font-awesome-icon icon="fa-solid fa-heading" size="lg" />
    </Button>
    <Dialog v-model:visible="showModal" :modal="false" header="Select Heading" class="w-[200px]" @show="highlightCurrentHeading">
      <div class="heading-options">
        <div
          v-for="option in headingOptions"
          :key="option.level"
          class="heading-option" :class="[{ active: selectedHeading === option.level }]"
          @click="selectHeading(option.level)"
        >
          {{ option.label }}
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
const props = defineProps(['editor'])
const showModal = ref(false)
const headingOptions = [
  { label: 'Heading 1', level: 1 },
  { label: 'Heading 2', level: 2 },
  { label: 'Heading 3', level: 3 },
  { label: 'Heading 4', level: 4 },
  { label: 'Heading 5', level: 5 },
  { label: 'Heading 6', level: 6 },
]

const selectedHeading = ref(null)

function highlightCurrentHeading() {
  const currentHeadingLevel = headingOptions.find(option =>
    props?.editor.isActive('heading', { level: option.level }),
  )
  selectedHeading.value = currentHeadingLevel ? currentHeadingLevel.level : null
}

function selectHeading(level) {
  props?.editor.chain().focus().toggleHeading({ level }).run()
  selectedHeading.value = level
  showModal.value = false
}
</script>

  <style scoped>
  .heading-options {
    display: flex;
    flex-direction: column;
  }

  .heading-option {
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
  }

  .heading-option.active {
    background-color: #007ad9;
    color: white;
    font-weight: bold;
  }

  .heading-option:hover {
    background-color: #e0f2ff;
  }
  .p-dialog {
  position: absolute !important;
  top: 50px; /* Adjust this to your desired position */
  left: 50px; /* Adjust this to your desired position */
}
</style> -->
