import {Component} from "../../../core/index"
import {appStore} from "../../store/appStore"

type Indexed = {
    [key in string]: unknown
}

export class LentaName extends Component {

    static TEMPLATE = '../app/components/lentaname/lentaname.html'

    constructor(props: Indexed) {

        super({
            template: LentaName.TEMPLATE,
            tagName: 'div',
            props: props
        })
        this.element.setClass('chatItem')

        appStore.subscribe(['setCurrentChat', 'setChats'], ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }

}
