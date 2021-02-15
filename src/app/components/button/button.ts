import {Component} from '../../../core/'

import './button.scss'
const template = require('./button.njk')


export class Button extends Component {
    private callback: Function | null

    constructor(props: Indexed, className?: string, callback?: Function) {
      super({
        template,
        tagName: 'button',
        props,
      })

      if (className) {
            this.element!.setClass(className)
      } else {
            this.element!.setClass('button')
      }

      if (callback && this.element ) {
        this.callback = callback
        this.element.on( 'click', this.callback as EventListener )
      } else {
        this.callback = null
      }
    }
}
