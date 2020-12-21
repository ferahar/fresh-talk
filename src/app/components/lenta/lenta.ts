import { Component, Store } from "../../../core/index"
import {LentaName} from "../lentaname/lentaname"
import {Button} from "../button/button"
import {lentaEditor} from "../lentaeditor/index"
import {Message} from "../message/message"
import {modalwindowAddUsers} from "../modalwindow/index"
import {formResponse} from "../formresponse/index"


type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Lenta extends Component {

    static TEMPLATE = '../app/components/lenta/lenta.html'

    constructor(props: Indexed={}) {
        super({
            template: Lenta.TEMPLATE,
            tagName: 'section',
            props: props
        })
        this.element.setClass('container container_isColumn container_size_auto')
        new Store().subscribe('setCurrentChat', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }

    render() {
        const currentchat = new Store().getState('currentchat') as Indexed
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

        return nunjucks.render(this._template, this.props)
    }
}