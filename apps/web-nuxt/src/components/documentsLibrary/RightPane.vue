<template>
  <section class="px-4">
    <Title title="Metadata" />
    <div v-if="selectedFile" class="">
      <div class="flex items-center mb-4 space-x-4">
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-12 h-12 bg-cover"
          :class="selectedFile.isDirectory ? 'e-fe-folder' : 'e-fe-pdf'"
        ></div>

        <!-- Text -->
        <div class="min-w-0">
          <h2 class="text-lg font-medium truncate">
            {{ selectedFile.name || '-' }}
          </h2>
          <p class="text-sm font-light">
            {{ selectedFile.isDirectory ? 'Folder' : 'File' }}
          </p>
        </div>
      </div>
      <div class="space-y-3">
        <!-- Name -->
        <div class="flex gap-4">
          <p class="text-gray-500 w-1/4 truncate">
            Name
          </p>
          <p class="truncate flex-1">
            {{ selectedFile.name || '-' }}
          </p>
        </div>

        <!-- Type -->
        <div class="flex gap-4">
          <p class="text-gray-500 w-1/4 truncate">
            Type
          </p>
          <p class="truncate flex-1">
            {{ selectedFile.isDirectory ? 'Folder' : 'File' }}
          </p>
        </div>

        <!-- Date Created -->
        <div class="flex gap-4">
          <p class="text-gray-500 w-1/4 truncate">
            Date Created
          </p>
          <p class="truncate flex-1">
            {{ selectedFile.dateCreated || '-' }}
          </p>
        </div>

        <!-- Date Modified -->
        <div class="flex gap-4">
          <p class="text-gray-500 w-1/4 truncate">
            Date Modified
          </p>
          <p class="truncate flex-1">
            {{ selectedFile.dateModified || '-' }}
          </p>
        </div>

        <!-- Size -->
        <div class="flex gap-4">
          <p class="text-gray-500 w-1/4 truncate">
            Size
          </p>
          <p class="truncate flex-1">
            {{ selectedFile.size || '-' }}
          </p>
        </div>

        <!-- Underline Separator -->
        <hr class="border-gray-300 my-4" />

        <!-- Additional Details Section -->
        <!-- ID -->
        <div class="flex gap-4">
          <p class="text-gray-500 w-1/4 truncate">
            ID
          </p>
          <p class="truncate flex-1">
            {{ selectedFile.id || '-' }}
          </p>
        </div>
        <div v-if="selectedFile.isDirectory">
          <div class="flex gap-4">
            <p class="text-gray-500 w-1/4 truncate">
              Content
            </p>
            <p class="truncate flex-1">
              <!-- list the children here -->
              <ul>
                <li v-for="child in selectedFile.children" :key="child.id" class="flex gap-2 justify-start">
                  <div
                    class="flex-shrink-0 w-5 h-5 bg-cover"
                    :class="child.isDirectory ? 'e-fe-folder' : 'e-fe-pdf'"
                  ></div>
                  <p class="self-center">
                    {{ child.name }}
                  </p>
                </li>
              </ul>
            </p>
          </div>
        </div>
        <!-- <div v-else class="flex gap-4">
          <button
            v-if="selectedFile.download_url"
            class="text-blue-500 underline truncate bg-transparent border-none cursor-pointer"
            @click="selectedFile.download_url"
          >
            Download
          </button>
        </div> -->
      </div>
    </div>

    <p v-else class="text-center">
      No document selected
    </p>
  </section>
</template>

<script setup>
import { inject } from 'vue'
import Title from './Title.vue'

const selectedFile = inject('selectedFile')
</script>

<style scoped>
:deep(.e-fe-pdf) {
    background-image: url('data:image/svg+xml,%3Csvg width="auto" height="auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cg clip-path="url(%23clip0)"%3E%3Cg filter="url(%23filter0_i)"%3E%3Cpath d="M9 40H31C33.2091 40 35 38.2091 35 36V10L25 0H9C6.79086 0 5 1.79086 5 4V36C5 38.2091 6.79086 40 9 40Z" fill="%23FF8484"/%3E%3C/g%3E%3Cg filter="url(%23filter1_d)"%3E%3Cpath d="M27 10H35L25 0V8C25 9.10457 25.8954 10 27 10Z" fill="white" fill-opacity="0.5"/%3E%3C/g%3E%3Cpath d="M8.75 28.75V23.75M8.75 23.75V18.75H11.75C12.8546 18.75 13.75 19.6454 13.75 20.75V21.75C13.75 22.8546 12.8546 23.75 11.75 23.75H8.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M26.25 28.75V23.75V18.75H32.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M26.25 23.75H31.25" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M20.5 18.75H17.5V28.75H20.5C21.6046 28.75 22.5 27.8546 22.5 26.75V20.75C22.5 19.6454 21.6046 18.75 20.5 18.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id="filter0_i" x="5" y="0" width="30" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/%3E%3CfeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation="2"/%3E%3CfeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/%3E%3CfeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/%3E%3CfeBlend mode="normal" in2="shape" result="effect1_innerShadow"/%3E%3C/filter%3E%3Cfilter id="filter1_d" x="23" y="-1" width="14" height="14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/%3E%3CfeOffset dy="1"/%3E%3CfeGaussianBlur stdDeviation="1"/%3E%3CfeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/%3E%3CfeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/%3E%3CfeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/%3E%3C/filter%3E%3CclipPath id="clip0"%3E%3Crect width="40" height="40" fill="white"/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A');
}
:deep(.e-fe-folder) {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Cpath fill="%236b7280" d="M64 464h384c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48H301.3c-12.7 0-24.9-5.1-33.9-14.1L231.4 62.1c-9-9-21.2-14.1-33.9-14.1H64C37.5 48 16 69.5 16 96v320c0 26.5 21.5 48 48 48zm384 16H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32h133.5c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64z" /%3E%3C/svg%3E');
}
</style>
