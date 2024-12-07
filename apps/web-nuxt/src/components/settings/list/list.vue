<template>
  <div>
    <div class="">
      <p class="font-medium text-surface-600 font-poppins text-xl mt-5">
        List
      </p>
      <div class="flex">
        <!-- left side menu -->
        <div class="flex flex-col justify-between h-full overflow-y-scroll w-64 pt-5 no-scrollbar">
          <div class="flex ml-1">
            <Button
              icon="pi pi-plus"
              label="Create new list"
              outlined
              class="text-success border-success hover:bg-green-50 hover:border-success w-48"
              severity="success"
              @click="visible = true"
            />
          </div>

          <div v-if="addNewListItem?.length > 0" class="mt-4">
            <span class="relative flex h-10 ml-1">
              <i
                class="pi pi-search absolute top-2/4 -mt-2  left-2 text-surface-400 dark:text-surface-600 text-sm"
                style="color: rgb(117, 119, 120);"
              ></i>
              <InputText
                v-model="searchQuery" placeholder="Search"
                class="pl-7 font-normal rounded-md border-gray-300 font-poppins w-48"
              />
            </span>
          </div>

          <ul v-if="addNewListItem?.length > 0">
            <li
              v-for="items in filteredLists" :key="items.title"
              class="cursor-pointer flex flex-col mt-4 w-full mr-4"
            >
              <div
                :key="items.title"
                class="flex px-2 py-2 ml-1 hover:bg-surface-100 rounded font-poppins"
                @click="handleopensubmenu(items)"
              >
                <i
                  class="pt-1 text-gray-500"
                  :class="{ 'pi pi-chevron-down': items?.opensubmenu, 'text-primaryBlue': items?.title === tableData?.title, 'pi pi-chevron-right': !items?.opensubmenu }"
                  @click="items.opensubmenu = !items.opensubmenu"
                ></i>
                <span
                  class="text-lg font-normal ml-3 "
                  :class="{ 'text-surface-600': items?.isHovered, 'text-primaryBlue': items?.title === tableData?.title, 'text-gray-500': !items?.isHovered }"
                  v-html="highlight(items?.title) || items?.title"
                ></span>
              </div>

              <ul v-if="items.opensubmenu" class="ml-3">
                <li v-for="subItem in items.sublists" :key="subItem.id">
                  <div
                    v-if="subItem?.sublists && subItem.sublists.length > 0" :key="subItem.id"
                    class="flex py-2 pl-1 hover:bg-surface-100 items-center ml-4 font-poppins"
                    @click="handleopensubmenu(subItem)"
                  >
                    <i
                      class="text-gray-500"
                      :class="{ 'pi pi-chevron-down': subItem.opensubmenu, 'text-primaryBlue': subItem.title === tableData.title, 'pi pi-chevron-right': !subItem.opensubmenu }"
                      @click="subItem.opensubmenu = !subItem.opensubmenu"
                    ></i>

                    <p
                      class="text-base font-normal ml-3 text-gray-500"
                      :class="{ 'text-primaryBlue': subItem.title === tableData.title }"
                      v-html="highlight(subItem.title) || subItem.title"
                    >
                    </p>
                  </div>

                  <ul v-if="subItem.opensubmenu" class="ml-3">
                    <li v-for="subsubItem in subItem.sublists" :key="subsubItem.title">
                      <div
                        v-if="subsubItem?.sublists && subsubItem.sublists.length > 0" :key="subsubItem.title"
                        class="ml-5 font-poppins flex py-2 pl-1 hover:bg-surface-100 items-center"
                        @click="handleopensubmenu(subsubItem)"
                      >
                        <i
                          class=" text-gray-500"
                          :class="{ 'pi pi-chevron-down': subsubItem.opensubmenu, 'text-primaryBlue': subsubItem.title === tableData.title, 'pi pi-chevron-right': !subsubItem.opensubmenu }"
                          @click="subsubItem.opensubmenu = !subsubItem.opensubmenu"
                        ></i>
                        <p
                          class="text-base font-normal ml-4 text-gray-500"
                          :class="{ 'text-primaryBlue': subsubItem.title === tableData.title }"
                          v-html="highlight(subsubItem.title) || subsubItem.title"
                        >
                        </p>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- right section -->
        <div class="w-full py-5">
          <div class="flex flex-col md:flex-row justify-end gap-2">
            <Button
              disabled
              icon="pi pi-plus" label="Add item(s)" outlined severity="success" class="text-success border-success hover:bg-green-50"
              @click="openAddItems = true"
            />
            <Button
              disabled
              icon="pi pi-cog" label="List options" class="p-button-success" outlined
              @click="openListOptions = true"
            />
          </div>

          <!-- table -->
          <div class="mt-4 mb-12 ml-2 ">
            <DataTableComponent
              :table-data="tableData ? tableData : {}" :filters="filters" :from-template-editor="props?.fromTemplateEditor ? true : false"
              @row-reorder="onRowReorder" @edit-item="handleEditItem" @open-delete="handleOpenDelete"
            />
            <Toast />
          </div>
        </div>
      </div>
      <Button v-if="props?.fromTemplateEditor" label="Save & Close" class="ml-[50%] translate-x-[-50%]" @click="() => emit('closeTemplateEditorPopup')" />
    </div>

    <!-- components -->
    <Toast />
    <CreateListModal
      v-if="visible" v-model:visible="visible" @create-list="handleCreateList"
      @cancel="visible = false" @error="showError" @success="showSuccess"
    />

    <CreateSublistModal
      v-if="openCreateSubList" v-model:visible="openCreateSubList" :level="currentListLevel"
      @create-sub-sub-list="handleCreateSubSublist" @cancel="openCreateSubList = false"
    />

    <AddItemsModal v-model:visible="openAddItems" @add-items="handleAddItems" @cancel="openAddItems = false" />

    <ListOptionModal
      v-if="openListOptions" v-model:visible="openListOptions" v-model:tableData="tableData"
      @cancel="openListOptions = false" @delete-list="handleDeleteList"
    />

    <EditItemOptionModal
      v-if="editableItem" v-model:visible="openItemOptions" v-model:editableItem="editableItem"
      v-model:containsublist="containsublist" @edit-item="handleEditItem" @cancel="openItemOptions = false"
      @open-create-list-modal="createSubList"
    />

    <!-- delete -->
    <Dialog v-model:visible="openDeleteModal" header="Delete" modal :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-5"><i class="pi pi-exclamation-triangle text-error mr-2"></i>
        Are you sure you want to delete this Item?
      </span>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" outlined @click="openDeleteModal = false" />
        <Button
          type="button" label="Delete" severity="error" class="bg-error hover:bg-red-500 hover:border-error text-white"
          @click="handleDelete"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import DataTableComponent from '~/components/settings/list/Table.vue'
