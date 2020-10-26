import {Container} from "../../componets/container/container.js"
import {Forms} from "../../componets/forms/forms.js"
import {Title} from "../../componets/title/title.js"

export function profilePage(): void {

    const root = document.getElementById('root')

    const form = new Forms(
        {
            title: "Профиль",
            avatar: {
                image: "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
                value: ''
            },
            email: {
                value: "user@mail.ru"
            },
            phone: {
                value: '8-937-888-888-888'
            },
            firstname: {
                value: 'John'
            },
            secondtname: {
                value: 'Rambo'
            },
            displayname: {
                value: 'Kiti'
            },
            pswold: {

            },
            pswnew: {

            },
            button: {
                text:"Сохранить",
                textlink: "Выход",
                link: "#"
            }
        }
    )

    const header = new Container('header')
    header.element!.setClass("header header_themeDark")
    header.addComponent([
        new Title({ text: "Профиль"})
    ])

    const main = new Container(
        'main',
        [form],
        "main container container_centerStart"
    )

    root!.appendChild(main.element!.nativeElement as Node)
    
}


profilePage()