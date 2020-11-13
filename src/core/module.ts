import { Component, Config } from "./component";
import { Router } from "./router/router";


export class Module {

    private components: Component[] | undefined
    private router: Router
    private root: string
    
    constructor(config: Config) {
        this.root = config.root as string
        if (Array.isArray(config.components)) {
            this.components = config.components as Component[]
        }
        this.router = config.router as Router
    }
    
    start() {
        this.initComponents()
        if (this.router) {
            this.router.start()
        }
    }

    private initComponents() {
        if (!this.components) return
        this.components.forEach( (component: Component) => {
            component.renderDom( this.root )
        })

    }

}
