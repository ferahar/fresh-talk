import {Component} from '../../../core/'
import {Useritem} from '../useritem/useritem'
import {appStore} from '../../store/appStore'
import {appEvents} from '../../store/events'

const template = require('./userlist.html')


export class Userlist extends Component {
  constructor(props: Indexed={}) {
    super({
      template,
      tagName: 'ul',
      props,
      style: 'list'
    })

    appStore.subscribe(appEvents.SET_USER_LIST, ()=> {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    } )
  }

  render() {
    const components: Component[] = []
    const userList = appStore.getState('userList') as Indexed[]
    const currentChat = appStore.getState('currentchat') as Indexed
    if (userList.length > 0) {
      userList.forEach(user => {
        if (currentChat.created_by===user.id) {
          user['owner']='Владелец'
        }
        components.push(new Useritem(user as Indexed))
      })
    }

    this.components = {
      chats: components
    }

    if (this.template) {
      return this.template(this.props)
    }
  }
}
