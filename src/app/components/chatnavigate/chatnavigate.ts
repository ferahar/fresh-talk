import { Component} from "../../../core/index";


type Indexed = {
    [key in string]: unknown
}

export class Chatnavigate extends Component {

    static TEMPLATE = '../app/components/chatnavigate/chatnavigate.html'

    constructor(components: Indexed = {}) {
        super({
            tagName: 'aside',
            template: Chatnavigate.TEMPLATE,
            components
        })
        this.element.setClass('chatnavigate container container_isColumn')
    }

}




