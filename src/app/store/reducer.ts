import {setState} from '../../core/util/'

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
    return setState(state, 'isLogin', '')
  },

  setProfile(state: Prop, prop: Prop) {
    return setState(state, 'profile', prop)
  },

  setChats(state: Prop, prop: Prop) {
    return setState(state, 'chats', prop)
  },

  setCurrentChat(state: Prop, prop: Prop) {
    return setState(state, 'currentchat', prop)
  },

  setMessagesChat(state: Prop, prop: Prop) {
    return setState(state, 'messages', prop)
  },

  setUserList(state: Prop, prop: Prop) {
    return setState(state, 'userList', prop)
  },

  setUserSearch(state: Prop, prop: Prop) {
    return setState(state, 'userSearch', prop)
  },

  setUserSelected(state: Prop, prop: Prop|string) {
    const result = setState(state, 'userSelected', prop)
    return result
  }
};
