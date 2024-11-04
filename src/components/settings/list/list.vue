<template>
  <div class="w-full flex bg-white overflow-scroll no-scrollbar">
    <div class="rounded-md bg-white w-full">
      <div class="flex flex-col md:flex-row md:justify-between w-full">
        <!-- left side menu -->
        <LeftSideMenu
          :tableData="tableData"
          :filters="filters"
          :visible="visible"
          :findItemByPath="findItemByPath"
          @update:visible="visible = $event"
          @update:searchQuery="searchQuery = $event"
          @update:filteredLists="filteredLists = $event"
          @update:tableData="tableData = $event"
          @handleopensubmenu="handleopensubmenu"
          :handleEditItem="handleEditItem"
          :handleAddItems="handleAddItems"
          :handleDelete="handleDelete"
        />
      </div>
    </div>

    <!-- components -->
    <Toast />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { addNewListItem } from "~/services/newListData.js";
import LeftSideMenu from "~/components/settings/list/LeftSideMenu.vue";

const toast = useToast();
const visible = ref(false);
const openAddItems = ref(false);
const addItemsTitle = ref("");
const openListOptions = ref(false);
const openItemOptions = ref(false);
const openDeleteModal = ref(false);
const editableItem = ref();
const tableData = ref({});
const deleteItem = ref();
const openCreateSubList = ref(false);
const currentListLevel = ref();
const currentListTitle = ref();
const isSublistSimple = ref(true);
const sublistId = ref();
const sublistPath = ref();
const searchQuery = ref("");
const filteredLists = ref(addNewListItem.value);

const handleopensubmenu = (clickedItem) => {
  tableData.value = clickedItem;
};

onMounted(() => {
  // tableData.value = addNewListItem.value[0];
  const combinedLists = {
    id: 0,
    title: "All Lists",
    isHovered: false,
    opensubmenu: true,
    level: 0,
    isSublistSimple: true,
    path: "0",
    sublists: [],
  };

  addNewListItem.value.forEach((list) => {
    combinedLists.sublists.push(...list.sublists);
  });

  tableData.value = combinedLists;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  list_elements: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});

// this is emitted from editItemOptionModal
const createSubList = (data) => {
  openItemOptions.value = false;
  openCreateSubList.value = true;
  sublistId.value = data.id;
  currentListLevel.value = data.level;
  sublistPath.value = data.path; // Store the unique path
  currentListTitle.value = data.title;
};

const handleCreateSubSublist = (data) => {
  isSublistSimple.value = data.isSublistSimple;
  console.log("data.name", data.name);
  // Update tableData
  const tableDataList = findItemByPath(
    tableData.value,
    sublistPath.value,
    "tableEdit"
  );
  if (tableDataList) {
    const newSublistItems = data.sublistItems.map((item, index) => {
      if (isSublistSimple.value) {
        const newPath =
          tableDataList.sublists.length === 0
            ? `${tableDataList.path}-1`
            : `${tableDataList.path}-${
                tableDataList.sublists.length + index + 1
              }`;
        return { ...item, path: newPath };
      } else {
        return { ...item };
      }
    });

    if (!isSublistSimple.value) {
      tableDataList.sublists = newSublistItems;
      tableDataList.name = data.name;
    } else {
      if (tableDataList.isSublistSimple) {
        tableDataList.sublists = Array.isArray(tableDataList.sublists)
          ? tableDataList.sublists.concat(newSublistItems)
          : newSublistItems;
      } else {
        tableDataList.sublists = newSublistItems;
      }
    }
    tableDataList.isSublistSimple = data.isSublistSimple;
    openCreateSubList.value = false;
    console.log("tableDataList", tableDataList);
  }
};
const findItemByPath = (list, path, from) => {
  if (from === "tableEdit") {
    console.log("list is ", list, " path is ", path);
    if (list.path === path) {
      return list;
    }
    if (Array.isArray(list.sublists)) {
      for (const sublist of list.sublists) {
        const found = findItemByPath(sublist, path, from);
        if (found) {
          return found;
        }
      }
    }
    return null;
  } else if (from === "treeView") {
    for (const item of list) {
      if (item.path === path) {
        return item;
      }
      if (Array.isArray(item.sublists) && item.sublists.length > 0) {
        const found = findItemByPath(item.sublists, path, from);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
};

const handleEditItem = (data) => {
  console.log("list", data);
  editableItem.value = data;
  openItemOptions.value = true;

  // Update addNewListItem
  const itemToEditInAddNewListItem = findItemByPath(
    tableData.value,
    data.path,
    "tableEdit"
  );
  if (itemToEditInAddNewListItem) {
    itemToEditInAddNewListItem.title = data.title;
  }

  // Update tableData
  const itemToEditInTableData = findItemByPath(
    tableData.value,
    data.path,
    "tableEdit"
  );
  if (itemToEditInTableData) {
    itemToEditInTableData.title = data.title;
  }

  // Force reactivity update
  tableData.value = { ...tableData.value };
};

const handleOpenAddItems = (title) => {
  addItemsTitle.value = title;
  openAddItems.value = true;
};

const handleCreateList = (data) => {
  // data is new list created from createListModal
  const { listName, listItems } = data;
  const newSubitems = [];

  listItems.map((listitem, index) => {
    const newsubitem = {
      id: index + 1,
      title: listitem.name,
      isHovered: false,
      opensubmenu: false,
      sublists: [],
    };
    newSubitems.push(newsubitem);
  });

  const newList = {
    id: addNewListItem.value.length + 1,
    title: listName,
    isHovered: false,
    opensubmenu: true,
    level: 0,
    sublists: newSubitems,
  };

  addNewListItem.value.push(newList);
};

const handleAddItems = (data) => {
  const lastid = addNewListItem.value.length;
  data.map((item, index) => {
    const newItem = {
      id: lastid + index + 1,
      title: item.name,
      isHovered: false,
      level: tableData.value.level + 1,
      sublists: [],
    };

    tableData.value.sublists.push(newItem);
  });
};

const handleOpenDelete = (data) => {
  deleteItem.value = data;
  openDeleteModal.value = true;
};

const handleDelete = (itemId) => {
  tableData.value.sublists = tableData.value.sublists.filter(
    (item) => item.id !== itemId
  );
  // openDeleteModal.value = false;
};

const onRowReorder = (event) => {
  tableData.value.sublists = event.value;
};

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Success Message",
    detail: "List successfully created.",
    life: 3000,
  });
};
</script>

<style scoped>
.highlight {
  background-color: yellow;
  color: black;
}

::v-deep .e-list-text {
  color: black; /* Default color for all text */
}

::v-deep .clickable .e-list-text {
  cursor: pointer;
}

/* ::v-deep .e-active .e-list-text {
  color: #009EE2 !important; 
} */

::v-deep .non-clickable .e-list-text {
  pointer-events: none;
  color: gray; /* Change the text color of non-clickable nodes to gray */
  cursor: not-allowed; /* Change the cursor to not-allowed for non-clickable nodes */
}
</style>
