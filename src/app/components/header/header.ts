import { Component } from "../../../core/index"


export class Header extends Component {

    static TEMPLATE = '../app/components/header/header.html'

    constructor(title:string = '', components:{[key in string]: Component[]} = {}) {

        super({
            template: Header.TEMPLATE,
            tagName: 'header',
            props: {title:title},
            components
        })
        this.element.setClass('header header_themeDark')
    }
}
