import {appStore} from "./store/appStore"
import {Router} from '../core/index'
import {appRoutes} from './app-routes'
// import {apiAuth} from './api/index'

console.log(appStore.prop)

const router = new Router('app-root')
router.routes = appRoutes

export const start = () => {
    // apiAuth.user().then(data => {
    //     appStore.dispatch(Store.EVENTS.IS_LOGIN)
    //     const content = (data as XMLHttpRequest).response
    //     appStore.dispatch(Store.EVENTS.SET_PROFILE, content)
    // }, error => {
    //     console.log(error)
    // })
    router.start()
}

