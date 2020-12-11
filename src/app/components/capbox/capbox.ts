import { Component } from "../../../core/index"

type Indexed = {
    [key in string]: unknown
}

export class Capbox extends Component {

    static TEMPLATE = '../app/components/capbox/capbox.html'

    constructor(props: Indexed) {
        super({
            template: Capbox.TEMPLATE,
            tagName: 'div',
            props: props
        })

        this.element!.setClass('capbox container container_isColumn container_center')

    }

}