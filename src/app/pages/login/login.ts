import { Component, Config } from "../../../core/component.js"
import { formsLogin } from "../../components/forms/index.js"
import { header } from '../../components/header/header.js'


class LoginPage extends Component {
    
    static TEMPLATE = '../app/pages/login/login.html'
    
    constructor(config: Config) {
        
        config.template = LoginPage.TEMPLATE;
        super( config );
    }
    
    componentDidMount() {
        header.setProps( {
            title: 'Login'
        } )
    }
}

export const loginPage = new LoginPage({
    selector: 'app-login',
    props: {
        title: 'Forms'
    },
    components: [
        formsLogin
    ]

})




  