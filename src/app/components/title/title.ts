import { Component, Config } from "../../../core/component"

export class Title extends Component {

    static TEMPLATE = '../app/components/title/title.html'

    constructor(config: Config) {
        config.template = Title.TEMPLATE;
        super(config)
        this.element!.setClass('h3')
    }

}