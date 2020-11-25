import { Component,Router, DomElement } from "../../../core/index"
import { headerLogin } from "../../components/header/index"
import { formsLogin } from "../../components/forms/index"


type Indexed = {
    [key in string]: unknown
}

class LoginPage extends Component {

    constructor(config: Indexed = {}) {
        config.tagName = 'section'
        super( config )
        this.element!.setClass('container container_isColumn container_center')
    }
}

export const loginPage = new LoginPage()

loginPage.append([
    headerLogin,
    formsLogin
])

new Router().initLink( loginPage.element as DomElement )
