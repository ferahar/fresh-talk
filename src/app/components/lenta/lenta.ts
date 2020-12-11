import { Component, Store } from "../../../core/index"
import {LentaName} from "../lentaname/lentaname";
import {Button} from "../button/button";


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
            headerLenta: [
                new LentaName(currentchat),
                new Button({icon: 'settings'}, 'button button_ghost', ()=>{
                    console.log('Chat edit')})
            ]
        }

        return nunjucks.render(this._template, this.props)
    }
}