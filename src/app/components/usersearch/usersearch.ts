import {Component} from '../../../core/'
import {appStore} from '../../store/appStore'
import {User} from '../user/user'
import {appEvents} from '../../store/events'
import {buttonAddUsers} from '../button/'

const template = require('./usersearch.html')


export class UserSearch extends Component {
  constructor(props: Indexed={}) {
    super({
      template,
      tagName: 'ul',
      props: props,
      style: 'list'
    })

    appStore.subscribe(appEvents.SET_USER_SEARCH, ()=> {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    } )
  }

  render() {
    const components: Component[] = []
    const userSearch = appStore.getState('userSearch') as Indexed[]
    if (userSearch.length > 0) {
      userSearch.forEach(user => {
        components.push(new User(user as Indexed))
      })
      components.push(buttonAddUsers)
    }

    this.components = {
      components
    }
    return super.render()
  }
}
