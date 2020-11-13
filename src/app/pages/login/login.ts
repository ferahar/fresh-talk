import { Component, Config } from "../../../core/component"
import { formsLogin } from "../../components/forms/index"

class LoginPage extends Component {
    
    static TEMPLATE = '../app/pages/login/login.html'
    
    constructor(config: Config = {}) {
        config.tagName = 'section'
        super( config );
        this.element!.setClass('container')
    }
}

export const loginPage = new LoginPage()

loginPage.append(formsLogin)
