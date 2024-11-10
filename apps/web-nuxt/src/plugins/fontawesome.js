// plugins/fontawesome.js

import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import Pro icon packs (which include free icons of the same style)
import { fas } from '@fortawesome/pro-solid-svg-icons'

// Pro Solid Icons
import { far } from '@fortawesome/pro-regular-svg-icons'

// Pro Regular Icons
import { fal } from '@fortawesome/pro-light-svg-icons'

// Pro Light Icons
import { fad } from '@fortawesome/pro-duotone-svg-icons'

// Pro Duotone Icons
import { fat } from '@fortawesome/pro-thin-svg-icons'

// Pro Thin Icons

// Import Sharp Icons
import { fass } from '@fortawesome/sharp-solid-svg-icons'

// Sharp Solid Icons

// Import Free Brands Icons separately
import { fab } from '@fortawesome/free-brands-svg-icons'

// Free Brands Icons

// Disable auto-adding CSS since Nuxt handles it
config.autoAddCss = false

// Add all icon packs to the library
library.add(fas, far, fal, fad, fat, fass, fab)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
