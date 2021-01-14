import {Component} from '../../../core/index'
import {appStore} from '../../store/appStore'
import {appEvents} from '../../store/events'

import './input.scss'
const template = require('./input.html')

export class Input extends Component {
    static TEMPLATE = '../app/components/input/input.html'

    constructor(props: Indexed) {
      super(
          {
            template,
            tagName: 'label',
            style: 'input',
            props
          }
      )

      if (this.props.store) {
        appStore.subscribe(appEvents.SET_PROFILE, ()=> {
          this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
      }
    }

    render() {
      if (this.props.store) {
        const props = Object.assign({}, this.props)
        if (this.props.image) {
          props.avatar = appStore.getState(this.props.store as string)
        } else {
          props.value = appStore.getState(this.props.store as string)
        }
        return this.template(props)
      }
      return this.template(this.props)
    }
}
