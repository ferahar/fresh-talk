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
    (data: any) => console.log( data )
);

formsLogin.append2( fieldsLogin, 'app-formLogin' )


export const formsRegistr2 = new Forms2(
    {
        props: {
            items: [
                "email",
                "phone",
                "firstname",
                "login",
                "password"
            ],
            button: {
                text: "Зарегистрироваться",
                textlink: "Авторизоваться",
                link: "/login"
            }
        }
    }, 
    fieldsLogin, 
    apiGet2
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