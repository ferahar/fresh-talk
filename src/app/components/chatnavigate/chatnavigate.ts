import {Component} from '../../../core/'
import {ListComponents} from '../../../core/type'

import './chatnavigate.scss'
const template = require('./chatnavigate.html')


export class Chatnavigate extends Component {
  constructor(components: ListComponents = {}) {
    super({
      tagName: 'aside',
      template,
      components,
      style: 'chatnavigate container container_isColumn'
    })
  }
}


