import { Component } from "./component.js";
import { $ } from "./DomElement.js"

type Route = {
    path: string,
    component: Component;
}

export class Router {
    
    private static __instance: Router;
    private _rootQuery = 'app-root'

    history = window.history;
    routes: Route[] | undefined = []
    
    
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(path: string, component: Component) {
        
        if (this.routes) {
            this.routes.push({
                path: path, component: component
            });    
        }
        
        return this
    }

    start() {
        window.onpopstate = ((event: Event) => {
            if (!event.currentTarget) return
            this._onRoute( location.pathname )
        }).bind(this);
        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        
        if (route === undefined) {
            route = this.getRoute('404')
        }

        const root = document.getElementById( this._rootQuery )!
        root.innerHTML = ''
        const page = document.createElement( 'div' )
        page.id = route!.component.selector
        root.append(page)
        if (route !== undefined) {
            route.component.eventBus.emit(Component.EVENTS.INIT)
            route.component.eventBus.emit(Component.EVENTS.FLOW_RENDER)
            // route.component.element?.findAll('[href]')!.forEach(e => {
            //     e.on('click', this.onClick, this)
            // })
        }
        document.querySelectorAll('[href]')!.forEach(e => {
            e.addEventListener('click', this.onClick.bind(this))
        })
    }

    go(pathname: string) {
      this.history.pushState({ path: pathname }, "", pathname);
      this._onRoute(pathname);
    }

    back() {
      this.history.back();
    }

    forward() {
      this.history.forward()
    }

    getRoute(path: string) {
        if (path) {
            return this.routes!.find(route => route.path.match(path as any));    
        } else return undefined   
    }

    onClick(event: Event) {
        event.preventDefault();
        const target = $(event.target as HTMLElement)
        const href = target.attr('href')
        if (href) {
            this.go(href as string)    
        }
    }
}