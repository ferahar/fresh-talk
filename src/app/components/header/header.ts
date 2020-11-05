import { Component } from "../../../core/component.js"
import { router } from "../../app-routes.js"
import { $ } from "../../../core/DomElement.js"
import { Router } from '../../../core/router.js'


type Config = {
    [key in string]: Component[] | Component | Router | string | {};
};

declare var nunjucks: any;

class Header extends Component {
    
    static TEMPLATE = `<h3>HEADER <a href="/login">Login</a> </h3>`

    constructor(config: Config) {
        config.listeners = {
            'click': 'onClick'
        }
        super( config );
    }

    onClick(event: Event) {
        event.preventDefault();
        const target = $(event.target as HTMLElement)
        const href = target.attr('href')
        if (href) {
            console.log(href);
            router.go(href as string)    
        }
        
    }

}

export const header = new Header({
    selector: 'app-header',
    template: Header.TEMPLATE
})




  