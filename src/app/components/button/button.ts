import { Component } from "../../../core/component/component"

type Indexed = {
    [key in string]: unknown
}

export class Button extends Component {

    static TEMPLATE = '../app/components/button/button.html'
    private callback: Function | null

    constructor(config: Indexed, callback?: Function, className?: string) {
        config.template = Button.TEMPLATE;
        config.tagName = 'button'
        super(config)
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