import {Component} from '../../../core/'
import {Button} from '../button/button'
import {apiChats} from '../../api/'
import {appStore} from '../../store/appStore'
import {formsEditChat} from '../forms2/'
import {inputsEditChat} from '../input/'
import {userlist} from '../userlist/'
import {modalwindowAddUsers} from '../modalwindow/'
import {appEvents} from '../../store/events'

import './lentaeditor.scss'
const template = require('./lentaeditor.html')


export class Lentaeditor extends Component {
    static TEMPLATE = '../app/components/lentaeditor/lentaeditor.html'

    constructor(props: Indexed={}) {
      super({
        template,
        tagName: 'section',
        props,
        style: 'lentaeditor container container_isColumn container_size_auto'
      })

      appStore.subscribe(appEvents.SET_CURCHAT, ()=> {
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        inputsEditChat.forEach(input=>input.eventBus.emit(Component.EVENTS.FLOW_RENDER))
      } )
    }

    render() {
      const currentchat = appStore.getState('currentchat') as Indexed
      const profile = appStore.getState('profile') as Indexed

      if (!currentchat) this.hide()

      if (currentchat.created_by === profile.id ) {
        this.components.headerleft = [buttonRemoveChat]
      }

      this.components.headerright = [
        new Button({icon: 'person_add'}, 'button button_ghost', ()=>{
          modalwindowAddUsers.show()
        }),
        new Button({icon: 'chat'}, 'button button_ghost', this.hide.bind(this))
      ]
      this.components.forms = [formsEditChat]
      this.components.userlist = [userlist]
      return this.template(this.props)
    }
}

const buttonRemoveChat = new Button({icon: 'delete'}, 'button button_danger', ()=>{
  const currentchat = appStore.getState('currentchat') as Indexed
  apiChats.remove({chatId: currentchat.id})
      .then(apiChats.chats, error => {
        console.log(error.response)
      })
      .then(data => {
        appStore.dispatch('setChats', data)
        appStore.dispatch('setCurrentChat', '')
      })
      .catch(error=>console.log(error.message))
})

