import {Component} from '../../../core/'
import {Chatitem} from '../chatitem/chatitem'
import {capbox} from '../capbox/'
import {appStore} from '../../store/appStore'
import {appEvents} from '../../store/events'

import './chatlist.scss'
import {WS} from '../../api/websocket'
const template = require('./chatlist.html')

export class Chatlist extends Component {
  constructor(props: Indexed = {}) {
    super({
      template,
      tagName: 'ul',
      style: 'chatlist',
      props
    })
    appStore.subscribe(appEvents.SET_CHATS, ()=> {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    } )
  }

  render() {
    const components: Component[] = []
    const chats = appStore.getState('chats') as Indexed[]
    const currentchat = appStore.getState('currentchat') as Indexed
    if (chats.length > 0) {
      chats.forEach(chat => {
        const chatItem = new Chatitem(chat as Indexed)
        if (currentchat && chat.id === currentchat.id) {
          chatItem.element.addClass('chatItem_selected')
        }
        const ws = new WS()
        const socket = ws.getSockets()[chat.id as string]
        if (!socket) {
          ws.add(chat.id as string)
        }
        components.push(chatItem)
      })
    } else {
      components.push(capbox)
    }

    this.components = {
      chats: components
    }
    return super.render()
  }
}
