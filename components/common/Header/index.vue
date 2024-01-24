<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { ROLES } from '~/core/constant/user.role'
  import routes from '~/core/helper/routes'
  import { useUser } from '~/core/store'
  import { logout } from '~/core/services/user'

  const route = useRoute()
  const router = useRouter()
  const userStore = useUser()

  const initItems = [
    {
      title: '',
      href: '/',
      disabled: false,
      icon: 'mdi-home'
    }
  ]

  const handleLogout = async () => {
    await logout()
  }

  const items = ref(initItems)

  watchEffect(() => {
    const listItems = route.path.split('/').filter((item) => item !== '')
    const foundRoute = listItems
      .map((item) => {
        return Object.values(routes).find((route) => `/${item}` === route.path)
      })
      .filter((item) => item !== undefined)
    const newItems = $lodash.cloneDeep(initItems)
    newItems.push(
      ...foundRoute
        .filter((route) => !!route)
        .map((route) => {
          return {
            title: route ? route.text : '',
            href: route ? route.path : '',
            disabled: false,
            icon: ''
          }
        })
    )
    items.value = $lodash.cloneDeep(newItems)
  })
</script>
<template>
  <div class="app-header d-flex align-center justify-space-between">
    <div class="app-header__section">
      <v-breadcrumbs :items="items" class="breadcrumb">
        <template #item="{ item }">
          <p
            class="breadcrumb__item"
            :class="{ 'breadcrumb__item--active': item.href !== route.path }"
            @click="() => router.push(item.href)">
            {{ item.title }}
            <v-icon class="breadcrumb__item--icon" :icon="item.icon" v-if="item.icon"></v-icon>
          </p>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="app-header__section">
      <div class="app-header__user-info">
        <div
          class="app-header__user-role"
          :class="
            userStore.user?.role === ROLES.ADMIN ? 'app-header__user-role--admin' : 'app-header__user-role--user'
          ">
          {{ userStore.user?.role === ROLES.ADMIN ? 'Admin' : 'User' }}
        </div>
        <p class="app-header__user-name">{{ `${userStore.user?.firstName} ${userStore.user?.lastName}` }}</p>
        <v-avatar :size="32">
          <v-img :src="userStore.user?.avatar" :alt="userStore.user?.firstName" :cover="true" />
        </v-avatar>
        <v-btn class="app-header__user-logout shadow-small" variant="flat" @click="handleLogout"> Log out </v-btn>
      </div>
    </div>
  </div>
</template>
