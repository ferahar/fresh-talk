import { Component } from "../../../core/index.js"



declare var nunjucks: any;

class StartPage extends Component {
    
    static TEMPLATE = `<h1> START PAGE </h1>`

    constructor(config: {}) {
        super( config );
    }
}

export const startPage = new StartPage({
    selector: 'app-start',
    template: StartPage.TEMPLATE
})




  