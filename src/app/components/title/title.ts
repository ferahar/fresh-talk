import { Component } from "../../../core/component/component"

type Indexed = {
    [key in string]: unknown
}

export class Title extends Component {

    static TEMPLATE = '../app/components/title/title.html'

    constructor(config: Indexed) {
        config.template = Title.TEMPLATE;
        super(config)
        this.element!.setClass('h3')
    }

}