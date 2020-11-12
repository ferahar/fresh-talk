import { Forms2 } from './forms2'
import { apiAuth } from '../../api/api-auth'

export const formsRegistr2 = new Forms2({
    selector: 'app-form-registr',
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
}, apiGet2);

export const formsLogin = new Forms2({
    selector: 'app-form-SignIn',
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