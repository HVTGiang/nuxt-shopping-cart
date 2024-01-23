<script setup>
  import SystemLoading from '~/components/SystemLoading'
</script>
<template>
  <ClientOnly>
    <v-app>
      <NuxtLayout>
        <!-- <NuxtWelcome /> -->
        <NuxtPage />
        <SystemLoading />
      </NuxtLayout>
    </v-app>
  </ClientOnly>
</template>
