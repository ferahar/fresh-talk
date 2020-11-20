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

    }

    private static __instance: Store
    private state: Indexed = {}
    private reducers: { [key: string]: Function } = {}
    private eventBus: EventBus | null = null
    // private subscribs = []

    constructor(reducers = {}, initialState: Indexed = {}) {

        if (Store.__instance) {
            return Store.__instance
        }

        this.state = this.reduce(Store.EVENTS.INIT, initialState)
        this.reducers = reducers
        this.eventBus = new EventBus()
        // this.subscribs = []
        Store.__instance = this
    }

    get prop() {
        return this.state
    }

    getState(name: string): boolean |string {
        if (!this.state) {
            return findState(this.state, name);
        }
        return false
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
        this.state[actionName] = Object.assign(this.state[actionName] , newState)
        if (this.eventBus) {
            this.eventBus.emit(actionName, this.prop)
        }
    }

    private reduce(actionName:string, state: Indexed, prop={}) {

        const fun: Function = this.reducers[actionName] as Function
        let newState = fun(state[actionName], prop)
        return Object.assign(this.state[actionName] , newState)
    }

}