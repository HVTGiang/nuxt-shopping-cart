import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import color from '~/core/theme/color'
import 'assets/style/main.scss'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: false,
          colors: {
            ...color.slate,
            ...color.gray,
            ...color.zinc,
            ...color.neutral,
            ...color.stone,
            ...color.red,
            ...color.orange,
            ...color.amber,
            ...color.yellow,
            ...color.lime,
            ...color.green,
            ...color.emerald,
            ...color.teal,
            ...color.cyan,
            ...color.sky,
            ...color.blue,
            ...color.indigo,
            ...color.violet,
            ...color.purple,
            ...color.fuchsia,
            ...color.pink,
            ...color.rose
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
