import './_style/index.scss'
import {appStore} from './store/appStore'
import {Router, Store} from '../core/'
import {appRoutes} from './app-routes'
import {apiAuth, apiChats} from './api/'
import {WS} from './api/websocket'

const router = new Router('app-root')
router.routes = appRoutes

export const start = () => {
  apiAuth.user()
      .then(data => {
        appStore.dispatch(Store.EVENTS.IS_LOGIN)
        appStore.dispatch('setProfile', data)
        return apiChats.chats()
      })
      .then(data => appStore.dispatch('setChats', data))
      .then(()=>new WS())
      .finally(()=>router.start())
      .catch(error=>console.log(error))
}
