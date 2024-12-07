<template>
  <div class="w-full bg-secondary overflow-y-scroll no-scrollbar">
    <div class="px-4 py-7 flex flex-col gap-2 bg-white">
      <div class="">
        <h2 class="font-semibold text-surface-600 text-2xl mt-2 px-5">
          {{ $t('Pg_template_create.template_creation') }}
        </h2>
        <div class="flex items-center justify-center -mt-2 rounded-lg border-none">
          <Stepper v-model:activeStep="active">
            <StepperPanel>
              <template #header="{ index, clickCallback }">
                <button v-tooltip.top="$t('Pg_template_create.general_information')" class="bg-transparent border-none inline-flex flex-column gap-2 " @click="clickCallback">
                  <font-awesome-icon v-if="active >= index" :icon="fad.faSquareInfo" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                  <font-awesome-icon v-else-if="index > active" :icon="fad.faSquareInfo" class="w-12 h-12" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;" />
                </button>
              </template>
              <template #content="{ index, nextCallback }">
                <div class="mb-32">
                  <div class="flex justify-center mx-24">
                    <GeneralInfo v-if="active === index" @update-data="handleUpdateData" />
                  </div>
                  <div class="flex justify-center mb-6 space-x-8 mt-4">
                    <Button :label="$t('Pg_template_create.cancel')" outlined icon="pi pi-times" severity="error" class="bg-error hover:bg-red-100 border-error hover:border-error text-error" @click="requireConfirmation($event)" />
                    <Button :label="$t('Pg_template_create.next')" icon="pi pi-arrow-right" :disabled="!isStep1Valid" icon-pos="right" class="bg-primaryBlue border-primaryBlue px-5" @click="nextCallback" />
                  </div>
                </div>
              </template>
            </StepperPanel>
            <StepperPanel v-if="templateGeneralInformation.useCase === 'Data to doc'" header="$t('Pg_template_create.data_selection')">
              <template #header="{ index, clickCallback }">
                <button v-tooltip.top="$t('Pg_template_create.data_selection')" :disabled="!isStep2Valid" class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback">
                  <font-awesome-icon v-if="active >= index" :icon="fad.faDatabase" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                  <font-awesome-icon v-else-if="index > active" :icon="fad.faDatabase" class="w-12 h-12" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;" />
                </button>
              </template>
              <template #content="{ index, prevCallback, nextCallback }">
                <div class="mx-10">
                  <DataSelection v-if="active === index" @update-data="handleUpdateData" />
                </div>
                <div class="flex pt-4 justify-center mb-14 mx-52">
                  <Button :label="$t('Pg_template_create.back')" outlined icon="pi pi-arrow-left" class="bg-primaryBlue mr-4 px-5" @click="prevCallback" />
                  <Button :label="$t('Pg_template_create.next')" icon="pi pi-arrow-right" :disabled="!isStep2Valid" icon-pos="right" class="bg-primaryBlue border-primaryBlue px-5" @click="nextCallback" />
                </div>
              </template>
            </StepperPanel>

            <StepperPanel header="$t('Pg_template_create.template_editor')">
              <template #header="{ index, clickCallback }">
                <button v-tooltip.top="$t('Pg_template_create.template_editor')" :disabled="!isStep1Valid" class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback">
                  <font-awesome-icon v-if="active >= index" :icon="fad.faFileInvoice" class="w-12 h-12" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                  <font-awesome-icon v-else-if="index > active" :icon="fad.faFileInvoice" class="w-12 h-12" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;" />
                </button>
              </template>
              <template #content="{ index, prevCallback, nextCallback }">
                <div class="mx-0">
                  <TemplateEditor v-if="active === index || canvasService.getCanvas()" @save-template="nextCallback" />
                  <!-- v-if="active === index" -->
                </div>
                <div class="flex pt-4 justify-center mt-24 mx-52 space-x-8">
                  <!-- <Button :label="$t('Pg_template_create.back')" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5" @click="prevCallback" /> -->
                  <!-- <Button :label="$t('Pg_template_create.next')" icon="pi pi-arrow-right" icon-pos="right" class="bg-primaryBlue border-primaryBlue px-5" @click="nextCallback" /> -->
                </div>
              </template>
            </StepperPanel>

            <StepperPanel header="$t('Pg_template_create.delivery_options')">
              <template #header="{ index, clickCallback }">
                <button v-tooltip.top="$t('Pg_template_create.delivery_options')" :disabled="!isStep3Valid" class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback">
                  <font-awesome-icon v-if="active >= index" :icon="fad.faSliders" class="w-10 h-11" style="--fa-primary-color: #009ee2; --fa-secondary-color: #009ee2;" />
                  <font-awesome-icon v-else-if="index > active" :icon="fad.faSliders" class="w-10 h-11" style="--fa-primary-color: #949494; --fa-secondary-color: #ababab;" />
                </button>
              </template>
              <template #content="{ index, prevCallback }">
                <div class="flex mx-7">
                  <DeliveryOptions v-if="active === index" />
                </div>
                <div class="flex pt-4 justify-center mb-5 mx-52">
                  <Button :label="$t('Pg_template_create.back')" outlined icon="pi pi-arrow-left" class="bg-primaryBlue px-5" @click="prevCallback" />
                  <Button :disabled="isSaving" :label="$t('Pg_template_create.save_template')" class="px-4 w-max font-poppins ml-2" @click="saveTemplate()" />
                </div>
              </template>
            </StepperPanel>
          </Stepper>
        </div>
        <div class="flex justify-center">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'
