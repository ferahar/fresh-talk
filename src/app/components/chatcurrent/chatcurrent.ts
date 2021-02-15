import {Component, Store} from '../../../core/'
import {capboxCurrentChat} from '../capbox/'
import {lenta} from '../lenta/'
import {lentaEditor} from '../lentaeditor/'
import {ListComponents} from '../../../core/type'
import {appStore} from '../../store/appStore'
import {appEvents} from '../../store/events'

import './chatcurrent.scss'
const template = require('./chatcurrent.html')


export class Chatcurrent extends Component {
  constructor(components: ListComponents={}) {
    super({
      tagName: 'article',
      template,
      components,
      style: 'chatcurrent container container_size_auto'
    })
    appStore.subscribe([appEvents.SET_CURCHAT, appEvents.STATE_CHANGE], ()=> {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    } )
  }
  render() {
    let components: Component[] = []
    const chats = new Store().getState('currentchat') as Indexed
    if (chats) {
      components = [
        lenta,
        lentaEditor
      ]
    } else {
      components = [
        capboxCurrentChat
      ]
    }

    this.components = {
      components
    }
    return super.render()
  }
}
