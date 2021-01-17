import {Component} from '../../../core/'
import {Button} from '../button/button'
import {objectForm} from '../../../core/util/'
import {WS} from '../../api/websocket'

import './formresponse.scss'
import {appStore} from '../../store/appStore';


const template = require('./formresponse.html')


export class FormResponse extends Component {
  constructor(props: Indexed = {}) {
    super(
        {
          template,
          tagName: 'form',
          props,
          components: {
            button: [
              new Button({icon: 'send'}, 'button formresponse-sendButton' )
            ]
          }
        }
    )
    this.element.setClass('formresponse')
    this.element.on('submit', this.onSubmit.bind(this), true)
  }

  onSubmit(e: Event) {
    e.preventDefault()
    const form = this.element.nativeElement as HTMLFormElement
    const data = objectForm(new FormData(form))

    const currentchat:Indexed = appStore.getState('currentchat') as {}
    const name = `${currentchat.id}`
    const socket = new WS().getSockets()[name] as WebSocket
    if (data.content !== '') {
      socket.send(JSON.stringify({
        content: data.content,
        type: 'message',
      }))
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }
}
