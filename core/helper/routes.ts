const routes = {
  signIn: {
    name: 'sign-in',
    path: '/sign-in'
  },
  signUp: {
    name: 'sign-up',
    path: '/sign-up'
  },
  home: {
    name: 'home',
    path: '/'
  }
}

const guestRoutes = [routes.signIn.path, routes.signUp.path]

const authRoutes: string[] = []

export default routes
export { guestRoutes, authRoutes }
