import {Component, Router, DomElement} from "../../../core/index"
import {formsRegistr} from "../../components/forms2/index"
import {headerReg} from '../../components/header/index'
import {ListComponents} from "../../../core/type"


class RegisterPage extends Component {
    
    static TEMPLATE = '../app/pages/register/register.html'

    constructor(components: ListComponents = {}) {
        super( {
            tagName: 'section',
            components
        } )
        this.element!.setClass('container container_isColumn container_center')
    }

}

export const registerPage = new RegisterPage({
    components: [headerReg, formsRegistr]
})

new Router().initLink( registerPage.element as DomElement )




  