import CreateListModal from '~/components/settings/list/CreateListModal.vue'
import AddItemsModal from '~/components/settings/list/AddItemsModal.vue'
import EditItemOptionModal from '~/components/settings/list/EditItemOptionModal.vue'
import ListOptionModal from '~/components/settings/list/ListOptionModal.vue'
import CreateSublistModal from '~/components/settings/list/CreateSublistModal.vue'

// import { addNewListItem } from '~/services/newListData.js'
// import { accountData } from '@/composables/useAccountData'
import { useAuth } from '@/composables/useAuth'
import canvasService from '@/composables/useTemplateCanvas'

const props = defineProps(['fromTemplateEditor', 'selectedListForTemplateEditor'])

const emit = defineEmits(['closeTemplateEditorPopup', 'handleSelectList'])

const { token, setToken, fetchUserDetails, user, setUser } = useAuth()

const addNewListItem = ref()
const runtimeConfig = useRuntimeConfig()
const copiedList = ref()

const toast = useToast()
const confirm = useConfirm()
const visible = ref(false)
const openAddItems = ref(false)
const openListOptions = ref(false)
const openItemOptions = ref(false)
const openDeleteModal = ref(false)
const editableItem = ref()
const tableData = ref({})
const deleteItem = ref()
const openCreateSubList = ref(false)
const currentListLevel = ref()
const containsublist = ref(false)

