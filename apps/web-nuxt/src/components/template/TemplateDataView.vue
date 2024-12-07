<template>
  <div class="mt-14 rounded-lg pb-2">
    <DataView :value="filteredTemplates" :layout="layout">
      <template #header>
        <div class="flex  gap-4 md:flex-row justify-between space-x-2">
          <div class="flex flex-col items-center md:flex-row flex-wrap justify-center space-x-5 ">
            <Dropdown
              v-if="!props.isFavouriteView"
              v-model="filterOption"
              :options="filterOptions"
              option-label="label"
              :class="{ 'text-primaryBlue': filterOption !== '' }"
              class="p-dropdown font-poppins py-1"
              placeholder="Select a filter"
            />
            <h2 v-else class=" text-xl font-semibold text-surface-600 ">
              {{ $t('Pg_home.favorite_templates') }}
            </h2>
          </div>
          <div class="flex items-center  ">
            <div class="flex  mr-1">
              <span class="relative flex">
                <i
                  class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
                  style="color: rgb(117, 119, 120);"
                ></i>
                <InputText
                  v-model="searchQuery"
                  :placeholder="$t('Cp_templateDataview.search')"
                  class="pl-10 font-normal font-poppins rounded-lg text-surface-500 border-gray-300 w-full md:w-64"
                />
              </span>
            </div>
            <div class="w-max ml-auto">
              <DataViewLayoutOptions v-model="layout" />
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div v-show="!templatesLoading" class="flex py-8">
          <p class="text-lg text-surface-500 font-poppins">
            {{ $t('Cp_templateDataview.no_templates') }}
          </p>
        </div>
      </template>

      <template #list="slotProps">
        <div v-show="!templatesLoading" class="flex flex-wrap">
          <div
            v-for="(item, index) in slotProps.items" :key="index" class="w-full py-2 pointer-parent"
            @dragover.prevent="item.use_case !== 'Form to doc' && handleDragOver(item, index)"
            @dragenter.prevent="item.use_case !== 'Form to doc' && handleDragEnter(item, index)"
            @dragleave.prevent="item.use_case !== 'Form to doc' && handleDragLeave(item, index)"
            @drop.prevent="item.use_case !== 'Form to doc' && handleFileDrop(item, $event, index)"
          >
            <div v-show="isDragging[index]" class="flex justify-center items-center border-dashed border-2 border-gray-400 flex-col h-[255px] md:h-[150px] sm:items-center px-4 py-2 gap-2 rounded-lg bg-surface-50">
              <font-awesome-icon :icon="fad.faUpload" size="2xl" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2; width: 40px; height: 30px;" />
              <p class="text-primaryBlue font-bold font-poppins text-lg text-center mt-2">
                {{ $t('Cp_templateDataview.drop_data') }}
              </p>
              <p class="text-black font-poppins text-base text-center">
                {{ $t('Cp_templateDataview.supported_formats') }}
              </p>
            </div>
            <div v-if="isLoading[index]" class="flex justify-center items-center border-dashed border-2 border-gray-400 flex-col h-[255px] md:h-[150px] sm:items-center px-4 py-2 gap-2 rounded-lg bg-surface-50">
              <p>Uploading file</p>
              <ProgressSpinner
                :style="{ width: '50px', height: '50px' }"
                stroke-width="4"
                fill="#fff"
                animation-duration=".5s"
                class="progress-spinner-circle"
              />
            </div>

            <div v-else-if="!isDragging[index]" class="flex flex-col sm:flex-row sm:items-center px-4 py-2 gap-2 rounded-lg bg-surface-5050">
              <div class="min-w-[6rem] relative cursor-pointer " @click="handleTemplatePreview(item)">
                <div class="h-max w-full flex justify-center py-1 ">
                  <ImagePreview :preview-hash="item.image_preview_hash" :background-file-url="item.background_file_url" :filtered-templates="filteredTemplates" />
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div class="ml-2">
                    <p class="text-lg sm:text-sm md:text-base lg:text-lg font-poppins text-surface-600 mt-1">
                      {{ item.name }}
                    </p>
                  </div>
                </div>
                <div class="flex sm:flex-row sm:space-y-2 flex-col justify-center md:items-center ml-2 md:ml-0">
                  <div class="flex space-x-5 mr-5 mb-3 md:mb-0">
                    <i v-if="screenWidth > 990" v-tooltip.top="$t('Cp_templateDataview.edit_template')" class="pointer-auto pi pi-file-edit text-surface-500 cursor-pointer" style="font-size: 1.3rem" @click="editTemplate(item)"></i>
                    <i v-tooltip.top="$t('Cp_templateDataview.delete_template')" class="pointer-auto pi pi-trash text-surface-500 cursor-pointer" style="font-size: 1.3rem" @click="confirmDelete(item)"></i>
                    <i v-tooltip.top="$t('Cp_templateDataview.access_data')" class="pointer-auto pi pi-file text-surface-500 cursor-pointer" style="font-size: 1.3rem"></i>
                    <i v-tooltip.top="$t('Cp_templateDataview.access_document')" class="pointer-auto pi pi-folder-open text-surface-500 cursor-pointer" style="font-size: 1.3rem"></i>
                    <i v-tooltip.top="'Duplicate'" class="pointer-auto pi pi-clone text-surface-500 cursor-pointer" style="font-size: 1.3rem" @click="duplicateTemplate(item)"></i>
                    <i v-tooltip.top="$t('Cp_templateDataview.set_as_favorites')" class="pointer-auto cursor-pointer text-surface-500" :class="[favouriteStates[item?.id] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning']" style="font-size: 1.3rem" @click="toggleFavourite(item)"></i>
                  </div>

                  <div class="flex flex-row-reverse md:flex-row">
                    <Button v-if="item.templateType === 'form to doc'" :label="$t('Cp_templateDataview.fill_form')" class="pointer-auto flex-auto md:flex-initial white-space-nowrap w-40 h-12 text-xs" @click="handleFillForm(item)" />
                    <Button v-else-if="item.use_case === 'Expert editor'" outlined label="Preview and Generate" class="pointer-auto flex-auto cursor-pointer font-poppins  text-[16px]" @click="handleExpertEditorGenerationPreview(item)" />
                    <Button v-else :label="$t('Cp_templateDataview.select_or_drop_file')" class="pointer-auto flex-auto md:flex-initial white-space-nowrap w-40 h-12 text-xs" @click="(e) => { templateSelectedForUploadingFile = item; uploadFile(e, index); }" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div v-show="!templatesLoading" class="flex flex-wrap">
          <div
            v-for="(item, index) in slotProps.items" :key="index"
            class="w-full w-[420px] px-2 py-4 pointer-parent  max-w-[380px]"
            @dragover.prevent="item.use_case !== 'Form to doc' && handleDragOver(item, index)"
            @dragenter.prevent="item.use_case !== 'Form to doc' && handleDragEnter(item, index)"
            @dragleave.prevent="item.use_case !== 'Form to doc' && handleDragLeave(item, index)"
            @drop.prevent="item.use_case !== 'Form to doc' && handleFileDrop(item, $event, index)"
          >
            <div v-show="isDragging[index]" class="flex justify-center items-center border-dashed border-2 border-gray-400 px-6 sm:px-4 md:px-4 w-11/12 min-h-[16rem] h-full lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex-col bg-white">
              <font-awesome-icon :icon="fad.faUpload" size="lg" style="--fa-primary-color: #43AF79; --fa-secondary-color: #43AF79; width: 50px; height: 40px;" />
              <p class="text-success font-bold font-poppins text-[16px] text-center mt-5">
                {{ $t('Cp_templateDataview.drop_data') }}
                <!-- {{ console.log('item', item) }} -->
              </p>
              <p class="text-black font-poppins text-[16px] text-center mt-2">
                {{ $t('Cp_templateDataview.supported_formats') }}
              </p>
            </div>
            <div v-if="isLoading[index]" class="flex justify-center items-center border-dashed border-2 border-gray-400 px-6 sm:px-4 md:px-4 w-11/12 min-h-[16rem] h-full lg:px-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex-col bg-white">
              <p>Uploading file</p>
              <ProgressSpinner
                :style="{ width: '50px', height: '50px' }"
                stroke-width="4"
                fill="#fff"
                animation-duration=".5s"
                class="progress-spinner-circle"
              />
            </div>
            <div v-else-if="!isDragging[index]" class="px-3 sm:px-4 md:px-4 min-h-[14rem] h-full lg:px-4 mr-6 py-1 dark:border-surface-700 dark:bg-surface-900 rounded-lg flex flex-col bg-surface-50">
              <div class="flex items-center p-2 pt-4" :class="favouriteStates[item?.id] ? 'justify-between' : 'justify-between'">
                <div class="">
                  <i v-if="favouriteStates[item?.id]" class="cursor-pointer" :class="[favouriteStates[item?.id] ? 'pi pi-star-fill text-warning' : 'pi pi-star hover:text-warning']"></i>
                </div>
                <p class=" text-[18px] font-poppins font-semibold text-surface-600 truncate ">
                  {{ item.name }}
                </p>
                <i class=" pi pi-ellipsis-v text-surface-500 cursor-pointer pointer-auto " @click="(e) => { toggle(e); opItem = item }"></i>
              </div>
              <div class="surface-50 flex items-center  rounded-md  my-2 mt-1 gap-6">
                <div class="relative cursor-pointer pointer-auto   " @click="() => handleTemplatePreview(item)">
                  <ImagePreview :preview-hash="item.image_preview_hash" :background-file-url="item.background_file_url" :filtered-templates="filteredTemplates" />
                </div>
                <div class="flex flex-col gap-1 ">
                  <p class="text-gray-500 text-[14px]">
                    {{ $t('Cp_templateDataview.docs_created') }}: {{ item?.total_generated_docs }}
                  </p>
                  <p class="text-gray-500 text-[14px]">
                    {{ $t('Cp_templateDataview.created_on') }}: {{ formatDateForInput(item?.created_at, "DD/MM/YYYY") }}
                  </p>
                  <p class="text-gray-500 text-[14px]">
                    {{ $t('Cp_templateDataview.modified_on') }}: {{ formatDateForInput(item?.updated_at, "DD/MM/YYYY") }} {{ formatTimeForInput(item?.updated_at, 'HH:MM') }}
                  </p>
                </div>
              </div>

              <div class="mt-4 mb-3">
                <div class="flex flex-col">
                  <Button v-if="item.use_case === 'Form to doc'" outlined :label="$t('Cp_templateDataview.fill_form')" class="pointer-auto flex-auto cursor-pointer font-poppins  text-[16px]" @click="handleFillForm(item)" />
                  <Button v-else-if="item.use_case === 'Expert editor'" outlined label="Preview and Generate" class="pointer-auto flex-auto cursor-pointer font-poppins  text-[16px]" @click="handleExpertEditorGenerationPreview(item)" />

                  <Button
                    v-else
                    outlined
                    severity="success" :label="$t('Cp_templateDataview.select_or_drop_file')" class="pointer-auto flex-auto white-space-nowrap font-poppins cursor-pointer  text-[16px]" @click="(e) => {
                      templateSelectedForUploadingFile = item;
                      uploadFile(e, index);
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <template v-if="templatesLoading">
      <div v-if="layout === 'grid'" class="flex flex-wrap gap-3">
        <GridSkeleton v-for="n in 3" :key="n" class=" " />
      </div>
      <div v-else class="w-full">
        <ListSkeleton v-for="n in 3" :key="n" />
      </div>
    </template>

    <Dialog
      v-model:visible="previewFormVisible"
      modal
      :draggable="false"
      :style="mobile ? { width: '28rem' } : { maxWidth: '90vw', width: 'max-content' }"
      :pt="{
        header: {
          class: [
            'flex items-center justify-between',
            'shrink-0',
            'p-6',
            `pb-${mobile ? '0' : ''}`,
            'border-t-0',
            'rounded-tl-lg',
            'rounded-tr-lg',
            'bg-surface-0 dark:bg-surface-800',
            'text-surface-700 dark:text-surface-0/80',
          ],
        },
      }"
    >
      <template #header>
        <div :class="`${mobile ? '' : 'pl-4'}`" class="flex flex-row gap-3 w-full">
          <div class="inline-flex align-items-center justify-content-center gap-2">
            <span class="text-lg text-primary-600 font-poppins font-normal">{{ $t('Cp_formEditor_finalPreview.form_to_doc_generation') }}</span>
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <FormToDocGenerationModal
            :user-value="user"
            :mobile="mobile"
            :form-title="formTitle"
            :all-form-fields="currentTemplateAllFormFields"
            :form-description="formDescription"
            :is-collapsed="isCollapsed"
            :is-generatable="true"
            :template-data="currentTemplate"
            @cancel="previewFormVisible = false"
            @update-generated-docs="updateGeneratedDocs"
          />
        </div>
      </template>
    </Dialog>
    <OverlayPanel ref="op">
      <div class="flex flex-col justify-start w-48 h-max">
        <p v-if="screenWidth > 990" class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded" @click="editTemplate(opItem)">
          {{ $t('Cp_templateDataview.edit_template') }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded" @click="confirmDelete(opItem)">
          {{ $t('Cp_templateDataview.delete_template') }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">
          {{ $t('Cp_templateDataview.access_data') }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded">
          {{ $t('Cp_templateDataview.access_document') }}
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded" @click="duplicateTemplate(opItem)">
          Duplicate
        </p>
        <p class="text-lg text-surface-500 font-poppins font-normal p-2 hover:bg-surface-100 cursor-pointer rounded" @click="toggleFavourite(opItem)">
          {{ favouriteStates[opItem?.id] ? $t('Cp_templateDataview.remove_from_favourites') : $t('Cp_templateDataview.set_as_favorites') }}
        </p>
      </div>
    </OverlayPanel>
  </div>
  <TemplatePreview v-if="visible" v-model:visible="visible" :template="currentTemplate" @cancel="visible = false" @outside-click="handleOutsideClick" />

  <Dialog v-model:visible="visibleDataToDoc" :draggable="false" modal :header="$t('Cp_dataToDoc_generation.header')" class="w-max" :style="{ width: '92vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="text-lg text-primary-600 font-poppins font-normal">{{ $t('Cp_dataToDoc_generation.header') }}</span>
      </div>
    </template>
    <template #default>
      <DataToDocGenerationModal v-if="visibleDataToDoc" v-model:visible="visibleDataToDoc" :template="currentTemplate" @cancel="visibleDataToDoc = false" @outside-click="handleOutsideClick" />
    </template>
  </Dialog>
  <Dialog v-model:visible="visibleExpertEditorPreview" :draggable="false" modal :header="$t('Cp_dataToDoc_generation.header')" class="w-max" :style="{ width: '92vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="text-lg text-primary-600 font-poppins font-normal">Exert editor generation</span>
      </div>
    </template>
    <template #default>
      <ExpertDocGenerationModal v-if="visibleExpertEditorPreview" v-model:visible="visibleExpertEditorPreview" :template="currentTemplate" @cancel="visibleExpertEditorPreview = false" @outside-click="handleOutsideClick" />
    </template>
  </Dialog>
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
        <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>

  <Toast position="top-right">
    <template #message="slotProps">
      <div class="flex items-start space-x-2">
        <div class="mt-1">
          <font-awesome-icon :icon="fal.faFileCircleXmark" size="lg" style="color: #c8432f;" />
        </div>
        <div class="">
          <div class="font-bold text-lg font-poppins text-error">
            {{ slotProps.message.summary }}
          </div>
          <div class="font-normal text-base font-poppins text-error">
            {{ slotProps.message.detail }}
          </div>
        </div>
      </div>
    </template>
  </Toast>

  <Toast position="top-right" group="ac" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-col items-start flex-auto">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="fa-bold fa-clock-rotate-left" size="lg" class="rotate-180" />
          <div>
            <p class="font-bold">
              {{ slotProps?.message?.summary }}
            </p>
            <p class="font-normal">
              {{ slotProps?.message?.detail }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'

import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import ExcelJS from 'exceljs'
import Papa from 'papaparse'
import { useRouter } from 'vue-router'
import Dropdown from 'primevue/dropdown'
import { useI18n } from 'vue-i18n'
import { DataToDocGenerationModal, ExpertDocGenerationModal, FormToDocGenerationModal } from '@docspawn/shared-doc-generation-modals'
import TemplatePreview from './TemplatePreview.vue'
import ImagePreview from './ImagePreview'
import GridSkeleton from './skeletons/GridSkeleton.vue'
import ListSkeleton from './skeletons/ListSkeleton.vue'
import { useAuth } from '@/composables/useAuth'

import { activeTextStyles, templateEditorStore } from '@/composables/useTemplateEditorData'
import { docGenerationData } from '@/composables/useDocGenerationData'
import { formatDateForInput, formatTimeForInput } from '@/utils/dateFunctions'
import { useScreenWidth } from '@/composables/useScreenWidth'

const props = defineProps({
  templates: {
    type: Array,
    required: true,
    default: () => [],
  },
  isFavouriteView: {
    type: Boolean,
  },
})

const emit = defineEmits(['deleteTemplate', 'updateTemplatesForFavourites', 'refreshTemplates'])

const { user } = useAuth()

const { screenWidth } = useScreenWidth()

const { t } = useI18n()

const filterOptions = ref([
  { label: t('Cp_templateDataview.all'), value: '' },
  { label: t('Cp_templateDataview.favorites'), value: 'favorites' },
  { label: t('Cp_templateDataview.form_to_doc'), value: 'form to doc' },
  { label: t('Cp_templateDataview.data_to_doc'), value: 'data to doc' },
  { label: t('Cp_templateDataview.table_to_doc'), value: 'table to doc' },
])

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const allGeneratedDocs = ref()

function updateGeneratedDocs(val) {
  allGeneratedDocs.value = val
}

// const confirm = useConfirm()
function confirmDelete(template) {
  confirm.require({
    group: 'templating',
    header: 'Confirmation',
    message: `Please confirm you want to delete template "${template?.name}""`,
    icon: 'pi pi-trash',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      // console.log('template to delete', template)

      emit('deleteTemplate', template)

      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}

const templatesLoading = ref(true)
const layout = ref('grid')

const favouriteStates = reactive({})
const currentTemplate = ref()
const visible = ref(false)
const visibleDataToDoc = ref(false)
const previewFormVisible = ref(false)
const isDragging = ref(Array.from({ length: props.templates.length }).fill(false))
const isLoading = ref(Array.from({ length: props.templates.length }).fill(false))
const visibleExpertEditorPreview = ref(false)

const filterOption = ref(filterOptions.value[0])

const searchQuery = ref('')
const fileTypeCheck = ref(false)

// template selected while manual file uploading
const templateSelectedForUploadingFile = ref()

onMounted(() => {
  setTimeout(() => {
    templatesLoading.value = false
  }, 2000)
})

// default favorite state
props.templates.forEach((template, index) => {
  favouriteStates[template?.id] = template.is_favourite
})

const currentTemplateAllFormFields = ref('')
function handleFillForm(item) {
  // console.log('template at handle fill form', item)
  currentTemplate.value = item
  currentTemplateAllFormFields.value = item.added_fields?.filter(f => f?.isFormField)

  previewFormVisible.value = true
}

// default favorite state based on template changes
watch(() => props.templates, (newVal) => {
  newVal.forEach((template, index) => {
    favouriteStates[template?.id] = template.is_favourite
  })
})
const runtimeConfig = useRuntimeConfig()

function handleTemplatePreview(template) {
  visible.value = true
  currentTemplate.value = template
}
function handleDataToDocGenerationPreview(template) {
  visibleDataToDoc.value = true
  currentTemplate.value = template
}
function handleExpertEditorGenerationPreview(template) {
  visibleExpertEditorPreview.value = true
  currentTemplate.value = template
}
const op = ref()

function toggle(event) {
  op.value.toggle(event)
}

const filteredTemplates = computed(() => {
  let filtered = props.templates

  switch (filterOption.value.value) {
    case 'favorites':
      filtered = filtered.filter(template => template.isFavorite === true)
      break
    case 'form to doc':
      filtered = filtered.filter(template => template.use_case === 'Form to doc')
      break
    case 'data to doc':
      filtered = filtered.filter(template => template.use_case === 'Data to doc')
      break
    case 'table to doc':
      filtered = filtered.filter(template => template.use_case === 'table to doc')
      break
  }

  // Filter by search query
  if (searchQuery.value)
    filtered = filtered.filter(template => template.name.toLowerCase().includes(searchQuery.value.toLowerCase()))

  return filtered
})

function handleOutsideClick() {
  visible.value = false
  visibleDataToDoc.value = false
  visibleExpertEditorPreview.value = false
}

function editTemplate(temp) {
  templateEditorStore.templateToEdit = temp
  if (temp?.id) {
    templateEditorStore.addedFields = temp?.added_fields
    templateEditorStore.datasetData = temp?.dataset_data

    templateGeneralInformation.name = temp?.name
    templateGeneralInformation.useCase = temp?.use_case
    templateGeneralInformation.backgroundFileUrl = temp?.background_file_url
    templateGeneralInformation.datasetFileUrl = temp?.dataset_file_url

    templateDeliveryOptions.fileFormat = temp?.delivery_options.fileFormat
    templateDeliveryOptions.fileOutput = temp?.delivery_options.fileOutput
    templateDeliveryOptions.forceEntriesVerification = temp?.delivery_options.forceEntriesVerification
    templateDeliveryOptions.thirdPartyFormFilling = temp?.delivery_options.thirdPartyFormFilling
    templateDeliveryOptions.emailDeliveryOption = temp?.delivery_options.emailDeliveryOption
    templateDeliveryOptions.selectedEmails = temp?.delivery_options.selectedEmails
  }
  setTimeout(() => {
    router.currentRoute.value.path = '/templates/'
    router.push('update')
  }, 200)
}

function handleDragEnter(item, index) {
  // console.log('entering', index, entered)

  if (!isDragging.value[index]) {
    isDragging.value.fill(false)
    isDragging.value[index] = true
  }
}

function handleDragLeave(event, index) {
  // Check if the related target is still within the current element
  // console.log('leaving', index)
  isDragging.value[index] = false
}

function handleDragOver(item, index) {
  // You could simply set isDragging to true again if needed, or do nothing
  isDragging.value[index] = true
}
function showError() {
  toast.add({ severity: 'error', summary: 'Invalid file', detail: 'Please upload a .csv, .xls or .xlsx file', life: 10000 })
}
function handleFileDrop(template, event, index) {
  const files = event.dataTransfer.files

  if (!files[0]) {
    isDragging.value.fill(false)
    showError()
  }
  else {
    const fileName = files[0].name
    const fileType = fileName.split('.').pop()

    if (fileType === 'xlsx' || fileType === 'xls' || fileType === 'csv') {
      fileTypeCheck.value = true
      handleFileUpload(files[0], template, index)
    }
    else {
      fileTypeCheck.value = false
      showError()
    }
    isDragging.value.fill(false)
  }
}
function handleFileUpload(file, template, index) {
  /** */
  isLoading.value.fill(false)
  isLoading.value[index] = true
  /** */
  const keysToCheck = template?.dataset_data?.selectedKeys

  if (!file) {
    console.error('No file provided')
    return
  }

  const reader = new FileReader()

  reader.onload = async (e) => {
    const arrayBuffer = e.target.result
    let headers = []

    if (file.type.includes('sheet') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
      // Handling Excel file using ExcelJS
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(arrayBuffer)
      const worksheet = workbook.worksheets[0]

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) { // assuming first row is headers
          row.eachCell({ includeEmpty: true }, (cell) => {
            headers.push(cell.value)
          })
        }
      })
    }
    else if (file.type.includes('csv') || file.name.endsWith('.csv')) {
      // Handling CSV file using PapaParse
      Papa.parse(file, {
        complete(results) {
          headers = results.data[0]
          compareAndNotify(headers, keysToCheck, template)
        },
        header: false,
      })
      return
    }
    else {
      console.error('Unsupported file type')
      return
    }

    compareAndNotify(headers, keysToCheck, template)
  }

  // Reading data accordingly
  if (file.type.includes('sheet') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))
    reader.readAsArrayBuffer(file)
  else if (file.type.includes('csv') || file.name.endsWith('.csv'))
    reader.readAsText(file)
  else
    console.error('Unsupported file type')
}
function compareAndNotify(headers, keysToCheck, template) {
  const isAllKeysPresent = keysToCheck.every(key => headers.includes(key))

  if (isAllKeysPresent) {
    // You can use a toast or some UI element to notify the user
    isLoading.value.fill(false)

    toast.add({ severity: 'success', summary: 'Congrats', detail: 'All keys present', life: 3000 })
    handleDataToDocGenerationPreview(template)
  }
  else {
    isLoading.value.fill(false)
    toast.add({ severity: 'error', summary: 'Invalid file', detail: 'This file doesn\'t match the template data', life: 10000 })
  }
}

function uploadFile(e, index) {
  const template = templateSelectedForUploadingFile.value
  templateSelectedForUploadingFile.value = null
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  fileInput.style.display = 'none'

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    file
    && handleFileUpload(file, template, index)
    // const reader = new FileReader()

    // reader.onload = () => {
    //   avatarImage.value = reader.result
    // }

    // if (file)
    //   reader.readAsDataURL(file)
  })

  document.body.appendChild(fileInput)
  fileInput.click()
}
async function toggleFavourite(template) {
  const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/toggle-favourite/${template?.id}`)
  if (!response.ok) {
    toast.add({ severity: 'error', summary: 'Failed', detail: 'Unable to perform at the moemnt!', life: 10000 })
  }
  else {
    const allTempsF = filteredTemplates.value
    if (props?.isFavouriteView) {
      const n = allTempsF?.filter(f => f?.id !== template?.id)
      emit('updateTemplatesForFavourites', n)
      favouriteStates[template?.id] = !favouriteStates[template?.id]
    }
    else {
      allTempsF?.forEach((temp) => {
        if (temp?.id === template?.id) {
          const objToReturn = { ...temp, is_favourite: !favouriteStates[temp?.id] }
          favouriteStates[template?.id] = objToReturn?.is_favourite
        }
      })
    }

    layout.value === 'grid' && op.value.toggle()
    toast.add({ severity: 'success', summary: 'Succeed', detail: !favouriteStates[template?.id] ? 'Template removed from favourites' : 'Template set as favourite', life: 3000 })
  }
}
async function duplicateTemplate(template) {
  const objToSend = {
    account_type: template?.account_type,
    name: `${template?.name}- copy`,
    use_case: template?.use_case,
    background_file_url: template?.background_file_url,
    dataset_file_url: template?.dataset_file_urll,
    dataset_start_line: template?.dataset_start_line,
    template_options: JSON.stringify(template?.template_options),
    last_text_options: JSON.stringify(template?.last_text_options),
    page_sizes: JSON.stringify(template?.page_sizes),
    added_fields: JSON.stringify(template?.added_fields),
    dataset_data: JSON.stringify(template?.dataset_data),
    canvas_data: JSON.stringify(template?.canvas_data),
    delivery_options: JSON.stringify(template?.delivery_options),
    canvas_size: JSON.stringify(template?.canvas_size),
    editor_fields_data:
    JSON.stringify(template.editor_fields_data),

  }
  console.log('obj to send', objToSend)

  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(objToSend), // Serialize the object to JSON string
    })
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    // const data = await response.json()
    toast.add({ severity: 'success', summary: 'Info', detail: 'Template saved successfully', life: 1000 })
    emit('refreshTemplates')
  }
  catch (error) {
    isSaving.value = false
    console.error('Error:', error)
    toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to save the template', life: 5000 })
  }
}
</script>

<style>
.pointer-parent *{

  pointer-events: none;
}
.pointer-auto{
  pointer-events: auto;
}
</style>
