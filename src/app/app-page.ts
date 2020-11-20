import { Component, Config } from '../core/component/component'

class AppPage extends Component {
    constructor(config: Config = {}) {
        config.tagName = 'main'
        super(config)
        if ( this.element ) {
            this.element.setClass("container")
            this.element.attr("id","app-page")
        }
    }
}

export const appPage = new AppPage()