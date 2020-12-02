import { Component, Router, DomElement } from "../../../core/index";
import {formsRegistr} from "../../components/forms2/index"
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
    formsRegistr
])

new Router().initLink( registrPage.element as DomElement )




  