import {Component} from '../../../core/'
import './capbox.scss'

const template = require('./capbox.html')


export class Capbox extends Component {
  constructor(props: Indexed) {
    super({
      template,
      tagName: 'div',
      props
    })

        this.element!.setClass('capbox container container_isColumn container_center')
  }
}
