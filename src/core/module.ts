import { Component } from "./component";
import { Router } from "./router";

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
            this.router.start()
        }
    }

    private initComponents() {
        this.main.render()
        if (!this.components) return
        this.components.forEach( (component: Component) => {
            component.eventBus.emit(Component.EVENTS.FLOW_RENDER)
            // component.render()
        })

    }

}
