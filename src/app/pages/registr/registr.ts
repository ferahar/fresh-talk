import { Component, Router, DomElement } from "../../../core/index";
import {formsRegistr} from "../../components/forms2/index"
import {headerReg} from '../../components/header/index'
import {ListComponents} from "../../../core/type";


class RegistrPage extends Component {
    
    static TEMPLATE = '../app/pages/registr/registr.html'

    constructor(components: ListComponents = {}) {
        super( {
            tagName: 'section',
            components
        } )
        this.element!.setClass('container container_isColumn container_center')
    }

}

export const registrPage = new RegistrPage({
    components: [headerReg, formsRegistr]
})

new Router().initLink( registrPage.element as DomElement )




  