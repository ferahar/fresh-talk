import {Component, Store} from "../../../core/index"
import {capboxCurrentChat} from "../capbox/index"
import {lenta} from "../lenta/index"
import {lentaEditor} from "../lentaeditor/index"
import {ListComponents} from "../../../core/type";
import {appStore} from "../../store/appStore";
import {appEvents} from "../../store/events"


export class Chatcurrent extends Component {

    static TEMPLATE = '../app/components/chatcurrent/chatcurrent.html'

    constructor(components: ListComponents={}) {
        super({
            tagName: 'article',
            template: Chatcurrent.TEMPLATE,
            components,
            style: 'chatcurrent container container_size_auto'
        })
        appStore.subscribe([appEvents.SET_CURCHAT, appEvents.STATE_CHANGE], ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }
    render() {
        let components: Component[] = []
        const chats = new Store().getState('currentchat') as Indexed
        if (chats) {
            components = [
                lenta,
                lentaEditor
            ]
        } else {
            components = [
                capboxCurrentChat
            ]
        }

        this.components = {
            components
        }
        return super.render()
    }
}
