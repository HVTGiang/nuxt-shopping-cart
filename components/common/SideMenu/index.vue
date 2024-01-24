<script setup lang="ts">
  import routes from '~/core/helper/routes'
  const route = useRoute()

  const menuItems = [
    {
      groupName: undefined,
      items: [
        {
          title: 'Dashboard',
          icon: 'home',
          link: routes.dashboard.path
        },
        {
          title: 'Products',
          icon: 'collage',
          link: routes.products.path
        },
        {
          title: 'Users',
          icon: 'account',
          link: routes.users.path
        }
      ]
    }
  ]
</script>

<template>
  <div class="app-menu d-flex flex-column">
    <div class="app-menu__header">
      <div class="app-menu__logo d-flex align-center ga-2">
        <img src="/assets/icons/amazon-icon-logo-svgrepo-com.svg" alt="Web logo" />
        <p class="app-menu__logo-text">Nuxt Dashboard</p>
      </div>
      <div class="horizontal-divider bg-gradient-horizontal-dark mb-4"></div>
      <v-list class="h-100 app-menu__list">
        <div v-for="(group, index) in menuItems" :key="index">
          <p v-if="group.groupName" class="app-menu__group-name">{{ group.groupName }}</p>
          <v-list-item
            v-for="(item, index) in group.items"
            :key="index"
            :density="'comfortable'"
            :link="true"
            class="app-menu__item"
            :class="{ 'app-menu__item--active shadow-medium': route.path === item.link }"
            @click="() => $router.push(item.link)"
            >{{ item.title }}

            <template #prepend>
              <div
                class="app-menu__item-icon-container shadow-small"
                :class="{
                  'app-menu__item-icon-container--active bg-gradient-fuchsia': route.path === item.link
                }">
                <v-icon
                  :icon="`mdi-${item.icon}`"
                  :color="route.path === item.link ? 'white' : 'slate800'"
                  :size="'12px'" />
              </div>
            </template>
          </v-list-item>
        </div>
      </v-list>
    </div>
  </div>
</template>
