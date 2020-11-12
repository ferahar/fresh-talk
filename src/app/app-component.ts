import { Component, Config } from "../core/component"


declare var nunjucks: any;

class AppComponent extends Component {
    
    static TEMPLATE = '../app/app-index.html'

    constructor(config: Config) {
        config.template = AppComponent.TEMPLATE;
        super( config );
    }
  
}

export const appComponent = new AppComponent({
    selector: 'app-root',
})