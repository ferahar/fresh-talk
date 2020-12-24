import { Component } from "../../../core/index"
import {Button} from "../button/button";
import {apiChats} from "../../api/index";
import {appStore} from "../../store/appStore";
import {formsEditChat} from "../forms2/index";
import {inputsEditChat} from "../input/index";
import {userlist} from "../userlist/index";
import {modalwindowAddUsers} from "../modalwindow/index";
import {appEvents} from "../../store/events";


export class Lentaeditor extends Component {

    static TEMPLATE = '../app/components/lentaeditor/lentaeditor.html'

    constructor(props: Indexed={}) {
        super({
            template: Lentaeditor.TEMPLATE,
            tagName: 'section',
            props: props,
            style: 'lentaeditor container container_isColumn container_size_auto'
        })

        appStore.subscribe(appEvents.SET_CURCHAT, ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
            inputsEditChat.forEach(input=>input.eventBus.emit(Component.EVENTS.FLOW_RENDER))
        } )

    }

    render() {
        const currentchat = appStore.getState('currentchat') as Indexed
        if (!currentchat) this.hide()
        this.components = {
            headerleft: [
                buttonRemoveChat
            ],
            headerright: [
                new Button({icon:'person_add'}, 'button button_ghost', ()=>{
                    modalwindowAddUsers.show()
                }),
                new Button({icon:'chat'}, 'button button_ghost', this.hide.bind(this))
            ],
            forms: [formsEditChat],
            userlist: [userlist]
        }

        return nunjucks.render(this._template, this.props)
    }
}

const buttonRemoveChat = new Button({icon: 'delete'}, 'button button_danger', ()=>{
    const currentchat = appStore.getState('currentchat') as Indexed
    apiChats.remove({chatId: currentchat.id})
        .then(apiChats.chats, error => {
            console.log(error.response)
        })
        .then(data => {
            appStore.dispatch('setChats', data)
            appStore.dispatch('setCurrentChat', '')
        })
    console.log(`Remove chat # ${currentchat.id}`)
})
