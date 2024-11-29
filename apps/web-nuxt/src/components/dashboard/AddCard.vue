<template>
  <div id="target">
    <ejs-dialog
      ref="cardDialog"
      :is-modal="true"
      width="60%"
      height="65%"
      content="content"
      target="#target"
      :show-close-icon="true"
      @close="onDialogClose"
    >
      <template #content>
        <Carousel @selected-card="onSelectedCard" />
      </template>
    </ejs-dialog>
  </div>
</template>

<script setup>
import Carousel from './Carousel.vue'

const emit = defineEmits(['dialogClose', 'selectedCard'])

const cardDialog = ref(null)

function onDialogClose() {
  emit('dialogClose')
}

function onSelectedCard(card) {
  emit('selectedCard', card)
}
</script>
