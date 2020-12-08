import { Component, Store } from "../../../core/index"
import {Chatitem} from "../chatitem/chatitem"


type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Chatlist extends Component {

    static TEMPLATE = '../app/components/chatlist/chatlist.html'

    constructor(props: Indexed={}) {
        super({
            template: Chatlist.TEMPLATE,
            tagName: 'div',
            props: props
        })
        new Store().subscribe('setChats', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }

    render() {
        const components: Component[] = []
        const chats = new Store().getState('chats') as Indexed[]
        if (chats.length<=0) return
        chats.forEach(chat => {
            components.push( new Chatitem(chat as Indexed))
        })
        this.components = {
            chatlist: components
        }
        return nunjucks.render(this._template, this.props)
    }
}