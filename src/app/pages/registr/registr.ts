import { Component, Router, DomElement } from "../../../core/index";
import {formsRegistr2} from "../../components/forms/index"
import {headerReg} from '../../components/header/index'

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
    headerReg,
    formsRegistr2
])

new Router().initLink( registrPage.element as DomElement )




  