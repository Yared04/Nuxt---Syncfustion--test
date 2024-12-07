<template>
  <!-- side bar component -->
  <div class="z-40 bg-white mb-0 h-full border-r border-surface-100 overflow-x-hidden" :class="{ 'w-20': isCollapsed, 'w-72': !isCollapsed }">
    <div class="z-50 fixed mt-12" :class="{ 'w-20': isCollapsed, 'xs:w-44 sm:w-48 md:w-56 lg:w-60 sm:ml-6 md:ml-2 ': !isCollapsed }">
      <button
        v-if="baseRoute !== '/templates/create' && baseRoute !== '/templates/update'"
        class="absolute justify-center items-center z-10 top-18 mt-4 -right-4 rounded-full w-10 h-10 text-center bg-gray-50  shadow-sm hover:bg-primaryBlue hover:text-white flex"
        @click="toggleCollapse"
        @mouseenter="hoverEffect(true)"
        @mouseleave="hoverEffect(false)"
      >
        <img
          :src="isCollapsed
            ? (isMinimizebtnHovered ? ArrowRightWhite : ArrowRight) : (isMinimizebtnHovered ? ArrowLeftWhite : ArrowLeft)"
          class="w-4 h-auto text-white hover:text-white"
        />
      </button>
    </div>

    <div
      class="flex flex-col justify-between overflow-y-scroll overflow-x-hidden no-scrollbar h-full py-5"
      :class="{ 'w-18 justify-center ': isCollapsed, 'w-64': !isCollapsed }"
    >
      <ul class="mt-0">
        <!-- Logo -->
        <div class="mb-7 flex pl-3">
          <NuxtLink to="/">
            <div class="flex">
              <img src="../../assets/icons/LogoMark.svg" class="w-12 h-auto pl-1" />
              <img v-if="!isCollapsed" src="../../assets/icons/logotext.svg" class="w-36 ml-2 pl-1 h-auto" />
            </div>
          </NuxtLink>
        </div>

        <!-- menu Items -->
        <li
          v-for="item in menuItems"
          :key="item.title"
          v-tooltip.right="isCollapsed ? $t(`Cp_sidebar.${item.title.toLowerCase().replace(' ', '_')}`) : ''"
          :class="{ 'border-l text-primaryBlue border-primaryBlue ': baseRoute === item.route || isSettingsRoute && item.route.startsWith('/settings') }"
        >
          <div
            v-if="item.title != 'Settings'" :key="item.title"
            class="hover:bg-primaryBlue hover:text-white flex text-center items-center my-1 py-1 px-5 font-poppins"
            @click="navigate(item.route)" @mouseenter="setIsHovered(item, true)"
            @mouseleave="setIsHovered(item, false)"
          >
            <i
              style="font-size: 1.2rem" class="py-3 ml-1" :class="[
                item.icon,
                {
                  'text-white': item.isHovered,
                  'text-primaryBlue': baseRoute === item.route || isSettingsRoute && item.route.startsWith('/settings'),
                  'text-gray-500': !item.isHovered,
                }]"
            >
            </i>

            <span
              v-if="!isCollapsed" class="text-lg font-normal text-gray-500 ml-6" :class="{
                'text-white': item.isHovered,
                'text-primaryBlue ': baseRoute === item.route || isSettingsRoute && item.route.startsWith('/settings'),
                'text-gray-500': !item.isHovered }"
            >
              {{ $t(`Cp_sidebar.${item.title.toLowerCase().replace(' ', '_')}`) }}
            </span>
          </div>
        </li>
      </ul>

      <ul>
        <!-- avatar -->
        <hr />
        <div>
          <li
            v-for="item in menuItems"
            :key="item.title"
            v-tooltip.right="isCollapsed ? $t(`Cp_sidebar.${item.title.toLowerCase().replace(' ', '_')}`) : ''"
            class="w-full cursor-pointer ml-1 font-poppins mb-8"
            :class="{ 'border-l text-primaryBlue border-primaryBlue ': baseRoute === item.route || isSettingsRoute && item.route.startsWith('/settings') }"
          >
            <div
              v-if="item.title === 'Settings'"
              class="hover:bg-primaryBlue hover:text-white flex text-center items-center my-1 py-1 px-5 font-poppins"
              @click="navigate(item.route)" @mouseenter="setIsHovered(item, true)"
              @mouseleave="setIsHovered(item, false)"
            >
              <i
                style="font-size: 1.2rem" class="py-3 ml-1" :class="[
                  item.icon,
                  {
                    'text-white': item.isHovered,
                    'text-primaryBlue': baseRoute === item.route || isSettingsRoute && item.route.startsWith('/settings'),
                    'text-gray-500': !item.isHovered,
                  }]"
              >
              </i>

              <span
                v-if="!isCollapsed" class="text-lg font-normal text-gray-500 ml-6" :class="{
                  'text-white': item.isHovered,
                  'text-primaryBlue ': baseRoute === item.route || isSettingsRoute && item.route.startsWith('/settings'),
                  'text-gray-500': !item.isHovered }"
              >
                {{ $t(`Cp_sidebar.${item.title.toLowerCase().replace(' ', '_')}`) }}
              </span>
            </div>
          </li>
          <!--  -->

          <div class="px-3">
            <NuxtLink to="/profile-settings">
              <div
                class="flex mt-auto "
                :class="{ 'space-y-2 flex-col justify-center items-center': isCollapsed, 'pl-2': !isCollapsed }"
              >
                <span class="relative inline-block">
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span class="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                </span>

                <p v-if="!isCollapsed" class="text-gray-500 text-lg font-normal pt-1 ml-5 mb-8 font-poppins">
                  {{ user?.name || user?.email }}
                </p>
              </div>
            </NuxtLink>
          </div>
          <div class="px-6 flex items-center mb-4 gap-4 mt-4 cursor-pointer" @click="logout">
            <i
              style="font-size: 1.2rem" class="py-3 ml-1 pi pi-chevron-left text-gray-500"
            >
            </i>

            <p v-if="!isCollapsed" class="font-poppins text-lg text-surface-600 ">
              Logout
            </p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMenuItems } from '../../composables/useMenuItems'