import ExcelJS from 'exceljs'
import * as pdfjs from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import GeneralInfo from '../../components/createTemplate/generalInfo/GeneralInfo.vue'
import DeliveryOptions from '~/components/createTemplate/DeliveryOptions.vue'
import DataSelection from '~/components/createTemplate/dataSelection/DataSelection.vue'
import TemplateEditor from '~/components/createTemplate/TemplateEditor.vue'
import { resetAllTemplateCreationValues, templateDeliveryOptions, templateGeneralInformation } from '~/composables/useTemplateCreationData'
import { activeTextStyles, resetAllTemplateEditorValues, templateEditorStore } from '@/composables/useTemplateEditorData'

// import { accountData } from '@/composables/useAccountData'
import { useAuth } from '@/composables/useAuth'

import canvasService from '@/composables/useTemplateCanvas'

const { token, setToken, fetchUserDetails, user, setUser } = useAuth()

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const toast = useToast()
const confirm = useConfirm()
const active = ref(0)
const isStep1Valid = ref(false)
const isStep2Valid = ref(true)
const isStep3Valid = ref(false)

function requireConfirmation(event) {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Your modifications will be lost. Are you sure?',
  })
}

function handleUpdateData({ isValid, step }) {
  if (step === 1)
    isStep1Valid.value = isValid
  else if (step === 2)
    isStep2Valid.value = isValid
  else if (step === 3)
    isStep3Valid.value = isValid
}
async function fetchSizes(url) {
  if (url) {
    const response = await fetch(url)
    const pdfData = await response.arrayBuffer()

    pdfjs.GlobalWorkerOptions.workerSrc
      = pdfjsWorker
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise

    const pageSizes = []

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      // console.log('page getSize', page.getSize())
      const viewport = page.getViewport({ scale: 1 })
      pageSizes.push({ height: viewport?.height, width: viewport?.width })
    }
    // console.log('page sizes', pageSizes)
    return pageSizes
    // setPdfPageSizes(pageSizes) // Assuming you have a state or function to save the page sizes array
  }
}
const isSaving = ref(false)
async function saveTemplate() {
  isSaving.value = true
  toast.add({ severity: 'success', summary: templateEditorStore?.templateToEdit?.id ? 'Updating template' : 'Saving template', detail: 'Process started', life: 1000 })
  if (templateGeneralInformation.useCase === 'Expert editor') {
    const pageSizes = [{ width: templateEditorStore.expertEditorWidth, height: templateEditorStore.expertEditorHeight }]

    // return
    const objToSend = {
      account_type: user?.value?.email,
      name: templateGeneralInformation?.name || 'sample',
      template_options: JSON.stringify({ fileNamingString: templateEditorStore?.fileNamingString || 'Sample expert editor template' }),
      page_sizes: JSON.stringify(pageSizes),
      delivery_options: JSON.stringify(templateDeliveryOptions),
      editors_data: JSON.stringify(templateEditorStore?.expertEditorHtmlContent),
    }

    // return true
    if (templateEditorStore?.templateToEdit?.id) {
      try {
        const response = await fetch(`${runtimeConfig.public.BASE_URL}/expert-templates/${templateEditorStore?.templateToEdit?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Specify content type as JSON
          },
          body: JSON.stringify(objToSend), // Serialize the object to JSON string
        })
        if (!response.ok)
          throw new Error(`Network response was not ok ${response.statusText}`)

        // const data = await response.json()
        toast.add({ severity: 'success', summary: 'Info', detail: 'Template updated successfully', life: 1000 })

        try {
          setTimeout(() => {
            resetAllTemplateCreationValues()
            resetAllTemplateEditorValues()
            canvasService.refreshCanvas()
            router.currentRoute.value.path = '/'
            router.push('templates')
          }, 500)
        }
        catch (err) {
          // console.log('error', err)
        }
      }
      catch (error) {
        isSaving.value = false
        console.error('Error:', error)
        toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to update the template', life: 5000 })
      }
    }
    else {
      try {
        const response = await fetch(`${runtimeConfig.public.BASE_URL}/expert-templates`, {
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
        try {
          setTimeout(() => {
            resetAllTemplateCreationValues()
            resetAllTemplateEditorValues()
            canvasService.refreshCanvas()
            router.currentRoute.value.path = '/'
            router.push('templates')
          }, 500)
        }
        catch (err) {
          // console.log('error', err)
        }
      }
      catch (error) {
        isSaving.value = false
        console.error('Error:', error)
        toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to save the template', life: 5000 })
      }
    }
  }
  else {
    const canvas = canvasService.getCanvas()
    if (!canvas)
      return
    const pageSizes = await fetchSizes(templateGeneralInformation?.backgroundFileUrl ? templateGeneralInformation?.backgroundFileUrl : templateEditorStore?.templateBackgroundUrl)
    // return
    const canvasSize = { height: canvas.height, width: canvas.width }

    // map is for- when it will be loaded first page will be visible
    const objects = canvas?.getObjects().filter(obj =>
      obj.type !== 'line',
    //  && obj?.fieldType !== 'checkboxIdNoIcon',
    ).map((obj) => {
      if (obj?.id === 'watermark-docspawn')
        return obj

      if (obj.pageNo === 1)
        obj.set({ visible: true, opacity: 1 })
      else obj.set({ visible: false, opacity: 0 })
      return obj
    })
    // creating deserialized because by default canvas does not save its all attributes of object
    const deserializedObjects = objects.map((obj) => {
      return obj.toObject(['id', 'hash', '_controlsVisibility', '__eventListeners', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'fieldType', 'displayGuide', 'charSpacing', 'cornerColor', 'cornerStyle', 'borderColor', 'transparentCorners', 'checkboxIdentifierHash', 'checkboxGroupHash', 'selectable', 'visible', 'opacity', 'pageNo', 'checkboxHash', 'lockScalingFlip'])
    })

    let canvasToSend = JSON.parse(JSON.stringify(canvas))
    canvasToSend = { ...canvasToSend, objects: deserializedObjects }
    // return
    const objToSend = {
      account_type: user?.value?.email,
      name: templateGeneralInformation?.name || 'sample',
      use_case: templateGeneralInformation?.useCase,
      background_file_url: templateGeneralInformation?.backgroundFileUrl ? templateGeneralInformation?.backgroundFileUrl : templateEditorStore?.templateBackgroundUrl,
      dataset_file_url: templateGeneralInformation?.datasetFileUrl || null,
      dataset_start_line: templateEditorStore.datasetStartAtLine,
      template_options: JSON.stringify({ watermarkDisabled: templateEditorStore?.watermarkDisabled, watermarkImage: templateEditorStore?.watermarkImage, fileNamingString: templateEditorStore?.fileNamingString, enableCustomFileNaming: templateEditorStore?.enableCustomFileNaming }),
      last_text_options: JSON.stringify({ activeTextStyles, lastScaledTextOptions: templateEditorStore?.lastScaledTextOptions }),
      page_sizes: JSON.stringify(pageSizes),
      added_fields: JSON.stringify(templateEditorStore?.addedFields),
      dataset_data: JSON.stringify(templateEditorStore?.datasetData),
      canvas_data: JSON.stringify(canvasToSend),
      delivery_options: JSON.stringify(templateDeliveryOptions),
      canvas_size: JSON.stringify(canvasSize),
      editor_fields_data:
    JSON.stringify(templateEditorStore.editor_fields_data),
      //  JSON.stringify({
      //   editorContainers: templateEditorStore?.editorContainers,
      //   editorContainersRefs: templateEditorStore?.editorContainerRefs,
      //   fabricObjectRefs: templateEditorStore?.fabricObjectRefs,
      // }),
      // expert_container_html_content: JSON.stringify(templateEditorStore?.expertEditorHtmlContent),
      // expert_editor_dimensions: JSON.stringify({ height: templateEditorStore?.expertEditorHeight, width: templateEditorStore?.expertEditorWidth }),

    }

    // return true
    if (templateEditorStore?.templateToEdit?.id) {
      try {
        const response = await fetch(`${runtimeConfig.public.BASE_URL}/templates/${templateEditorStore?.templateToEdit?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Specify content type as JSON
          },
          body: JSON.stringify(objToSend), // Serialize the object to JSON string
        })
        if (!response.ok)
          throw new Error(`Network response was not ok ${response.statusText}`)

        // const data = await response.json()
        toast.add({ severity: 'success', summary: 'Info', detail: 'Template updated successfully', life: 1000 })

        try {
          setTimeout(() => {
            resetAllTemplateCreationValues()
            resetAllTemplateEditorValues()
            canvasService.refreshCanvas()
            router.currentRoute.value.path = '/'
            router.push('templates')
          }, 500)
        }
        catch (err) {
          // console.log('error', err)
        }
      }
      catch (error) {
        isSaving.value = false
        console.error('Error:', error)
        toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to update the template', life: 5000 })
      }
    }
    else {
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
        try {
          setTimeout(() => {
            resetAllTemplateCreationValues()
            resetAllTemplateEditorValues()
            canvasService.refreshCanvas()
            router.currentRoute.value.path = '/'
            router.push('templates')
          }, 500)
        }
        catch (err) {
          // console.log('error', err)
        }
      }
      catch (error) {
        isSaving.value = false
        console.error('Error:', error)
        toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to save the template', life: 5000 })
      }
    }
  }
}

