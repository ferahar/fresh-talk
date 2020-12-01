import { apiAuth } from "../../api/api-auth"
import { Button } from "./button"


export const buttonLogin = new Button(
    {
        props: {
            title: 'Jerry',
            icon: 'pest_control_rodent'
        }
    },
    'button button_ghost',
    () => apiAsignIn()

)


export const buttonLogout = new Button(
    {
        props: {
            title: 'Выход',
            // icon: 'pest_control_rodent'
        }
    },
    'button button_ghost',
    () => {
        apiAuth.logout()
        .then( 
            data => console.log( (data as XMLHttpRequest).response ),
            error => console.log(error.response)
        )
    }
)

function apiAsignIn() {
    
    console.log('ButtonClick = apiAsignIn' )

    apiAuth.signIn({
            "login": "ferahar",
            "password": "Rozamina25",
    })
    // .then( apiAuth.user, error => {
    //     console.log( error.response )
    // })
    .then( data => {
        console.log( (data as XMLHttpRequest).response )
    } )
}