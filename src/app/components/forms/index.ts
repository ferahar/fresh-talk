import { Forms2 } from './forms2'
import { fieldsLogin } from './formFields'
import { apiAuth } from '../../api/api-auth'


export const formsLogin = new Forms2(
    {
        props: {
            button: {
                text: "Авторизоваться",
                textlink: "Зарегистрироваться",
                link: "/registr"
            }
        }
    },
    fieldsLogin,
    'app-formLogin',
    (data: any) => console.log( data )
);

export const formsRegistr2 = new Forms2(
    {
        props: {
            button: {
                text: "Зарегистрироваться",
                textlink: "Авторизоваться",
                link: "/login"
            }
        }
    }, 
    fieldsRegistr,
    'app-formRegistr',
    (data: any) => console.log( data )
);

export const formsLogin2 = new Forms2(
    {
        props: {
            items: [
                "login",
                "password"
            ],
            button: {
                text: "Авторизоваться",
                textlink: "Зарегистрироваться",
                link: "/registr"
            }
        }
    },
    fieldsLogin,
    'app-formRegistr', 
    apiGet
);

function apiGet(data: FormData) {
    for(let [name, value] of data) {
        console.log(`${name} = ${value}`)
    }
    apiAuth.signIn( data ).then( (data) => {
        console.log( 
            (data as XMLHttpRequest).response
         );
    },
    error => {
        console.log(error);
    }
    )
}

function apiGet2(data: FormData) {
    for(let [name, value] of data) {
        console.log(`${name} = ${value}`)
    }
}