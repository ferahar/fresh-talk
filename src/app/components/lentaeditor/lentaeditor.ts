import { Component, Store } from "../../../core/index"
import {Button} from "../button/button";


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
        this.element.setClass('container container_isColumn container_size_auto')
        new Store().subscribe('setCurrentChat', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )
        this.hide()
    }

    render() {
        // const currentchat = new Store().getState('currentchat') as Indexed
        this.components = {
            headerLenta: [
                new Button({title: 'Скрыть'}, 'button button_ghost', ()=>{
                    this.hide()
                    })
            ]
        }

        return nunjucks.render(this._template, this.props)
    }
}