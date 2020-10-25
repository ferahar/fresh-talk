import {Container} from "../../componets/container/container.js"
import {Forms} from "../../componets/forms/forms.js"

export function loginPage(): void {

    const root = document.getElementById('root')

    const form = new Forms({
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
            link: "#"
        }
    })
    form.element!.addClass("form_themeLogin")

    const main = new Container(
        'main',
        [form],
        "main container container_centerStart"
    )

    root!.appendChild(main.element!.nativeElement as Node)
}


loginPage()