import { Router, DomElement } from "../../../core/index";
import { Component } from "../../../core/component/component"

type Indexed = {
    [key in string]: unknown
}

class StartPage extends Component {

    static TEMPLATE = '../app/pages/start/start.html'

    constructor(config: Indexed = {}) {
        config.template = StartPage.TEMPLATE;
        config.tagName = 'div'
        super( config )
        this.element!.setClass('container')
    }

}

export const startPage = new StartPage()
new Router().initLink( startPage.element as DomElement )