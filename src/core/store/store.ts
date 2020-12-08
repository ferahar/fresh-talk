import { EventBus } from "../index"
import { setState, findState } from "../util/index"


type Indexed = {
    [key in string]: unknown
}

export class Store {

    static EVENTS = {
        INIT: 'init',
        IS_LOGIN: 'isLogin',
        LOGOUT: 'logout',
        SET_PROFILE: 'setProfile',
        STATE_CHANGE: 'state_change',
        ROUTE_CHANGE: 'route_change',

    }

    private static __instance: Store
    private state: Indexed = {}
    private reducers: { [key: string]: Function } = {}
    private eventBus: EventBus | null = null

    constructor(reducers = {}, initialState: Indexed = {}) {

        if (Store.__instance) {
            return Store.__instance
        }

        // this.state = this.reduce(Store.EVENTS.INIT, initialState)
        this.state = initialState
        this.reducers = reducers
        this.eventBus = new EventBus()
        this.init()
        Store.__instance = this
    }

    get prop() {
        return this.state
    }

    private init() {
        if (!this.eventBus) return
        this.eventBus.on(Store.EVENTS.STATE_CHANGE, ()=>{})
    }

    getState(name: string): boolean | string | unknown {
        return findState(this.state, name)
    }

    setState(name: string, value: unknown) {
        return setState(this.state, name, value);
    }

    subscribe(eventName: string, eventFun: Function) {
        if (!this.eventBus) return
        this.eventBus.on(eventName, eventFun)
    }

    dispatch(actionName: string, prop = {}) {

        let newState = this.reduce(actionName, this.state, prop)
        this.state = Object.assign(this.state , newState)
        if (this.eventBus) {
            // this.eventBus.emit(Store.EVENTS.STATE_CHANGE)
            this.eventBus.emit(actionName)
        }
    }

    private reduce(actionName:string, state: Indexed, prop={}) {

        const fun: Function = this.reducers[actionName] as Function
        let newState = fun(state, prop)
        return Object.assign(this.state, newState)
    }

}