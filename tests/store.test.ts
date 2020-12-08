import {reducer} from "../src/app/store/reducer"
import {state} from "../src/app/store/state"
import {Store} from "../src/core"

const store = new Store(reducer, state)

test('STORE: Find in state to equal "success"', () => {
    const isLogin = store.getState('isLogin')
    expect( isLogin ).toBe('')
})

test('STORE: Set isLogin === "success"', () => {
    store.dispatch(Store.EVENTS.IS_LOGIN)
    console.log(store.prop)
    const isLogin = store.getState('isLogin')
    expect( isLogin ).toBe('success')
})

