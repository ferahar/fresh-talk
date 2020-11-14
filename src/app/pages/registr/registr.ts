import { Component, Config } from "../../../core/component"
import { Router, DomElement } from "../../../core/index";
import { formsRegistr2 } from "../../components/forms/index"
import { header } from '../../components/header/header'


class RegistrPage extends Component {
    
    static TEMPLATE = '../app/pages/registr/registr.html'
    
    constructor(config: Config) {
        
        config.template = RegistrPage.TEMPLATE;
        super( config );
    }
    
    componentDidMount() {
        header.setProps( {
            title: 'Регистрация'
        } )
    }
}

export const registrPage = new RegistrPage({
    components: [
        formsRegistr2
    ]

})

new Router().initLink( registrPage.element as DomElement )




  