import {Component} from '../../../core/'
import {LentaName} from '../lentaname/lentaname'
import {Button} from '../button/button'
import {lentaEditor} from '../lentaeditor/'
import {Message} from '../message/message'
import {modalwindowAddUsers} from '../modalwindow/'
import {formResponse} from '../formresponse/'
import {appEvents} from '../../store/events'
import {appStore} from '../../store/appStore'

const template = require('./lenta.html')

export class Lenta extends Component {
  constructor(props: Indexed={}) {
    super({
      template,
      tagName: 'section',
      style: 'container container_isColumn container_size_auto',
      props
    })

    appStore.subscribe([appEvents.SET_CURCHAT, appEvents.SET_MSG], ()=> {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    } )
  }

  render() {
    const currentchat = appStore.getState('currentchat') as Indexed
    const messages = appStore.getState('messages') as []
    console.log('messages: ', messages)
    this.components = {
      headerleft: [
        new LentaName(currentchat),
      ],
      headerright: [
        new Button({icon: 'person_add'}, 'button button_ghost', ()=>{
          modalwindowAddUsers.show()
        }),
        new Button({icon: 'settings'}, 'button button_ghost', ()=>{
          lentaEditor.show()
        }
        )
      ],
      msgList: arrayComponentMessage(messages),
      msgSend: [
        formResponse
      ]
    }
    return super.render()
  }

  componentWillMount() {
    const el = this.element.nativeElement!.querySelector('#msgList') as HTMLElement
    if (!el) return
    el.scrollTop=el.scrollHeight-el.offsetHeight
  }
}

function arrayComponentMessage(data:Indexed[]):Component[] {
  const result: Component[] = []
  data.forEach(props=>{
    result.push(new Message(props as Indexed))
  })
  return result
}

// $0.scrollTop=$0.scrollHeight-$0.offsetHeight
