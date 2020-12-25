import {Component} from "../../../core/index"
import {appStore} from "../../store/appStore"
import {User} from "../user/user"
import {appEvents} from "../../store/events"
import {buttonAddUsers} from "../button/index"


export class UserSearch extends Component {

    static TEMPLATE = '../app/components/usersearch/usersearch.html'

    constructor(props: Indexed={}) {
        super({
            template: UserSearch.TEMPLATE,
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
