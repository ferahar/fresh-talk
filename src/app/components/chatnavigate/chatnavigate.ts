import { Component} from "../../../core/index";
import {ListComponents} from "../../../core/type";


export class Chatnavigate extends Component {

    static TEMPLATE = '../app/components/chatnavigate/chatnavigate.html'

    constructor(components: ListComponents = {}) {
        super({
            tagName: 'aside',
            template: Chatnavigate.TEMPLATE,
            components,
            style: 'chatnavigate container container_isColumn'
        })
    }

}




