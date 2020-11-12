import { apiAuth } from "../../api/api-auth"
import { Button } from "./button"


export const button = new Button(
    {
        selector: 'app-buttonLogin',
        props: {
            title: 'API handler',
            icon: 'pest_control_rodent'
        }
    },
    apiAsignIn
)

export const buttonLogout = new Button(
    {
        selector: 'app-buttonLogout',
        props: {
            title: 'Выход',
            // icon: 'pest_control_rodent'
        }
    },
    () => {
        apiAuth.logout()
        .then( 
            data => console.log( (data as XMLHttpRequest).response ),
            error => console.log(error.response)
        )
    }
)

function apiAsignIn() {
    
    console.log('ButtonClick = apiAsignIn' );

    apiAuth.signIn({
            "login": "Rambo1212",
            "password": "120280",
    })
    .then( apiAuth.user, error => {
        console.log( error.response );
    })
    .then( data => {
        console.log( (data as XMLHttpRequest).response )
    } )
}