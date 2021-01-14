import './avatar.scss'
import {Component} from '../../../core/'

const template = require('./avatar.njk')

export class Avatar extends Component {
  constructor(props: Indexed) {
    super({
      template,
      tagName: 'div',
      props,
    })
        this.element!.setClass('avatar')
  }
}