// sublist id
const sublistId = ref()
const searchQuery = ref('')
const filteredLists = ref(addNewListItem.value)
watch(() => props.fromTemplateEditor, (val) => {
  console.log('value', val)
  if (val)
    tableData.value = {}
})
const filteredList = computed(() => {
  const filterItems = (items, fn) => {
    return items.reduce((r, o) => {
      const sublists = filterItems(o.sublists || [], fn)
      if (fn(o) || sublists.length)
        r.push(Object.assign({}, o, sublists.length && { sublists }))
      return r
    }, [])
  }

  if (!searchQuery.value)
    return copiedList.value
  return filterItems(addNewListItem.value, (item) => {
    return item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

watch(searchQuery, (newValue, oldValue) => {
  if (newValue === '')
    filteredLists.value = addNewListItem.value
  else
    filteredLists.value = filteredList.value
})

function highlight(data) {
  if (searchQuery.value) {
    const pattern = new RegExp(searchQuery.value, 'i')
    const highlightedData = data.replace(
      pattern,
            `<span class="bg-primary-100 capitalize">${searchQuery.value}</span>`,
    )
    return highlightedData
  }
}

function handleopensubmenu(clickedItem) {
  clickedItem.opensubmenu = !clickedItem.opensubmenu
  tableData.value = clickedItem
}

onMounted(async () => {
  /** */
  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/lists/${user?.value?.email}`)
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    const data = await response.json()

    const arrayToUse = data?.map((d) => {
      return { ...d?.list_data, id: d?.id }
    })

    addNewListItem.value = arrayToUse
    copiedList.value = JSON.parse(JSON.stringify(arrayToUse))
    filteredLists.value = arrayToUse
    // toast.add({ severity: 'success', summary: 'Info', detail: 'Template updated successfully', life: 1000 })
  }
  catch (error) {
    console.error('Error:', error)
    toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to update the template', life: 5000 })
  }
  /** */
  console.log('props', props)
  if (!props?.fromTemplateEditor)
    tableData.value = addNewListItem.value[0]
  else
    tableData.value = props?.selectedListForTemplateEditor ? props?.selectedListForTemplateEditor : {}
})
watch(addNewListItem, (val) => {
  console.log('all lists', val)
  if (!tableData.value)
    tableData.value = val[0]
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  list_elements: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
},
)

// this is emitted from editItemOptionModal
function createSubList(data) {
  openItemOptions.value = false
  openCreateSubList.value = true
  sublistId.value = data.id
  currentListLevel.value = data.level
}

// this is emitted from createSublistModal
function handleCreateSubSublist(data) {
  tableData.value.sublists.map((list) => {
    if (list.id === sublistId.value)
      list.sublists = data.sublistItems
  })
}
function handleDeleteList(id) {
  console.log('list id to delete', id)
}

async function handleCreateList(data) {
  // data is new list created from createListModal
  const { listName, listItems } = data
  const newSubitems = []

  listItems.map((listitem, index) => {
    const newsubitem = {
      id: index + 1,
      title: listitem.name,
      isHovered: false,
      opensubmenu: false,
      sublists: [],
      parentId: addNewListItem.value.length + 1,
      level: 1,
    }
    newSubitems.push(newsubitem)
  })

  const newList = {
    id: addNewListItem.value.length + 1,
    title: listName,
    isHovered: false,
    opensubmenu: true,
    level: 0,
    sublists: newSubitems,
  }
  addNewListItem.value.push(newList)
  /** **** saving list */
  const objToSend = {
    list_data: JSON.stringify(newList),
    account_type: user?.value?.email,
  }
  try {
    const response = await fetch(`${runtimeConfig.public.BASE_URL}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(objToSend), // Serialize the object to JSON string
    })
    if (!response.ok)
      throw new Error(`Network response was not ok ${response.statusText}`)

    const data = await response.json()
    console.log('response data', data)
    tableData.value = data[0]?.list_data
    // toast.add({ severity: 'success', summary: 'Info', detail: 'Template updated successfully', life: 1000 })
  }
  catch (error) {
    console.error('Error:', error)
    // toast.add({ severity: 'error', summary: 'Info', detail: 'Unable to update the template', life: 5000 })
  }

  /** */

  // addNewListItem.value.push(newList)
}

function handleAddItems(data) {
  const lastid = addNewListItem.value.length
  console.log('data', data)
  console.log('table data value at handle add items', tableData?.value)
  data.map((item, index) => {
    const newItem = {
      id: lastid + index + 1,
      title: item.name,
      isHovered: false,
      parentId: tableData.value?.id,
      level: tableData.value.level + 1,
      sublists: [],
    }

    tableData.value.sublists.push(newItem)
  })
}
watch(tableData, (val) => {
  if (val?.id)
    emit('handleSelectList', val)
})
function handleEditItem(data) {
  console.log('running handle edit item lits data', data)
  editableItem.value = data
  openItemOptions.value = true

  tableData.value.sublists.map((sublist) => {
    console.log('sublist', sublist)
    if (sublist.id === data.id) {
      sublist.title = data.title
      sublist.sublists = data.sublists
    }
  })
  console.log('table data value after edit', tableData.value)
}
watch(tableData, (val) => {
  console.log('table data', val)
})

function handleOpenDelete(data) {
  deleteItem.value = data
  openDeleteModal.value = true
}

function handleDelete() {
  tableData.value.sublists = tableData.value.sublists.filter(item => item.id !== deleteItem.value.id)
  openDeleteModal.value = false
}

function onRowReorder(event) {
  tableData.value.sublists = event.value
}

function showSuccess() {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'List successfully created.', life: 3000 })
}

watch(openItemOptions, (newValue, oldValue) => {
  if (openItemOptions.value === false) {
    containsublist.value = false
    editableItem.value = null
  }
})
</script>

<style scoped>
.highlight {
    background-color: yellow;
    color: black;
}
</style>
