import {Component} from "../../../core/component/component"


export class Button extends Component {

    static TEMPLATE = '../app/components/button/button.html'
    private callback: Function | null

    constructor(props: Indexed, className?: string, callback?: Function) {
        super({
            template: Button.TEMPLATE,
            tagName: 'button',
            props: props
        })

        if (className) {
            this.element!.setClass(className)
        } else {
            this.element!.setClass('button')
        }
        
        if (callback && this.element ) {
            this.callback = callback
            this.element.on( 'click', this.callback as EventListener )
        } else {
            this.callback = null
        }
    }

}