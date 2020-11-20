import { Component, Router, DomElement } from "../../../core/index";
import {formsLogin} from "../../components/forms/index"
import {header} from '../../components/header/header'

type Indexed = {
    [key in string]: unknown
}

class RegistrPage extends Component {
    
    static TEMPLATE = '../app/pages/registr/registr.html'

    constructor(config: Indexed = {}) {
        config.tagName = 'section'
        super( config )
        this.element!.setClass('container container_isColumn container_center')
    }

}

export const registrPage = new RegistrPage()

registrPage.append([
    header,
    formsLogin
])

new Router().initLink( registrPage.element as DomElement )




  