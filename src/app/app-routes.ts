import { startPage } from './pages/start/start'
import { loginPage } from './pages/login/login'
import { registrPage } from './pages/registr/registr'
import { page404 } from './pages/404/404'

import { Router } from '../core/router'

export const appRoutes = [
    {path: '/', component: startPage},
    {path: '/login', component: loginPage},
    {path: '/registr', component: registrPage},
    {path: '/404', component: page404}
]

export const router = new Router('app-page')
router.routes = appRoutes