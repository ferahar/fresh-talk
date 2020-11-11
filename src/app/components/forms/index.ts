import { Forms } from './forms.js'

export const formsLogin = new Forms({
    selector: 'app-form-login',
    props: {
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

export const formsRegistr = new Forms({
    selector: 'app-form-registr',
    props: {
        email: true,
        phone: true,
        firstname: true,
        secondtname: true,
        login: true,
        psw: true,
        button: {
            text: "Зарегистрироваться",
            textlink: "Вход",
            link: "/login"
        }
    }
});

// {
//     "first_name": "John",
//     "second_name": "Rambo",
//     "login": "Rambo1212",
//     "email": "Rambo@mail.xxx",
//     "password": "120280",
//     "phone": "+79348882255"
//   }