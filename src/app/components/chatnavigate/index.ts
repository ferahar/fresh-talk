import {modalwindowCreateChat} from "../modalwindow/index"
import {Button} from "../button/button"
import {Router} from "../../../core/index"
import {chatlist} from "../chatlist/index"
import {Chatnavigate} from "./chatnavigate"

document.body.appendChild(modalwindowCreateChat.element.nativeElement as HTMLElement)
export const chatnavigate = new Chatnavigate({
        headerProfile: [
            new Button({icon: 'account_circle'}, 'button button_square', ()=>{new Router().go('/profile')}),
            new Button({icon: 'add'}, 'button', ()=>{ modalwindowCreateChat.show()}),
        ],
        chatlist: [
            chatlist
        ]
    }
)
