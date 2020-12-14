import { Component, Store } from "../../../core/index"
import {Useritem} from "../useritem/useritem";


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
        this.element.setClass('container container_isColumn')
        new Store().subscribe('setUserList', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )

    }

    render() {
        const components: Component[] = []
        const userList = new Store().getState('userList') as Indexed[]
        if (userList.length > 0) {
            userList.forEach(user => {
                console.log(user)
                components.push(new Useritem(user as Indexed))
            })
        }

        this.components = {
            chats: components
        }
        return nunjucks.render(this._template, this.props)
    }
}