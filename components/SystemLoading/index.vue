<script setup lang="ts">
  import { useSystem } from '~/core/store'
  const system = useSystem()
</script>

<template>
  <v-overlay scroll-strategy="none" class="align-center justify-center" v-model="system.loading" :disabled="false">
    <v-progress-circular indeterminate :color="'#ffea00'"></v-progress-circular>
  </v-overlay>
</template>
