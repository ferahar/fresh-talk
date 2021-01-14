import {Component} from '../../../core/'

import './message.scss'
const template = require('./message.html')

export class Message extends Component {
  constructor(props: Indexed) {
    super({
      template,
      tagName: 'div',
      props: props
    })

    this.element!.setClass('message')
  }
}
