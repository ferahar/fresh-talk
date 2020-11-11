import { Component, Config } from "../../../core/component.js"
import { formsRegistr2 } from "../../components/forms/forms2.js"
import { header } from '../../components/header/header.js'


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
    selector: 'app-registr',
    components: [
        formsRegistr2
    ]

})




  