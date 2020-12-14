import {Component} from "../../../core/index"
import {Button} from "../button/button";

type Indexed = {
    [key in string]: unknown
}

export class Useritem extends Component {

    static TEMPLATE = '../app/components/useritem/useritem.html'

    constructor(props: Indexed) {

        super({
            template: Useritem.TEMPLATE,
            tagName: 'li',
            props: props,
            components: {
                buttonclose: [ new Button({icon: 'close'}, 'button button_ghost')]
            }
        })
        this.element.setClass('chatItem')
        this.element!.attr('date-id', props.id as string)

    }

}
