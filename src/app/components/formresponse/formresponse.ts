import {Component} from '../../../core/'
import {Button} from '../button/button'
import {WS} from '../../api/websocket'

import './formresponse.scss'
import {appStore} from '../../store/appStore'


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
    const textArea = this.element.find('#textarea')
    const content = textArea.getText()
    const currentchat:Indexed = appStore.getState('currentchat') as {}
    const name = `${currentchat.id}`
    const socket = new WS().getSockets()[name] as WebSocket
    if (content !== '') {
      socket.send(JSON.stringify({content, type: 'message'}))
      console.log(appStore.getState('messages'))
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  componentWillMount() {
    const textArea = this.element.find('#textarea')

    if (textArea) {
      textArea.on('blur', ()=>{
        const content = textArea.getText()!.trim()
        if (content === '') {
          textArea.nativeElement!.innerHTML = this.props.placeholder as string
        }
      })
      textArea.on('focus', ()=>{
        const content = textArea.getText()!.trim()
        if (content === this.props.placeholder ) {
          textArea.nativeElement!.innerHTML = ''
        }
      })
    }
  }
}
