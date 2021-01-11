//@ts-ignore
import template from "./btn.njk"
import './btn.styl'

export function btn() {
    document.body.querySelector('.app')!.innerHTML = template({title: 'Ferahar!'})
}



