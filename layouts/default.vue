<script setup lang="ts">
  import useFirebase from '~/composables/useFirebase'
  import type { IUser } from '~/core/interfaces/user'
  import { getUserByEmail } from '~/core/services/user'
  import { useSystem, useUser } from '~/core/store'

  const { auth } = useFirebase()
  const system = useSystem()
  const router = useRouter()
  const userStore = useUser()

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
      router.push('/')
    }
    system.setSystemLoading(false)
  })
</script>

<template>
  <div>
    <slot />
  </div>
</template>
