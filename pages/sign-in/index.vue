<script setup lang="ts">
  import type { SubmitEventPromise } from 'vuetify/lib/framework.mjs'
  import routes from '~/core/helper/routes'
  import { login } from '~/core/services/user'
  import { useSystem, useUser } from '~/core/store'
  import { regexEmail } from '~/core/helper/regex'
  import type { IUser } from '~/core/interfaces/user'
  import { useToast } from 'vue-toastification'

  const system = useSystem()
  const userStore = useUser()
  const toast = useToast()

  const email = ref<string>()
  const password = ref<string>()
  const Form = ref()
  const rules = {
    email: [(value: any) => !!value || 'Required filed', (value: any) => regexEmail.test(value) || 'Email is invalid'],
    password: [
      (value: any) => !!value || 'Required filed',
      (value: any) => (value.length >= 8 && value.length <= 30) || 'Password must have 8~30 characters'
    ]
  }

  const handleLogin = async (event: SubmitEventPromise) => {
    const valid = (await event).valid

    if (!valid) {
      return
    }
    system.setSystemLoading(true)
    const user = await login({ email: email.value as string, password: password.value as string })

    system.setSystemLoading(false)
    if (user) {
      userStore.setUser(user as unknown as IUser)
      return navigateTo('/')
    }
  }
</script>
<template>
  <div class="sign-in-page">
    <div class="sign-in-page__cover">
      <div class="sign-in-page__cover-image">
        <div class="sign-in-page__cover-layer"></div>
        <img
          src="https://soft-ui-dashboard-pro-tall.creative-tim.com/assets/img/curved-images/curved9.jpg"
          alt="curve image" />
      </div>
    </div>
    <div class="sign-in-page__header d-flex justify-space-between align-center mt-6 mb-4 mx-auto px-4 py-2">
      <div class="sign-in-page__logo">Shopping Dashboad</div>
      <div class="sign-in-page__actions d-flex ga-4">
        <NuxtLink :to="routes.signIn.path" class="pa-2">Sign In</NuxtLink>
        <NuxtLink :to="routes.signUp.path" class="pa-2">Sign Up</NuxtLink>
      </div>
    </div>
    <div class="sign-in-page__title d-flex flex-column">
      <div class="sign-in-page__title-main">Welcome!</div>
      <div class="sign-in-page__title-sub">
        Use this awesome flat form to login or create new account in your project for free.
      </div>
    </div>
    <v-form
      @submit.prevent="handleLogin"
      class="sign-in-form mx-auto mt-16"
      ref="Form"
      lazy-validation
      validate-on="blur">
      <div class="sign-in-form__title pa-6">Sign In</div>
      <div class="sign-in-form__other-actions d-flex align-center ga-2 mb-4 justify-center">
        <div class="sign-in-form__other-action d-flex justify-center align-center">
          <img src="/assets/icons/facebook-svgrepo-com.svg" alt="" />
        </div>
        <div class="sign-in-form__other-action d-flex justify-center align-center">
          <img src="/assets/icons/apple-173-svgrepo-com.svg" alt="" />
        </div>
        <div class="sign-in-form__other-action d-flex justify-center align-center">
          <img src="/assets/icons/google-color-svgrepo-com.svg" alt="" />
        </div>
      </div>
      <div class="sign-in-form__inputs pa-6">
        <TextInput
          placeholder="Email"
          color="pink400"
          name="email"
          class="sign-in-form__input mt-1"
          :rules="rules.email"
          v-model="email" />
        <PasswordInput
          placeholder="Password"
          color="pink400"
          name="password"
          class="sign-in-form__input mt-1"
          :rules="rules.password"
          v-model="password" />
        <div class="sign-in-form__actions w-100">
          <v-btn
            block
            :elevation="2"
            class="sign-in-form__action bg-gradient-cyan font-weight-bold mt-6 mb-2"
            type="submit"
            >Sign In
          </v-btn>
          <div class="sign-in-form__divider d-flex align-center ga-2 mb-2">
            <div class="sign-in-form__divider-line--left"></div>
            <div class="sign-in-form__divider-text">Don't have an account?</div>
            <div class="sign-in-form__divider-line--right"></div>
          </div>
          <v-btn block :elevation="2" class="sign-in-form__action bg-gradient-dark-gray font-weight-bold mt-2 mb-6"
            >Sign Up
          </v-btn>
          <div class="sign-in-form__forgot-password mb-6">
            Forgot your password? Reset your password
            <a class="bg-gradient-cyan"> here. </a>
          </div>
        </div>
      </div>
    </v-form>
    <div class="sign-in-page__footer py-12">
      <div class="sign-in-page__menu d-flex align-center ga-12 justify-center mb-6">
        <div class="sign-in-page__menu-item">About Us</div>
        <div class="sign-in-page__menu-item">Contact Us</div>
        <div class="sign-in-page__menu-item">Blog</div>
        <div class="sign-in-page__menu-item">Licenses</div>
      </div>
      <div class="sign-in-page__icons d-flex align-center ga-6 justify-center mt-2 mb-6">
        <img class="sign-in-page__icon" src="/assets/icons/dribble-svgrepo-com.svg" alt="" />
        <img class="sign-in-page__icon" src="/assets/icons/twitter-154-svgrepo-com.svg" alt="" />
        <img class="sign-in-page__icon" src="/assets/icons/insta-svgrepo-com.svg" alt="" />
        <img class="sign-in-page__icon" src="/assets/icons/pinterest-180-svgrepo-com.svg" alt="" />
        <img class="sign-in-page__icon" src="/assets/icons/github-142-svgrepo-com.svg" alt="" />
      </div>
      <div class="sign-in-page__author d-flex align-center ga-6 justify-center mt-2 mb-6">Created by GiangHVT</div>
    </div>
  </div>
</template>