import ArrowLeft from '../../assets/icons/arrow-left.svg'
import ArrowRight from '../../assets/icons/arrow-right.svg'
import ArrowLeftWhite from '../../assets/icons/arrow-left-white.svg'
import ArrowRightWhite from '../../assets/icons/arrow-right-white.svg'

import { useAuth } from '@/composables/useAuth'

const { token, setToken, fetchUserDetails, user, setUser } = useAuth()

const { locale } = useI18n()

const router = useRouter()

const baseRoute = ref(router.currentRoute.value.path)
const isCollapsed = ref(false)

watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  if (newValue === '/templates/create')
    isCollapsed.value = true
  if (newValue === '/templates/update')
    isCollapsed.value = true

  baseRoute.value = newValue
  refreshLocale()
})

function logout() {
  setUser(null)
  setToken(null)
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  // router.push('signin')
}
function refreshLocale() {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale)
    locale.value = savedLocale
}

const isMinimizebtnHovered = ref(false)

function hoverEffect(val) {
  isMinimizebtnHovered.value = val
}

function navigate(route) {
  router.currentRoute.value.path = '/'

  router.push(route)
  baseRoute.value = route
}

// settings route
const isSettingsRoute = computed(() => baseRoute.value.startsWith('/settings'))

// nav bar items
const { menuItems } = useMenuItems()

//   mouse hover effect
function setIsHovered(item, val) {
  item.isHovered = val
}

// check if the window is resized
function handleResize() {
  if (baseRoute.value === '/templates/create' || baseRoute.value === '/templates/update')
    isCollapsed.value = true
  // else
    // isCollapsed.value = window.innerWidth <= 990
}

onMounted(() => {
  handleResize()
  refreshLocale()
  // window.addEventListener("resize", handleResize);
})

// toggle the side bar
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.pop_up {
  z-index: 9999 !important;

}
</style>
