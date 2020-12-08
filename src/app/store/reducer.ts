import { setState } from '../../core/util/index'

type Prop = Record<string, object | string>

export const reducer = {

    init(state: Prop) {
        return state
    },

    isLogin(state: Prop) {
        const value = 'success'
        return setState(state, 'isLogin', value)
    },
    
    logout(state: Prop) {
        return setState(state, 'isLogin','')
    },

    setProfile(state: Prop, prop: Prop) {
        return setState(state, 'profile', prop)
    },

    setChats(state: Prop, prop: Prop) {
        return setState(state, 'chats', prop)
    }
};
