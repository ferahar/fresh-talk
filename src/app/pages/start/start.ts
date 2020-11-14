import { Router, DomElement } from "../../../core/index";
import { Component, Config } from "../../../core/component"


class StartPage extends Component {

    static TEMPLATE = '../app/pages/start/start.html'

    constructor(config: Config = {}) {
        config.template = StartPage.TEMPLATE;
        config.tagName = 'div'
        super( config );
        this.element!.setClass('container')
    }

}

export const startPage = new StartPage()
new Router().initLink( startPage.element as DomElement )