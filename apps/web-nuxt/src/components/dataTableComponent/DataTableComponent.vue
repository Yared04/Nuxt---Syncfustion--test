<template>
  <div class="box overflow-hidden z-1 px-3 py-5 table-container">
    <DataTableHeader :title="props.title" :info="props.info" :export-file="props.exportFile" @export-c-s-v="exportCSVHandler" />

    <div class="">
      <DataTable
        ref="dataTableRef"
        v-model:filters="filters"
        :value="filteredData"
        show-gridlines
        :paginator="filteredData.length > 0"
        responsive-layout="scroll"
        :rows="25"
        :row-hover="true"
        data-key="id"
        filter-display="menu"
        overlay-visible
        striped-rows
        csv-separator
        :global-filter-fields="['type', 'template_name', 'created_by', 'date']"
        paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        :current-page-report-template="`p. {first} / ${Math.ceil(filteredData.length / 25)}`"
        :rows-per-page-options="[25, 50, 100]"
        @update:filters="onFilterChange"
      >
        <template #header>
          <DataTableFilters
            :filters="filters"
            :has-filter-actions="props.hasFilterActions"
            :typefilter="typefilter"
            @filter-data="filterData"
            @clear-filter="clearFilter"
          />
        </template>

        <template #empty>
          <div class="flex justify-center text-center py-5">
            {{ $t('Cp_dataTable.no_data_found') }}
          </div>
        </template>
        <template #loading>
          {{ $t('Cp_dataTable.loading_data') }}
        </template>
        <Column
          v-for="column in props.columns"
          :key="column.field"
          :field="column.field"
          :header="column.header"
          :style="column.style"
          :filter-field="column.filterField"
          :show-filter-match-modes="column.showFilterMatchModes"
          :filter-menu-style="{ width: '14rem' }"
          :data-type="column.data_type"
        >
          <template #body="{ data }">
            <div v-if="column.header === 'Date'">
              {{ formatDateForInput(data[column.field], 'DD/MM/YYYY') }}   &nbsp;  {{ formatTimeForInput(data[column.field], 'HH:MM:SS XM') }}
            </div>
            <div v-else-if="column.header === 'Items'">
              <Dropdown v-model="selectedItem" :options="data[column.field]" option-label="name" placeholder="" class="w-full md:w-[14rem]" />
            </div>
            <div v-else class="flex">
              <i v-if="column.header === 'Created By'" class="pi pi-users text-primaryBlue font-bold mr-4 text-xl"></i>
              {{ data[column.field] }}
            </div>
          </template>
          <template v-if="column.header === 'Date'" #filter="{ filterModel }">
            <Calendar
              v-model="filterModel.value"
              date-format="dd/mm/yyyy"
              placeholder="dd/mm/yyyy"
              mask="99/99/9999"
            />
          </template>

          <template v-else-if="column.header !== 'Image'" #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              :placeholder="getPlaceholder(column.header)"
            />
          </template>
        </Column>

        <template v-if="props.hasActionsColumn">
          <Column header="Actions">
            <template #body="{ data }">
              <div class="flex space-x-2">
                <!-- <Button
                  rounded
                  text
                  :icon="props.icon1"
                  class="text-primaryBlue mr-2 text-xl rounded-xl"
                  @click="showDataInModal"
                /> -->
                <Button
                  rounded
                  :icon="props.icon2"
                  text
                  class="text-primaryBlue text-xl rounded-xl"
                  @click="downloadDataAsPdf(data)"
                />
              </div>
            </template>
          </Column>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import DataTableHeader from './DataTableHeader.vue'
import DataTableFilters from './DataTableFilters.vue'
import formatDate from '~/utils'
import { formatDateForInput, formatTimeForInput } from '@/utils/dateFunctions'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  hasActionsColumn: {
    type: Boolean,
    required: true,
  },
  hasFilterActions: {
    type: Boolean,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  info: {
    type: String,
    required: false,
  },
  icon1: {
    type: String,
    required: false,
  },
  icon2: {
    type: String,
    required: false,
  },
  exportFile: {
    type: Boolean,
    required: false,
  },
})
const emit = defineEmits()
const toast = useToast()
// for settings list page
const selectedItem = ref()

const filters = ref(props.filters)

const filteredData = ref(props.data)

const typefilter = ref('')

const dataTableRef = ref()

const op = ref(null)

function onFilterChange(updatedFilters) {
  emit('update:filters', updatedFilters)
}

function getPlaceholder(header) {
  return `Search by ${header}`
}

function exportCSVHandler() {
  if (dataTableRef.value)
    dataTableRef.value.exportCSV()
}

watch(() => props.data, () => {
  if (typefilter.value === '')
    filteredData.value = props.data
  else
    filteredData.value = props.data.filter(item => item.type === typefilter.value)
})
function filterData(type) {
  typefilter.value = type
  if (type === '')
    filteredData.value = props.data

  else
    filteredData.value = props.data.filter(item => item.type === type)
}

function showDataInModal() {
  emit('showModal', true)
}

function downloadDataAsPdf(data) {
  toast.add({ severity: 'error', summary: 'Info', detail: 'Remember to allow Multiple file downloads', life: 5000 })

  // emit('downloadPdf', true)
  data?.urls.forEach((url, index) => {
    fetch(url)
      .then(response => response.blob())
      .then((blob) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = `file_${index + 1}.pdf` // Adjust the file name as needed
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectUrl)
      })
      .catch((error) => {
        console.error(`Error downloading file ${index + 1}:`, error)
      })
  })
}

function clearFilter() {
  Object.keys(filters.value).forEach((key) => {
    filters.value[key] = ''
  })
}
</script>

<style scoped>
:deep(.p-datatable-header) {
  border-radius: 0.4rem 0.4rem 0 0 !important;
}

/* Bottom Left */
:deep(.p-datatable-table > tbody > tr:last-of-type > td:first-of-type) {
  border-radius: 0 0 0 0.5rem !important;
}

/* Bottom Right */
:deep(.p-datatable-table > tbody > tr:last-of-type > td:last-of-type) {
  border-radius: 0 0 0.5rem 0 !important;
}
</style>
