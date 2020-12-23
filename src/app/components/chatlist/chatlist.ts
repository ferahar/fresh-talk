import {Component} from "../../../core/index"
import {Chatitem} from "../chatitem/chatitem"
import {capbox} from "../capbox/index"
import {appStore} from "../../store/appStore";
import {appEvents} from "../../store/events";



export class Chatlist extends Component {

    static TEMPLATE = '../app/components/chatlist/chatlist.html'

    constructor(props: Indexed = {}) {
        super({
            template: Chatlist.TEMPLATE,
            tagName: 'ul',
            style: 'chatlist',
            props: props
        })
        appStore.subscribe(appEvents.SET_CHATS, ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }

    render() {
        const components: Component[] = []
        const chats = appStore.getState('chats') as Indexed[]
        const currentchat = appStore.getState('currentchat') as Indexed
        if (chats.length > 0) {
            chats.forEach(chat => {
                const chatItem = new Chatitem(chat as Indexed)
                if (currentchat && chat.id === currentchat.id) {
                    chatItem.element.addClass('chatItem_selected')
                }
                components.push(chatItem)
            })
        } else {
            components.push(capbox)
        }

        this.components = {
            chats: components
        }
        return super.render()
    }
}