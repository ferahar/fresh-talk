import {Component, Store} from "../../../core/index"

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

        new Store().subscribe('setCurrentChat', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
    }

}
