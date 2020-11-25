import {Store, Router} from '../core/index'
import {appRoutes} from './app-routes'
// import {apiAuth} from './api/index'
import {reducer} from "./store/reducer"
import {state} from "./store/state"

const store = new Store(reducer, state)
console.log(store.prop)

const router = new Router('app-root')
router.routes = appRoutes



export const start = () => {
    // apiAuth.user().then(data => {
    //     store.dispatch(Store.EVENTS.IS_LOGIN)
    //     const content = (data as XMLHttpRequest).response
    //     store.dispatch(Store.EVENTS.SET_PROFILE, content)
    // }, error => {
    //     console.log(error)
    // })
    router.start()
}




