import { Component } from "../../../core/index"
import {Button} from "../button/button"


export class Modalwindow extends Component {

    static TEMPLATE = '../app/components/modalwindow/modalwindow.html'

    constructor(title: string, components:Component[],) {

        super({
            template: Modalwindow.TEMPLATE,
            tagName: 'div',
            props: {
                title
            },
            components: {
                content: components,
                close: [
                    new Button({icon: 'close'}, 'button', ()=>{ this.hide() })
                ]
            },
        })

        this.hide()

    }

    onClick(event: Event) {
        const target = event.target as HTMLElement

        if (target.tagName=='BUTTON') {
            this.hide()
        }
    }

}
