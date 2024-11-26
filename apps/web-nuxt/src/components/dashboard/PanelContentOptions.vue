<template>
  <div class="flex justify-center items-center w-full h-full bg-slate-50 z-[10001]">
    <div class="flex space-x-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-primaryBlue hover:text-white"
        @click="() => selectItem(item)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sizeX: { type: Number, required: true },
  sizeY: { type: Number, required: true },
})
const emit = defineEmits(['selectedContent'])

function selectItem(item) {
  emit('selectedContent', item)
}

const items = computed(() => {
  const { sizeX, sizeY } = props
  if (sizeX <= 2 && sizeY < 2)
    return ['KPICards']
  else if (sizeX <= 4 && sizeY <= 2)
    return ['KPICards', 'Document Library', 'Favourite Documents']

  return []
})
</script>

  <style scoped>
  /* Your styles here */
  </style>
