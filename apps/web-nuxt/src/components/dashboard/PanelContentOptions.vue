<template>
  <div class="m-auto pb-6 px-6 max-full h-full bg-slate-50  overflow-auto">
    <div class="max-w-72 flex flex-col justify-center mx-auto h-full">
      <label for="title" class="text-start mb-1">Card Title</label>
      <input id="title" v-model="localTitle" class="py-1 px-3 w-full mb-4 max-w-72 rounded-[4px] border" type="text" name="title" />
      <label for="dropdowntree" class="text-start mb-1">Select an element to display</label>
      <ejs-dropdowntree id="dropdowntree" :fields="fields" item-template="iTemplate" @select="onSelect">
        <template #iTemplate="{ data }">
          <!-- <e-tooltip v-if="disabledItems.includes(data.name)" :show-tip-pointer="false" :content="tooltipMessage" css-class="customTooltip" position="TopCenter">
            <span class="text-base opacity-30">{{ data.name }}</span>
          </e-tooltip> -->
          <span>{{ data.name }}</span>
        </template>
      </ejs-dropdowntree>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sizeX: { type: Number, required: true },
  sizeY: { type: Number, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  modelValue: { type: String },
})
const emit = defineEmits(['selectedContent', 'update:modelValue'])
// const tooltipMessage = 'This content is not available for this size'

const localTitle = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

function onSelect(arg) {
  emit('selectedContent', arg.itemData.text)
}

// const disabledItems = computed(() => {
//   const { sizeX, sizeY } = props
//   if (sizeX < 3 && sizeY < 2)
//     return ['Favourite Documents', 'Favourite 1', 'Favourite 2', 'Document Library']

//   if (sizeX < 4 && sizeY < 2)
//     return ['Favourite Documents', 'Favourite 1', 'Favourite 2']

//   return []
// })

// Data source for DropDownTree based on the category
let data = []
switch (props.category) {
  case 'KPI':
    data = [
      { id: 1, name: 'KPI 1', selected: props.content === 'KPI 1' },
      { id: 2, name: 'KPI 2', selected: props.content === 'KPI 2' },
    ]
    break
  case 'Favourites':
    data = [
      { id: 3, name: 'Favourite 1', selected: props.content === 'Favourite 1' },
      { id: 4, name: 'Favourite 2', selected: props.content === 'Favourite 2' },
    ]
    break
  case 'Document Library':
    data = [
      { id: 5, name: 'Document Library', selected: props.content === 'Document Library' },
    ]
    break
  default:
    data = []
}

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
