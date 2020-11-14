import { Component, Config } from "../../../core/component"
import { Router, DomElement } from "../../../core/index";
import { formsLogin } from "../../components/forms/index"
import { headerLogin } from "../../components/header/header"


class LoginPage extends Component {
    
    static TEMPLATE = '../app/pages/login/login.html'
    
    constructor(config: Config = {}) {
        config.tagName = 'section'
        super( config );
        this.element!.setClass('container container_isColumn container_center')
    }
}

export const loginPage = new LoginPage()

loginPage.append2([
    headerLogin,
    formsLogin,
])

new Router().initLink( loginPage.element as DomElement )
