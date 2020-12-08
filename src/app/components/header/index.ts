import { Router, Store } from "../../../core/index";
import { apiAuth } from "../../api/api-auth";
import { Header } from "./header";


export const headerLogin = new Header({
    props: {
        title: "Вход",
    },
});

export const headerReg = new Header({
    props: {
        title: "Регистрация"
    }
});

export const headerProfile = new Header({
    props: {
        title: "Профиль",
        logout: {
            text: 'Выход',
            action: 'logout'
        },
    },
}, headerClick);

function headerClick(event: Event) {
    let action = (event.target as HTMLElement).dataset.action
    if (action === 'logout') {
        const store = new Store()
        store.dispatch(Store.EVENTS.LOGOUT)
        const isLogin = store.getState('isLogin')
        console.log('isLogin=', isLogin)
        apiAuth.logout()
            .then(data => {
                console.log((data as XMLHttpRequest).response)
                store.dispatch(Store.EVENTS.LOGOUT)
                new Router().go('/login')
            }, error => console.log(error.response))
    }
}