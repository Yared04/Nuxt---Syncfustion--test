<template>
  <div class="flex flex-col md:flex-row justify-between  space-y-2 md:space-y-0">
    <div class="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0">
      <div v-if="hasFilterActions" class="space-y-2 md:space-y-0">
        <Button
          type="button"
          :label="$t('Cp_dataTable_filter.form_to_doc')"
          class="px-4 flex rounded-lg shadow-none border-1 border-primaryBlue mr-2 hover:bg-primaryBlue hover:text-white"
          :class="[typefilter === 'Form to Doc' ? 'bg-primaryBlue border-primaryBlue text-white' : 'bg-white text-primaryBlue']"
          :outlined="typefilter !== 'Form to Doc'"
          raised
          @click="filterData('Form to Doc')"
          @mouseenter="formToDocActive = true"
          @mouseleave="typefilter !== 'Form to Doc' ? formToDocActive = false : formToDocActive = true"
        >
          <img :src="formToDocActive ? formToDocWhiteIcon : formToDoc" alt="Form to Doc" class="w-9 h-6 mr-2" /> <p>{{ $t('Cp_dataTable_filter.form_to_doc') }}</p>
        </Button>

        <Button
          type="button"
          :label="$t('Cp_dataTable_filter.data_to_doc')"
          class="px-4 rounded-lg shadow-none text-primaryPink border-1 border-primaryPink  hover:bg-primaryPink hover:border-primaryPink hover:text-white"
          :class="[typefilter === 'Data to Doc' ? 'bg-primaryPink  text-white' : 'bg-white text-primaryPink ']"
          :icon="dataToDoc"
          :outlined="typefilter !== 'Data to Doc'"
          raised
          @click="filterData('Data to Doc')"
          @mouseenter="dataToDocActive = true"
          @mouseleave="typefilter !== 'Data to Doc' ? dataToDocActive = false : dataToDocActive = true"
        >
          <img :src="dataToDocActive ? dataToDocWhiteIcon : dataToDoc" alt="Data to Doc" class="w-9 h-6 mr-2" /> <p>{{ $t('Cp_dataTable_filter.data_to_doc') }}</p>
        </Button>
      </div>
    </div>

    <div class="flex flex-col md:flex-row space-x-0 space-y-2 md:space-y-0 md:space-x-2">
      <Button
        v-tooltip.top="$t('Cp_dataTable_filter.clear_all_filters')"
        type="button"
        icon="pi pi-filter-slash"
        :label="$t('Cp_dataTable_filter.clear_filters')"
        outlined
        raised
        class="p-7 shadow-none rounded-lg w-max md:w-max raised border-primaryBlue h-[45px]"
        @click="clearFilter"
      />
      <span class="relative flex">
        <i
          class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-700"
          style="color: rgb(117, 119, 120);"
        ></i>
        <InputText
          v-model="filters.global.value"
          :placeholder="$t('Cp_dataTable_filter.search')"
          class="pl-10 font-normal rounded-lg border-gray-300 h-[45px]"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dataToDoc from '../../assets/icons/data2doc_icon.svg'
import formToDocWhiteIcon from '../../assets/icons/formToDocWhiteIcon.svg'
import dataToDocWhiteIcon from '../../assets/icons/data2docwhite_icon.svg'
import formToDoc from '@/assets/icons/form2doc_icon.svg'

const props = defineProps(['hasFilterActions', 'filters', 'typefilter'])

const emit = defineEmits()

const formToDocActive = ref(false)

const dataToDocActive = ref(false)

const currentFilter = ref('')

function filterData(type) {
  formToDocActive.value = type === 'Form to Doc'
  dataToDocActive.value = type === 'Data to Doc'

  if (currentFilter.value !== '')
    type = ''

  emit('filterData', type)

  currentFilter.value = type
}

function clearFilter() {
  emit('clearFilter')
}
</script>
