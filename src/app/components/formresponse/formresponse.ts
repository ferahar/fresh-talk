import {Component} from '../../../core/'
import {Button} from '../button/button'
import {objectForm} from '../../../core/util/'

import './formresponse.scss'
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
    const data = new FormData(form)
    console.log(objectForm(data))
  }
}