function getFileType(url) {
  // Use URL constructor to parse the URL
  const parsedUrl = new URL(url)

  // Get the pathname from the URL which contains the file name
  const pathname = parsedUrl.pathname

  // Extract the file extension from the pathname
  const fileExtension = pathname.split('.').pop()

  // Return the file extension
  return fileExtension
}
function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj[key] !== '')
      return false
  }
  return true
}
function isURL(str) {
  // Regular expression to match URL pattern
  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i

  // Test the string against the regex pattern
  return urlPattern.test(str)
}
async function readDataset() {
  const datasetUrl = templateGeneralInformation?.datasetFileUrl ? templateGeneralInformation?.datasetFileUrl : 'https://docspawn-bucket-1.s3.eu-central-1.amazonaws.com/docspawn-bucket-1/51b2ee2b-f2d3-4fc4-8c6e-8be78fd0a482_template_canvas_dataset.xlsx'
  try {
    const response = await fetch(datasetUrl)
    const arrayBuffer = await response.arrayBuffer()

    const fileType = getFileType(datasetUrl)
    if (fileType === 'xlsx') {
      // Create a new workbook and read the file
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(arrayBuffer)

      // Get the first worksheet
      const worksheet = workbook.worksheets[0]

      // Convert worksheet to JSON
      const jsonData = []
      const headers = []
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) {
        // Assuming the first row contains headers
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            headers.push(cell.value)
          })
        }
        else {
          const rowData = {}
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rowData[headers[colNumber - 1]] = cell.value
          })
          jsonData.push(rowData)
        }
      })
      const urlKeys = []
      headers?.forEach((key) => {
        let i = 0
        while (i < 100 && i < jsonData?.length) {
          // console.log('jsonData[i][key])', isURL(jsonData[i][key]), jsonData[i][key])
          if (isURL(jsonData[i][key]) || isURL(jsonData[i][key]?.text)) {
            urlKeys.push(key)
            i = jsonData?.length + 1
          }
          i++
        }
      })

      // Store the formatted data in the templateEditorStore
      templateEditorStore.datasetData = templateEditorStore?.templateToEdit?.id ? templateEditorStore?.templateToEdit?.dataset_data : { keys: headers, allEntries: jsonData, selectedKeys: headers, urlKeys }
    }
    if (fileType === 'csv') {
      // Dynamically import PapaParse
      const Papa = await import('papaparse')

      // Decode arrayBuffer to a string
      const csvText = new TextDecoder().decode(arrayBuffer)

      // Parse CSV file using PapaParse
      Papa.parse(csvText, {
        complete: (results) => {
          const parsedData = results.data
          const filteredData = parsedData.filter(
            entry => !isObjectEmpty(entry),
          )

          // Assuming similar structure as for XLSX
          const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : []
          // keys which are url
          const urlKeys = []
          headers?.forEach((key) => {
            let i = 0

            while (i < 100 && i < filteredData?.length) {
              // console.log('isURL(filteredData[i][key])', isURL(filteredData[i][key]), filteredData[i][key])
              if (isURL(filteredData[i][key]) || isURL(filteredData[i][key]?.text)) {
                urlKeys.push(key)
                i = filteredData?.length + 1
              }
              i++
            }
          })
          templateEditorStore.datasetData = { keys: headers, allEntries: filteredData, selectedKeys: headers, urlKeys }
        },
        header: true,
      })
    }
  }
  catch (error) {
    console.error('Error fetching or processing file:', error)
  }
}

