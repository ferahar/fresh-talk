import { Component } from "../../../core/index.js"


declare var nunjucks: any;

class LoginPage extends Component {
    
    static TEMPLATE = `<h1> Login PAGE </h1>`

    constructor(config: {}) {
        super( config );
    }
}

export const loginPage = new LoginPage({
    selector: 'app-login',
    template: LoginPage.TEMPLATE
})




  