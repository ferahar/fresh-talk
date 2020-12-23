import { Component } from "../../../core/index"
import { headerLogin } from "../../components/header/index"
import {formsLogin2} from "../../components/forms2/index";
import {ListComponents} from "../../../core/type";


class LoginPage extends Component {

    constructor(components: ListComponents = {}) {
        super( {
            tagName: 'section',
            components
        } )
        this.element!.setClass('container container_isColumn container_center')
    }
}

export const loginPage = new LoginPage({
    components: [ headerLogin, formsLogin2]
})
