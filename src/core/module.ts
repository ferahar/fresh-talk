import { Component } from "./component.js";
import { Router } from "./router.js";

type Config = {
    [key in string]: Component[] | Component | Router;
};

export class Module {
    
    private components: Component[] | undefined
    private main: Component
    private router: Router
    
    constructor(config: Config) {
        if (Array.isArray(config.components)) {
            this.components = config.components    
        }
        
        this.main = config.main as Component
        this.router = config.router as Router

        
    }
    
    start() {
        this.initComponents()
        if (this.router) {
            this.initRoutes()
        } 
    }

    initComponents() {
        this.main.render()
        if (!this.components) return
        this.components.forEach( this.renderComponent.bind(this) );
    }

    initRoutes() {
        this.router.start()
    }

    renderComponent(component: Component) {
        component.render()
    }

}
