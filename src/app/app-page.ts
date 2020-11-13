import { Component, Config } from '../core/Component'

class AppPage extends Component {
    constructor(config: Config = {}) {
        config.tagName = 'main'
        super(config)
        if ( this.element ) {
            this.element.setClass("container container_centerStart")
            this.element.attr("id","app-page")
        }
    }
}

export const appPage = new AppPage()