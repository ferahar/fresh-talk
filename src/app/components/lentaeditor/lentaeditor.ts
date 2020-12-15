import { Component, Store } from "../../../core/index"
import {Button} from "../button/button";
import {apiChats} from "../../api/index";
import {appStore} from "../../store/appStore";
import {formsEditChat} from "../forms2/index";
import {inputsEditChat} from "../input/index";
import {userlist} from "../userlist/index";
import {modalwindowAddUsers} from "../modalwindow/index";


type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Lentaeditor extends Component {

    static TEMPLATE = '../app/components/lentaeditor/lentaeditor.html'

    constructor(props: Indexed={}) {
        super({
            template: Lentaeditor.TEMPLATE,
            tagName: 'section',
            props: props
        })
        this.element.setClass('lentaeditor container container_isColumn container_size_auto')
        new Store().subscribe('setCurrentChat', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
            inputsEditChat.forEach(input=>input.eventBus.emit(Component.EVENTS.FLOW_RENDER))
        } )

    }

    render() {
        const currentchat = appStore.getState('currentchat') as Indexed
        if (!currentchat) this.hide()
        this.components = {
            headerleft: [
                new Button({icon:'chat'}, 'button button_ghost', this.hide.bind(this)),
                new Button({icon:'person_add'}, 'button button_ghost', ()=>{
                    modalwindowAddUsers.show()
                })
            ],
            headerright: [buttonRemoveChat],
            forms: [formsEditChat],
            userlist: [userlist]
        }

        return nunjucks.render(this._template, this.props)
    }
}

const buttonRemoveChat = new Button({icon: 'delete'}, 'button button_ghost', ()=>{
    const currentchat = appStore.getState('currentchat') as Indexed
    apiChats.remove({chatId: currentchat.id})
        .then(apiChats.chats, error => {
            console.log(error.response)
        })
        .then(data => {
            const content = JSON.parse((data as XMLHttpRequest).response)
            appStore.dispatch('setChats', content)
            appStore.dispatch('setCurrentChat', '')
        })
    console.log(`Remove chat # ${currentchat.id}`)
})

