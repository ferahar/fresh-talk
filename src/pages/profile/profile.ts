import {Container} from "../../componets/container/container.js"
import {Forms} from "../../componets/forms/index.js"
import {Title} from "../../componets/title/title.js"

export function profilePage(): void {

    const form = new Forms(
        {
            avatar: {
                image: "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
                value: ''
            },
            email: {
                value: "user@mail.ru"
            },
            phone: {
                value: '8(800)959-65-79'
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

    const header = new Container(
        'header',
        [
            new Title({ text: "Профиль"})
        ],
        "header header_themeDark"
    )

    const section = new Container(
        'section',
        [form],
        "form-section container container_size_auto container_centerStart"
    )

    const main = new Container(
        'main',
        [
            header, section
        ],
        "main container container_isColumn"
    )

    
    
    const root = document.getElementById('root')
    root!.appendChild(main.element!.nativeElement as Node)
    
}


profilePage()
