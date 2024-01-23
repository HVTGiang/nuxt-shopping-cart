// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
  ssr: false
})
