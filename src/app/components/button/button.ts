import { Component, Config } from "../../../core/component"

export class Button extends Component {

    static TEMPLATE = '../app/components/button/button.html'
    private callback: Function | null

    constructor(config: Config, callback?: Function, className?: string) {
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
            this.element.on( 'click', this.callback as EventListener, this )
        } else {
            this.callback = null
        }
    }

}