import { Component } from "../../../core/index"

type Indexed = {
    [key in string]: unknown
}

export class Header extends Component {

    static TEMPLATE = '../app/components/header/header.html'

    constructor(title:string = '', components:Indexed = {}) {

        super({
            template: Header.TEMPLATE,
            tagname: 'header',
            props: {title:title},
            components: components
        })
        this.element.setClass('header header_themeDark')
    }
}
