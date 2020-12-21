import {Component, Store} from "../../../core/index"
import {capboxCurrentChat} from "../capbox/index"
import {lenta} from "../lenta/index"
import {lentaEditor} from "../lentaeditor/index"
// import {appEvents} from "../../store/events"

type Indexed = {
    [key in string]: unknown
}
declare var nunjucks: any

export class Chatcurrent extends Component {

    static TEMPLATE = '../app/components/chatcurrent/chatcurrent.html'

    constructor(components: Indexed = {}) {
        super({
            tagName: 'article',
            template: Chatcurrent.TEMPLATE,
            components
        })
        this.element.setClass('chatcurrent container container_size_auto')
            // [appEvents.SET_CURCHAT, appEvents.STATE_CHANGE]
        new Store().subscribe(['setCurrentChat', 'state_change'], ()=> {
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

        return nunjucks.render(this._template, this.props)
    }


}




