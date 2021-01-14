import {Component} from '../../../core/'
import {ListComponents} from '../../../core/type'

import './chatnavigate.scss'
const template = require('./chatnavigate.html')


export class Chatnavigate extends Component {
    static TEMPLATE = '../app/components/chatnavigate/chatnavigate.html'

    constructor(components: ListComponents = {}) {
      super({
        tagName: 'aside',
        template,
        components,
        style: 'chatnavigate container container_isColumn'
      })
    }
}


