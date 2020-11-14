import { Component, Config } from "../../../core/component"
import { Router, DomElement } from "../../../core/index";


class Page404 extends Component {

    static TEMPLATE = '../app/pages/404/404.html'

    constructor(config: Config) {
        config.template = Page404.TEMPLATE;
        config.tagName = 'section'
        super( config );
        this.element!.setClass('msgSys')
    }
}

export const page404 = new Page404({
    props: {
        title: "404",
        message: "Ложки не существует"
    }
})


new Router().initLink( page404.element as DomElement )