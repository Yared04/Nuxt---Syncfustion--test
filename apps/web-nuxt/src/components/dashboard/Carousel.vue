<template>
  <div class="control-container">
    <ejs-carousel :partial-visible="true">
      <e-carouselitems>
        <e-carouselitem template="kpis" />
        <template #kpis>
          <div class="shadow-lg m-10 p-10 flex flex-col gap-6">
            <CarouselCard title="KPIs Preview" />
            <button
              class="border-primaryBlue rounded-lg w-fit mx-auto text-primaryBlue px-4 py-2 hover:bg-primaryBlue hover:text-white border"
              @click="emit('selectedCard', 'KPI')"
            >
              Add Card
            </button>
            <p class="text-center">
              {{ KPIDescription }}
            </p>
          </div>
        </template>
        <e-carouselitem template="favourites" />
        <template #favourites>
          <div class="shadow-lg m-10 p-10 flex flex-col gap-6">
            <CarouselCard title="Favourites" />
            <button
              class="border-primaryBlue rounded-lg w-fit mx-auto text-primaryBlue px-4 py-2 hover:bg-primaryBlue hover:text-white border"
              @click="emit('selectedCard', 'Favourites')"
            >
              Add Card
            </button>
            <p class="text-center">
              {{ FavouritesDescription }}
            </p>
          </div>
        </template>
        <e-carouselitem template="document-library" />
        <template #document-library>
          <div class="shadow-lg m-10 p-10 flex flex-col gap-6">
            <CarouselCard title="Document Library" />
            <button
              class="border-primaryBlue rounded-lg w-fit mx-auto text-primaryBlue px-4 py-2 hover:bg-primaryBlue hover:text-white border"
              @click="emit('selectedCard', 'Document Library')"
            >
              Add Card
            </button>
            <p class="text-center">
              {{ DocumentLibraryDescription }}
            </p>
          </div>
        </template>
      </e-carouselitems>
    </ejs-carousel>
  </div>
</template>

<script setup>
import CarouselCard from './CarouselCard.vue'

const emit = defineEmits(['selectedCard'])

const KPIDescription = 'Key Performance Indicators Description'
const FavouritesDescription = 'Favourite Documents Description'
const DocumentLibraryDescription = 'Document Library Description'
</script>

<style>
.control-container {
margin: 0 auto 1em;
max-width: 800px;
}
.e-carousel .e-carousel-navigators .e-next, .e-carousel .e-carousel-navigators .e-previous {
background-color: #009ee2;
border-radius: 100%;
padding: 0;
}
</style>
