import { Component } from "../component/component";
import { Store } from "../store/store";
import { $, DomElement } from "../util/dom-element"


type Route = {
    path: string,
    component: Component;
}

export class Router {

    private static __instance: Router;
    private _rootQuery = 'app-root'
    private disablePath = [
        '/login',
        '/registr',
    ]

    history = window.history;
    routes: Route[] | undefined = []


    constructor(rootQuery?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        if (rootQuery) {
            this._rootQuery = rootQuery
        }
        Router.__instance = this;
    }

    use(path: string, component: Component) {

        if (this.routes) {
            this.routes.push({
                path: path,
                component: component
            });
        }

        return this
    }

    start() {
        window.onpopstate = ((event: Event) => {
            if (!event.currentTarget) return
            this._onRoute( location.pathname )
        }).bind(this);

        const isLogin = new Store().getState('isLogin')
        const pathname = window.location.pathname
        if (!isLogin && pathname!=='/login' && pathname!=='/registr') {
            this.go('/login')
            return
        } else if (isLogin && (pathname ==='/login' || pathname ==='/registr')) {
            this.go('/')
            return
        }
        this._onRoute(pathname);
    }

    private _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        const isLogin = new Store().getState('isLogin')

        if (!isLogin && pathname!=='/login' && pathname!=='/registr') {
            this.go('/login')
            return
        }

        if (route === undefined && this.getRoute('/404')) {
            this.go('/404')
            return
        }

        if (isLogin && this.checkPath(pathname)) {
            this.go('/')
            return
        }

        const root = document.getElementById( this._rootQuery )!
        root.innerHTML = ''

        if (route !== undefined) {
            // root.innerHTML = route.component.element!.nativeElement!.innerHTML
            root.appendChild( route.component.element!.nativeElement as HTMLElement )
        }

    }

    private checkPath(path: string): boolean {
        return !!this.disablePath.find( element => element === path )
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
        if (path && this.routes) {
            return this.routes.find(route => route.path.match(path as any))
        } else return undefined
    }

    initLink(node: DomElement) {
        node.findAll('[href]')!.forEach(e => {
            e.on('click', this.onClick.bind(this))
        })
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