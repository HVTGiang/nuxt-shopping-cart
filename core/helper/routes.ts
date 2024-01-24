const routes = {
  signIn: {
    name: 'sign-in',
    path: '/sign-in',
    text: ''
  },
  signUp: {
    name: 'sign-up',
    path: '/sign-up',
    text: ''
  },
  dashboard: {
    name: 'dashboard',
    path: '/',
    text: 'Dashboard'
  },
  users: {
    name: 'users',
    path: '/users',
    text: 'Users'
  },
  products: {
    name: 'products',
    path: '/products',
    text: 'Products'
  }
}

const guestRoutes = [routes.signIn.path, routes.signUp.path]

const authRoutes: string[] = []

export default routes
export { guestRoutes, authRoutes }
