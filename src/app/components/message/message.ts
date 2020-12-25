import {Component} from "../../../core/index"


export class Message extends Component {

    static TEMPLATE = '../app/components/message/message.html'

    constructor(props: Indexed) {
        super({
            template: Message.TEMPLATE,
            tagName: 'div',
            props: props
        })

        this.element!.setClass('message')

    }

}