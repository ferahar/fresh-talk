import {Component} from '../../../core/'
import {appStore} from '../../store/appStore'

const template = require('./lentaname.html')


export class LentaName extends Component {
  constructor(props: Indexed) {
    super({
      template,
      tagName: 'div',
      props
    })
    this.element.setClass('chatItem')

    appStore.subscribe(['setCurrentChat', 'setChats'], ()=> {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    } )
  }
}
