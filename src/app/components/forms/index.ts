import { Forms } from './forms.js'

export const formsLogin = new Forms({
    selector: 'app-form-login',
    props: {
        title: "Вход",
        email: {
            value: ''
        },
        psw: {
            value: ''
        },
        button: {
            text: "Авторизоваться",
            textlink: "Регистрация",
            link: "/registr"
        }
    }
});