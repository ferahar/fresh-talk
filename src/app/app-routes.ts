import { startPage } from './pages/start/start.js'
import { loginPage } from './pages/login/login.js'

// import { notFoundPage } from './pages/404-page'
import { Router } from '../core/router.js'

export const appRoutes = [
    {path:'/', component: startPage},
    {path:'/login', component: loginPage},
]

export const router = new Router('app-page')
router.routes = appRoutes