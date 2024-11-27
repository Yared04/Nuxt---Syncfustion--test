<template>
  <div class="flex flex-wrap gap-4 justify-center items-center p-6 w-full h-full bg-slate-50  overflow-auto">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="cursor-pointer"
    >
      <e-tooltip v-if="disabledItems.includes(item)" :show-tip-pointer="false" :content="tooltipMessage" css-class="customTooltip" position="TopCenter">
        <Button
          disabled
          class="w-fit px-4 bg-white !text-black"
        >
          <span class="!text-inherit">{{ item }}</span>
        </Button>
      </e-tooltip>
      <Button
        v-else
        class="w-fit px-4 bg-white !text-black hover:!text-white hover:bg-primaryBlue"
        @click="() => selectItem(item)"
      >
        <span class="!text-inherit hover:text-white">{{ item }}</span>
      </Button>
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
function selectItem(item) {
  emit('selectedContent', item)
}
const items = ['KPICards', 'Document Library', 'Favourite Documents']
const disabledItems = computed(() => {
  const { sizeX, sizeY } = props
  if (sizeX < 3 && sizeY < 2) {
    // Stricter condition comes first
    return ['Favourite Documents', 'Document Library']
  }
  if (sizeX < 4 && sizeY < 2)
    return ['Favourite Documents']

  return []
})
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
    font-size: 10px;
    line-height: 20px;
}
  </style>
