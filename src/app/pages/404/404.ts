import {Component, Router, DomElement} from "../../../core/index"


class Page404 extends Component {

    static TEMPLATE = '../app/pages/404/404.html'

    constructor(props: Indexed) {

        super( {
            tagName: 'section',
            template: Page404.TEMPLATE,
            props
        } );
        this.element!.setClass('msgSys')
    }
}

export const page404 = new Page404({
    title: "404",
    message: "Ложки не существует"
})


new Router().initLink( page404.element as DomElement )