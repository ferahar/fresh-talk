import { startPage } from './pages/start/start'
import { loginPage } from './pages/login/login'
import { registrPage } from './pages/registr/registr'
import { page404 } from './pages/404/404'
import {profilePage} from "./pages/profile/profile";


export const appRoutes = [
    {path: '/', component: startPage },
    {path: '/login', component: loginPage},
    {path: '/registr', component: registrPage},
    {path: '/profile', component: profilePage},
    {path: '/404', component: page404 }
]



// import { startPage } from './pages/start/start.js';
// import { loginPage } from './pages/login/login.js';
// import { registrPage } from './pages/registr/registr.js';
// import { profilePage } from './pages/profile/profile.js';
// import { page404 } from './pages/404/404.js';
// import { Router } from '../core/router/router.js';
// import { mainPage } from './pages/main/main.js';
// export const appRoutes = [
//     { path: '/', component: mainPage },
//     { path: '/start', component: startPage },
//     { path: '/login', component: loginPage },
//     { path: '/registr', component: registrPage },
//     { path: '/profile', component: profilePage },
//     { path: '/404', component: page404 }
// ];
// export const router = new Router('app-root');
// router.routes = appRoutes;