import { Component } from "../../../core/index"
import {Useritem} from "../useritem/useritem"
import {appStore} from "../../store/appStore"



type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Userlist extends Component {

    static TEMPLATE = '../app/components/userlist/userlist.html'

    constructor(props: Indexed={}) {
        super({
            template: Userlist.TEMPLATE,
            tagName: 'ul',
            props: props
        })
        this.element.setClass('list')
        appStore.subscribe('setUserList', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )

    }

    render() {
        const components: Component[] = []
        const userList = appStore.getState('userList') as Indexed[]
        const currentUser = appStore.getState('currentchat') as Indexed
        if (userList.length > 0) {
            userList.forEach(user => {
                if (currentUser.created_by===user.id) {
                    user['owner']='Владелец'
                    // user['owner']=currentUser.created_by
                }
                components.push(new Useritem(user as Indexed))
            })
        }

        this.components = {
            chats: components
        }
        return nunjucks.render(this._template, this.props)
    }
}