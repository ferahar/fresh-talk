import {chatPage} from './pages/chat/chat'
import {loginPage} from './pages/login/login'
import {registerPage} from './pages/register/register'
import {page404} from './pages/404/404'
import {profilePage} from './pages/profile/profile'


export const appRoutes = [
  {path: '/', component: chatPage},
  {path: '/login', component: loginPage},
  {path: '/register', component: registerPage},
  {path: '/profile', component: profilePage},
  {path: '/404', component: page404}
]
