import {appStore} from "./store/appStore"
import {Router, Store} from '../core/index'
import {appRoutes} from './app-routes'
import {apiAuth, apiChats} from './api/index'

const router = new Router('app-root')
router.routes = appRoutes

export const start = () => {
    apiAuth.user()
        .then(data => {
        appStore.dispatch(Store.EVENTS.IS_LOGIN)
        const content = JSON.parse((data as XMLHttpRequest).response)
        appStore.dispatch('setProfile', content)
        return content.id
    })
        .then(apiChats.chats, error => {
            console.log(error.response)
            router.start()
        })
        .then(data => {
            const content = JSON.parse((data as XMLHttpRequest).response)
            appStore.dispatch('setChats', content)
            router.start()
        })


}

