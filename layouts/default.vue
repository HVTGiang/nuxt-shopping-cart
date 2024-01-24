<script setup lang="ts">
  import useFirebase from '~/composables/useFirebase'
  import type { IUser } from '~/core/interfaces/user'
  import { getUserByEmail } from '~/core/services/user'
  import { useSystem, useUser } from '~/core/store'
  import SideMenu from '~/components/common/SideMenu/index.vue'
  import Header from '~/components/common/Header/index.vue'
  import { guestRoutes } from '~/core/helper/routes'

  const { auth } = useFirebase()
  const system = useSystem()
  const router = useRouter()
  const userStore = useUser()
  const route = useRoute()

  auth.onAuthStateChanged(async () => {
    system.setSystemLoading(true)
    const currentUser = await auth.currentUser
    if (!currentUser) {
      router.push('/sign-in')
    } else {
      const user = await getUserByEmail(currentUser.email as string)
      if (user) {
        userStore.setUser(user as unknown as IUser)
      }
      router.push(guestRoutes.includes(route.path) ? '/' : route.fullPath || '/')
    }
    system.setSystemLoading(false)
  })
</script>

<template>
  <div class="default-layout d-flex">
    <SideMenu v-if="!guestRoutes.includes(route.path)" />
    <div class="default-layput__content flex-grow-1">
      <Header v-if="!guestRoutes.includes(route.path)" />
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .default-layout {
    background-color: rgba(var(--v-theme-gray50));
    min-height: 100vh;
  }
</style>
