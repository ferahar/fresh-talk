import {Router} from "../router";
import {CompPage} from "./compPage";
import {Store} from "../..";

document.body.innerHTML = '<main id="app-root"></main>'

const routes = [
    {path: '/', component: new CompPage('Start') },
    {path: '/login', component: new CompPage('Login')},
    {path: '/404', component: new CompPage('404')},
]

//@ts-ignore
new Store({},{
    isLogin: 'success'
})

describe('Router test:', ()=>{

    const router = new Router('app-root')
    router.routes = routes
    router.start()

    afterEach(()=>{
        router.go('/')
    })

    test('Page Start path "/"',()=>{
        const pathname = window.location.pathname
        expect(pathname).toBe('/')
    })

    test('Page Login path "/login"',()=>{
        router.go('login')
        const pathname = window.location.pathname
        expect(pathname).toBe('/login')
    })

    test('Page nonexistent path "/nonexistent"',()=>{
        router.go('nonexistent')
        const pathname = window.location.pathname
        expect(pathname).not.toBe('/nonexistent')
    })

    test('Page content should be "Login"',()=>{
        router.go('login')
        const text = document.getElementsByTagName('div')[0].innerHTML
        expect(text).toBe('Login')
    })
})