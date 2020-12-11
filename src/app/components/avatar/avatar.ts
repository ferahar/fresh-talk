import { Component } from "../../../core/index"

type Indexed = {
    [key in string]: unknown
}

export class Avatar extends Component {

    static TEMPLATE = '../app/components/avatar/avatar.html'

    constructor(props: Indexed) {
        super({
            template: Avatar.TEMPLATE,
            tagName: 'div',
            props: props
        })
        this.element!.setClass('avatar')
    }


}
