import {Component} from "../../../core/index";
import {chatnavigate} from "../../components/chatnavigate/index";
import {chatcurrent} from "../../components/chatcurrent/index";


type Indexed = {
    [key in string]: unknown
}

class ChatPage extends Component {

    static TEMPLATE = '../app/pages/chat/chat.html'

    constructor(components: Indexed = {}) {
        super({
            tagName: 'div',
            components
        })
        this.element.setClass('container')
    }

}

export const chatPage = new ChatPage({
        components: [
            chatnavigate,
            chatcurrent
        ]
    })

