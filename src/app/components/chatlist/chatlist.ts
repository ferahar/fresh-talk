import { Component, Store } from "../../../core/index"
import {Chatitem} from "../chatitem/chatitem"
import {capbox} from "../capbox/index"


type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Chatlist extends Component {

    static TEMPLATE = '../app/components/chatlist/chatlist.html'

    constructor(props: Indexed={}) {
        super({
            template: Chatlist.TEMPLATE,
            tagName: 'ul',
            props: props
        })
        this.element.setClass('chatlist')
        new Store().subscribe('setChats', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }

    render() {
        const components: Component[] = []
        const chats = new Store().getState('chats') as Indexed[]
        if (chats.length > 0) {
            chats.forEach(chat => {
                components.push(new Chatitem(chat as Indexed))
            })
        } else {
            components.push(capbox)
        }

        this.components = {
            chats: components
        }

        return nunjucks.render(this._template, this.props)
    }
}