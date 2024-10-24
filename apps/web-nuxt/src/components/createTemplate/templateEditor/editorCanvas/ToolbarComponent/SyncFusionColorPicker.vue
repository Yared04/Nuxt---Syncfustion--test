<template>
  <EjsColorpicker
    v-model="color"
  />
  <!-- :preset-colors="customColors" -->
</template>

<script setup>
import { ColorPickerComponent as EjsColorpicker } from '@syncfusion/ej2-vue-inputs'
import { enableRipple } from '@syncfusion/ej2-base'

const emit = defineEmits(['setColor'])

enableRipple(true)

const color = ref('#000')
watch(color, (val) => {
  console.log('cahneg  in color val', val)
  emit('setColor', val)
})

// const customColors = {
//   custom1: ['#ef9a9a', '#e57373', '#ef5350', '#f44336', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#b39ddb', '#9575cd', '#7e57c2', '#673AB7'],
//   custom2: ['#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4'],
//   custom3: ['#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39'],
// }
</script>

<style>

</style>
