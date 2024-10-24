<template>
  <div class="mt-0 bg-white p-0 ">
    <div class="flex flex-wrap  gap-2">
      <!-- Select Font Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Select Font'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        @click="toggleFontOptions"
      >
        <font-awesome-icon icon="fa-solid fa-font" size="sm" />
      </Button>

      <!-- Font Size Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Font Size'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        @click="toggleFontSizeOptions"
      >
        <font-awesome-icon icon="fa-light fa-text-size" size="sm" />
      </Button>

      <!-- Underline Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Underline'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        :class="{ 'is-active': activeTextStyles.underline }"
        @click="toggleUnderline"
      >
        <font-awesome-icon icon="fa-solid fa-underline" size="sm" />
      </Button>

      <!-- Bold Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Bold'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        :class="{ 'is-active': activeTextStyles.fontWeight === 700 }"
        @click="toggleBold"
      >
        <font-awesome-icon icon="fa-solid fa-bold" size="sm" />
      </Button>

      <!-- Italic Button -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Italic'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        :class="{ 'is-active': activeTextStyles.fontStyle === 'italic' }"
        @click="toggleItalic"
      >
        <font-awesome-icon icon="fa-solid fa-italic" size="sm" />
      </Button>

      <!-- Text Align Buttons -->
      <Button
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'"
        v-tooltip="'Align Left'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        :class="{ 'is-active': activeTextStyles.textAlign === 'left' }"
        @click="setTextAlign('left')"
      >
        <font-awesome-icon icon="fa-solid fa-align-left" size="sm" />
      </Button>
      <Button
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'"
        v-tooltip="'Align Center'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        :class="{ 'is-active': activeTextStyles.textAlign === 'center' }"
        @click="setTextAlign('center')"
      >
        <font-awesome-icon icon="fa-solid fa-align-center" size="sm" />
      </Button>
      <Button
        v-if="templateEditorStore.selectedAddedField?.fieldType === 'Form long text'"
        v-tooltip="'Align Right'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        :class="{ 'is-active': activeTextStyles.textAlign === 'right' }"
        @click="setTextAlign('right')"
      >
        <font-awesome-icon icon="fa-solid fa-align-right" size="sm" />
      </Button>

      <!-- Character Spacing Buttons -->
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Reduce Character Spacing'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        @click="reduceCharacterSpacing"
      >
        <font-awesome-icon class="rotate-90" icon="fa-light fa-arrows-to-line" size="sm" />
      </Button>
      <Button
        v-if="isEditableFieldType"
        v-tooltip="'Increase Character Spacing'"
        outlined
        class="w-[26px] px-0 h-[26px]"
        @click="increaseCharacterSpacing"
      >
        <font-awesome-icon class="rotate-90" icon="fa-light fa-arrows-from-line" size="sm" />
      </Button>

      <!-- Additional Elements -->
      <ElementRotation v-if="templateEditorStore.selectedAddedField?.fieldType !== 'Form long text'" />

      <!-- Font Selection Dropdown -->
      <Dropdown
        v-if="showFontOptions"
        v-model="selectedFont"
        :options="fonts"
        option-label="label"
        option-value="value"
        placeholder="Select font"
        class="w-12 md:w-44 mt-0 h-[26px] text-xs custom-dropdown"
        @change="changeFont"
      />
      <Dropdown
        v-if="showFontSizesOptions"
        v-model="selectedFontSize"
        :options="fontSizes"
        option-label="label"
        option-value="value"
        placeholder="Select font size"
        class="w-12 md:w-32 mt-0  h-[26px] text-xs custom-dropdown"
        @change="changeSize"
      />

      <!-- Color Picker -->
      <input
        v-if="isEditableFieldType"
        v-model="selectedColor"
        type="color"
        class="ml-1"
        @input="changeColor"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ElementRotation from './ElementRotation.vue'
import { activeTextStyles } from '@/composables/useTemplateEditorData'
import { useTextFormattingOptions } from '@/composables/useTextFormattingOptions'

const { fonts, fontSizes } = useTextFormattingOptions()
const showFontOptions = ref(false)
const showFontSizesOptions = ref(false)
const selectedFont = ref('')
const selectedFontSize = ref('')
const selectedColor = ref('')
const selectedCharSpacing = ref()

// Computed property to check editable field types
const isEditableFieldType = computed(() => {
  const fieldType = templateEditorStore.selectedAddedField?.fieldType
  return ['Data field', 'Dataset date', 'Static text', 'Form text', 'Form date', 'Form time', 'Static date', 'Static time', 'Form long text', 'Form list'].includes(fieldType)
})

// Handlers for font, size, and color changes
function changeColor(e) {
  activeTextStyles.fill = e.target.value
}

function changeFont(e) {
  activeTextStyles.fontFamily = e.value
}

function changeSize(e) {
  activeTextStyles.fontSize = e.value
}

// Text style toggles
function toggleUnderline() {
  activeTextStyles.underline = !activeTextStyles.underline
}

function toggleBold() {
  activeTextStyles.fontWeight = activeTextStyles.fontWeight === 700 ? 300 : 700
}

function toggleItalic() {
  activeTextStyles.fontStyle = activeTextStyles.fontStyle === 'italic' ? 'normal' : 'italic'
}

// Align Text
function setTextAlign(alignment) {
  activeTextStyles.textAlign = alignment
}

// Character spacing handlers
function reduceCharacterSpacing() {
  activeTextStyles.charSpacing = activeTextStyles.charSpacing ? activeTextStyles.charSpacing - 50 : -50
}

function increaseCharacterSpacing() {
  activeTextStyles.charSpacing = activeTextStyles.charSpacing ? activeTextStyles.charSpacing + 50 : 50
}

// Dropdown visibility handlers
function toggleFontOptions() {
  showFontOptions.value = true
  showFontSizesOptions.value = false
}

function toggleFontSizeOptions() {
  showFontSizesOptions.value = true
  showFontOptions.value = false
}

// Sync activeTextStyles with dropdowns
watch(activeTextStyles, () => {
  selectedFont.value = activeTextStyles.fontFamily
  selectedFontSize.value = activeTextStyles.fontSize
  selectedColor.value = activeTextStyles.fill
  selectedCharSpacing.value = activeTextStyles.charSpacing
})

onMounted(() => {
  selectedFont.value = activeTextStyles.fontFamily
  selectedFontSize.value = activeTextStyles.fontSize
  selectedColor.value = activeTextStyles.fill
  selectedCharSpacing.value = activeTextStyles.charSpacing
})
</script>

<style scoped>
.is-active {
  background-color: #009ee2;
  color: #fff;
}
.not-active{
  color: #009ee2;
  color: #fff;
}
.is-active:hover {
  background-color: var(--purple-contrast);
  color: #000;
}
.custom-dropdown .p-dropdown-label {
  padding-top: 0rem; /* Adjusts the vertical padding */
  padding-bottom: 0.25rem;
  line-height: 1.2; /* Adjusts how the text fits inside */
  height: 100%;
  display: flex;
  align-items: center; /* Ensures text and cursor are centered */
  font-size: 0.75rem; /* Adjust font size to match your `text-xs` class */
}

.custom-dropdown .p-dropdown-panel {
  padding: 0; /* Optional: To remove any extra padding in the dropdown */
}

.custom-dropdown .p-dropdown-trigger {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
