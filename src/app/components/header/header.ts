import { Component } from "../../../core/index"

type Indexed = {
    [key in string]: unknown
}

export class Header extends Component {

    static TEMPLATE = '../app/components/header/header.html'
    private callback: Function | null

    constructor(config:Indexed = {}, callback: Function | null = null) {

        config.template = Header.TEMPLATE
        config.tagName = 'header'
        config.listeners = {
            'click': 'click'
        }

        super(config)
        this.callback = callback
        this.element.setClass('header header_themeDark')
    }
    click(e: Event) {
        if (this.callback)
            this.callback(e)
    }
}
