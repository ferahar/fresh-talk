import {Component} from '../../../core/'

import './notification.scss'
const template = require('./notification.html')


export class Notification extends Component {
  constructor(message: string) {
    super({
      tagName: 'dialog',
      template,
      props: {
        message
      },
      style: 'notification'
    })
    document.body.appendChild(this.element.nativeElement as HTMLElement)
  }

  componentDidMount() {
    setTimeout(()=>this.element.nativeElement!.remove(), 3000)
  }
}
