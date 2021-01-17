import {Component} from '../../../core/'
import {appStore} from '../../store/appStore'

import './message.scss'
const template = require('./message.html')

export class Message extends Component {
  constructor(props: Indexed) {
    const owner = appStore.getState('profile') as Indexed
    props['owner'] = owner
    const time = new Date(props.time as string)
    props['date'] = `${time.getHours()}:${time.getMinutes()}`
    super({
      template,
      tagName: 'div',
      props
    })
    if (owner.id === props.user_id || owner.id === props.userId) {
      this.element!.setClass('message message_right')
    } else {
      this.element!.setClass('message')
    }
  }
}


