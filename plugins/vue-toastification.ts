import Toast, { type PluginOptions } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  maxToasts: 5
}
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options)
})
