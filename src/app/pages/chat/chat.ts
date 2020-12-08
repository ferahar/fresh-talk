import { Component, Router, DomElement } from "../../../core/index";
import {chatlist} from "../../components/chatlist/index";

type Indexed = {
    [key in string]: unknown
}

class ChatPage extends Component {

    static TEMPLATE = '../app/pages/chat/chat.html'

    constructor(components: Indexed = {}) {
        super({
            tagName: 'div',
            template: ChatPage.TEMPLATE,
            components
        })
    }

}

export const chatPage = new ChatPage({
        header: [],
        chatlist: [chatlist]
    }
)


new Router().initLink( chatPage.element as DomElement )




