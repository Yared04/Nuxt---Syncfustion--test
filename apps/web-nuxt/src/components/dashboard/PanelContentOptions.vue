<template>
  <div class="m-auto p-6 max-full h-full bg-slate-50  overflow-auto">
    <div class="max-w-md flex items-center mx-auto h-full">
      <ejs-dropdowntree id="dropdowntree" :fields="fields" item-template="iTemplate" placeholder="Select an element to display" @select="onSelect">
        <template #iTemplate="{ data }">
          <e-tooltip v-if="disabledItems.includes(data.name)" :show-tip-pointer="false" :content="tooltipMessage" css-class="customTooltip" position="TopCenter">
            <span class="text-base opacity-30">{{ data.name }}</span>
          </e-tooltip>
          <span v-else>{{ data.name }}</span>
        </template>
      </ejs-dropdowntree>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sizeX: { type: Number, required: true },
  sizeY: { type: Number, required: true },
})
const emit = defineEmits(['selectedContent'])
const tooltipMessage = 'This content is not available for this size'

function onSelect(arg) {
  emit('selectedContent', arg.itemData.text)
}

const disabledItems = computed(() => {
  const { sizeX, sizeY } = props
  if (sizeX < 3 && sizeY < 2)
    return ['Favourite Documents', 'Favourite 1', 'Favourite 2', 'Document Library']

  if (sizeX < 4 && sizeY < 2)
    return ['Favourite Documents', 'Favourite 1', 'Favourite 2']

  return []
})

const data = [
  { id: 1, name: 'KPIs', hasChild: true, selectable: false },
  { id: 2, pid: 1, name: 'KPI 1', selectable: !disabledItems.value.includes('KPI 1') },
  { id: 3, pid: 1, name: 'KPI 2', selectable: !disabledItems.value.includes('KPI 1') },
  { id: 4, name: 'Favourite Documents', hasChild: true, selectable: false },
  { id: 6, pid: 4, name: 'Favourite 1', selectable: !disabledItems.value.includes('Favourite Documents') },
  { id: 7, pid: 4, name: 'Favourite 2', selectable: !disabledItems.value.includes('Favourite Documents') },
  { id: 8, name: 'Document Library', selectable: !disabledItems.value.includes('Document Library') },
]

const fields = { dataSource: data, value: 'id', text: 'name', parentValue: 'pid', hasChildren: 'hasChild' }
</script>

  <style>
.e-tooltip-wrap.e-popup {
    background-color: #fff;
    border: 1px solid #e5e7eb;
}

.e-tooltip-wrap .e-arrow-tip-inner.e-tip-right,
.e-tooltip-wrap .e-arrow-tip-inner.e-tip-left,
.e-tooltip-wrap .e-arrow-tip-inner.e-tip-bottom,
.e-tooltip-wrap .e-arrow-tip-inner.e-tip-top {
    color: #fff;
    font-size: 25.9px;
}
.e-tooltip-wrap .e-tip-content {
    color: black;
    font-size: 12px;
    line-height: 20px;
    padding: 8px;
}
  </style>

<style scoped>

</style>
