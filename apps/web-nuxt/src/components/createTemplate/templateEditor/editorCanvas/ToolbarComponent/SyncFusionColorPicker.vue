<template>
  <div class="border border-primary-500 rounded-lg flex items-center">
    <EjsColorpicker
      v-model="color"
      :show-recent-colors="true"
      mode="Palette"
      :columns="roundedPalettesColn"
      :preset-colors="roundedPaletteColors"
      :before-tile-render="beforeRoundedTileRender"
    />
  </div>
</template>

<script setup>
import { ColorPickerComponent as EjsColorpicker } from '@syncfusion/ej2-vue-inputs'
import { createElement } from '@syncfusion/ej2-base'

// import { enableRipple } from '@syncfusion/ej2-base'
const props = defineProps(['selectedColor'])

const emit = defineEmits(['setColor'])
// const biggerPalettesColn = ref(4)
const roundedPalettesColn = ref(5)
// enableRipple(true)
onMounted(() => {
  nextTick(() => {
    if (window.browserDetails.isDevice)
      document.getElementById('custom-control').classList.add('e-mobile-control')
  })
})

const color = ref('#000')
watch(color, (val) => {
  emit('setColor', val)
})
watch(() => props?.selectedColor, (val) => {
  if (val !== color)
    color.value = val
})

const roundedPaletteColors = ref ({ custom1: ['#ff6900', '#fcb900', '#7bdcb5', '#00d084', '#8ed1fc', '#0693e3', '#fff', '#eb144c', '#f78da7', '#9900ef'] })

function beforeRoundedTileRender(args) {
  args.element.classList.add('e-rounded-palette')
}
</script>

<style>
.col-lg-6.e-rounded-wrap {
    margin-top: 35px;
    width: 33%;
}

/* Scrollable palette customization */
#scroll-palette+.e-container .e-custom-palette.e-palette-group,
.e-bigger #scroll-palette+.e-container .e-custom-palette.e-palette-group {
    height: 125px;
}

#custom-control .e-container .e-palette .e-scroll-palette.e-selected::before {
    content: '\e933';
}
.tailwind #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before,
.tailwind-dark #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before {
    content: '\e856';
}
.bootstrap5 #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before,
.bootstrap5-dark #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before {
    content: '\e727';
}
.bootstrap4 #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before,
.bootstrap4-dark #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before {
    content: '\e718';
}
.bootstrap #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before,
.bootstrap-dark #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before,
.fabric #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before,
.fabric-dark #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before,
.highcontrast #custom-control .e-container .e-palette .e-scroll-palette.e-selected::before {
    content: '\e7ff';
}
.highcontrast #custom-control .e-container .e-palette {
    border-bottom-color: transparent;
}

/* Rounded corner palette customization */
.e-container .e-palette .e-rounded-palette {
    border-radius: 4px;
    margin: 5px;
    height: 30px;
    width: 30px;
}
.e-bigger .e-container .e-palette .e-rounded-palette {
    height: 36px;
    width: 36px;
}
 .e-container .e-palette .e-rounded-palette:hover,
 .e-container .e-palette .e-scroll-palette:hover {
    box-shadow: none;
}
 .e-container .e-palette .e-circle-palette.e-selected,
 .e-container .e-palette .e-rounded-palette.e-selected,
 .e-container .e-palette .e-square-palette.e-selected,
 .e-container .e-palette .e-scroll-palette.e-selected {
    outline: none;
}
</style>
