import {Component} from '../../../core/'
import {Button} from '../button/button'

import './modalwindow.scss'
const template = require('./modalwindow.html')


export class Modalwindow extends Component {
  constructor(title: string, components:Component[],) {
    super({
      template,
      tagName: 'div',
      props: {
        title
      },
      components: {
        content: components,
        close: [
          new Button({icon: 'close'}, 'button', ()=>{
            this.hide()
          })
        ]
      },
    })

    this.hide()
  }

  onClick(event: Event) {
    const target = event.target as HTMLElement

    if (target.tagName=='BUTTON') {
      this.hide()
    }
  }
}
