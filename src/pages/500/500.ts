import {Blockerror} from "../../componets/blockerror/blockerror.js"

export function loginPage(): void {

    const blockerror = new Blockerror({
        title: "500",
        message: "Мы уже фиксим"
    })

    const root = document.getElementById('root')
    root!.appendChild(blockerror.element!.nativeElement as Node)
}


loginPage()