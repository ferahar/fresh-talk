import { Component } from "./component";

type Route = {
    path: string,
    component: Component;
}

export class Router {
    
    private static __instance: Router;
    private _rootQuery = 'app-root'
    private _currentRoute: Component | null = null;

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
          const path = (event.currentTarget as any).location.pathname
          this._onRoute(path);

      }).bind(this);
      this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        console.log('PATH: ', pathname);
        let route = this.getRoute(pathname);
        
        if (this._currentRoute) {
            // this._currentRoute.leave();
        }
        
        // this._currentRoute = route;
        
        // if (route === undefined) {
        //     route = this.getRoute('404')
        // }
        const root = document.querySelector( this._rootQuery )!
        root.innerHTML = `<${route!.component.selector}></${route!.component.selector}>`
        route!.component.render();
    }

    go(pathname: string) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    }

    back() {
      this.history.back();
    }

    forward() {
      this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes!.find(route => route.path.match(pathname));
    }
}