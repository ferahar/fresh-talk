import {Blockerror} from "../../componets/blockerror/blockerror.js"

export function systemPage(): void {

    const blockerror = new Blockerror({
        title: "404",
        message: "Ложки не существует"
    })

    const root = document.getElementById('root')
    root!.appendChild(blockerror.element!.nativeElement as Node)
}


systemPage()