onMounted(() => {
  // templateEditorStore.templateToEdit = {}
  if (!templateEditorStore.templateToEdit?.id) {
    templateEditorStore.addedFields = []
    templateEditorStore.datasetData = {}
    templateEditorStore.lastScaledTextOptions = { x: 1, y: 1 }

    templateEditorStore.editorContainers = []
    templateEditorStore.editorContainerRefs = {}
    templateEditorStore.fabricObjectRefs = {}
    templateEditorStore.canvasScaleFactors = { x: 1, y: 1 }
    templateEditorStore.editor_fields_data = {}

    templateGeneralInformation.name = ''
    templateGeneralInformation.useCase = ''
    templateGeneralInformation.backgroundFileUrl = ''
    templateGeneralInformation.datasetFileUrl = ''

    templateDeliveryOptions.fileFormat = ''
    templateDeliveryOptions.fileOutput = ''
    templateDeliveryOptions.forceEntriesVerification = ''
    templateDeliveryOptions.thirdPartyFormFilling = ''
    templateDeliveryOptions.emailDeliveryOption = ''
    templateDeliveryOptions.selectedEmails = ''
  }

  readDataset()
})
watch(() => templateGeneralInformation.datasetFileUrl, () => {
  readDataset()
})
</script>

<style scoped>
.p-stepper {
  flex-basis: 50rem;
}
</style>
