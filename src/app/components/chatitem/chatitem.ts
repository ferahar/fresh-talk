import { Component } from "../../../core/component/component"

type Indexed = {
    [key in string]: unknown
}

export class Chatitem extends Component {

    static TEMPLATE = '../app/components/chatitem/chatitem.html'

    constructor(props: Indexed) {
        super({
            template: Chatitem.TEMPLATE,
            tagName: 'li',
            props: props
        })
        this.element!.setClass('chatItem')
    }
}