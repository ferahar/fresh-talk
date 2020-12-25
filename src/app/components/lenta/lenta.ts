import {Component} from "../../../core/index"
import {LentaName} from "../lentaname/lentaname"
import {Button} from "../button/button"
import {lentaEditor} from "../lentaeditor/index"
import {Message} from "../message/message"
import {modalwindowAddUsers} from "../modalwindow/index"
import {formResponse} from "../formresponse/index"
import {appEvents} from "../../store/events"
import {appStore} from "../../store/appStore"


export class Lenta extends Component {

    static TEMPLATE = '../app/components/lenta/lenta.html'

    constructor(props: Indexed={}) {
        super({
            template: Lenta.TEMPLATE,
            tagName: 'section',
            style: 'container container_isColumn container_size_auto',
            props: props
        })

        appStore.subscribe(appEvents.SET_CURCHAT, ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }

    render() {
        const currentchat = appStore.getState('currentchat') as Indexed
        this.components = {
            headerleft: [
                new LentaName(currentchat),
            ],
            headerright: [
                new Button({icon:'person_add'}, 'button button_ghost', ()=>{
                    modalwindowAddUsers.show()
                }),
                new Button({icon: 'settings'}, 'button button_ghost', ()=>{
                        lentaEditor.show()
                    }
                )
            ],
            msgList: [
                new Message({})
            ],
            msgSend: [
                formResponse
            ]
        }
        return super.render()
    }
}