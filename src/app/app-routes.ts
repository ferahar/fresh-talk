import { startPage } from './pages/start/start.js'
import { loginPage } from './pages/login/login.js'
import { page404 } from './pages/404/404.js'

import { Router } from '../core/router.js'

export const appRoutes = [
    {path: '/', component: startPage},
    {path: '/login', component: loginPage},
    {path: '/404', component: page404}
]

export const router = new Router('app-page')
router.routes = appRoutes