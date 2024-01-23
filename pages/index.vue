<script setup lang="ts">
  import { useUser } from '~/core/store'

  const userStore = useUser()
</script>

<template>
  <div>{{ userStore.user?.firstName }}</div>
</template>
