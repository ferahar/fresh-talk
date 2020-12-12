import { Component, Router, DomElement } from "../../../core/index";
import {chatlist} from "../../components/chatlist/index";
import {Button} from "../../components/button/button";
import {modalwindowCreateChat} from "../../components/modalwindow/index";
import {lentaEditor} from "../../components/lentaeditor/index";
import {lenta} from "../../components/lenta/index";

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
        this.element.setClass('container')
    }

}

document.body.appendChild(modalwindowCreateChat.element.nativeElement as HTMLElement)
export const chatPage = new ChatPage({
        headerProfile: [
            new Button({icon: 'account_circle'}, 'button button_square', ()=>{new Router().go('/profile')}),
            new Button({icon: 'add'}, 'button', ()=>{ modalwindowCreateChat.show()}),
        ],
        chatlist: [
            chatlist
        ],
        lenta: [
            lenta,
            lentaEditor
        ],
    }
)


new Router().initLink( chatPage.element as DomElement )




