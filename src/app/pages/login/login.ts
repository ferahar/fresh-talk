import { Component, Config } from "../../../core/component"
import { formsLogin } from "../../components/forms/index"
import { header } from '../../components/header/header'


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
    selector: 'app-signIn',
    props: {
        title: 'Forms'
    },
    components: [
        formsLogin
    ]

})



  