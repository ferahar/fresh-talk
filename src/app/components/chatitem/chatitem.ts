import {Component, $} from '../../../core/'
import {apiChats} from '../../api/'
import {appStore} from '../../store/appStore'
import {WS} from '../../api/websocket'

import './chatitem.scss'
const template = require('./chatitem.html')


export class Chatitem extends Component {
  constructor(props: Indexed) {
    super({
      template,
      tagName: 'li',
      props,
      style: 'chatItem',
    })

    this.element.attr('date-id', props.id as string)
    this.element.on('click', this.onClick.bind(this))
  }

  onClick() {
    unSelect('chatItem', 'chatItem_selected')
    this.element.addClass('chatItem_selected')
    appStore.dispatch('setCurrentChat', this.props)
    apiChats.users(this.props)
        .then((data) => {
          appStore.dispatch('setUserList', data)
          const currentchat:Indexed = appStore.getState('currentchat') as {}
          const name = `${currentchat.id}`
          const ws = new WS()
          const socket = ws.getSockets()[name]
          if (!socket) {
            // ws.add(this.props.id as string)
            console.log(ws.getSockets())
            console.log(appStore.getState('chats'))
          } else {
            socket.send(JSON.stringify({
              content: '0',
              type: 'get old',
            }))
          }
        })
        .catch((error)=>console.log(error.message))
  }
}

function unSelect(target:string, style: string) {
  const elements = document.querySelectorAll(`.${target}`)
  if (!elements) return
  elements.forEach((element) => {
    $(element as HTMLElement ).removeClass(style)
  })
}
