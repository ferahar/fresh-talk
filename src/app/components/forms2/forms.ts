import { Component } from "../../../core/index"
import { checkField, checkForm } from "../../../core/util/index"
import { $ } from "../../../core/util/dom-element"

declare var nunjucks: any

type Indexed = {
    [key in string]: unknown
}


export class Forms extends Component {

    static TEMPLATE = "../app/components/forms2/forms.html"

    private callback: Function | null

    constructor(components:Indexed, callback?: Function, listener='submit') {
        const listeners: Indexed = {}
        listeners[listener] = 'onSubmit'
        super({
            template: Forms.TEMPLATE,
            tagName: 'form',
            components: components,
            listeners: listeners
        })

        this.element.setClass('container container_isColumn form')
        this.callback = callback ? callback : null
        this.element.on("blur", checkForm, true)
        this.element.on("focus", clearForm, true)
    }

    onSubmit(e: Event) {
        if (!this.callback) return;
        let flag = true;
        e.preventDefault();
        const fields = this.element.findAll('input')
        if (!fields) return
        fields.forEach((field) => {
            const check = checkField(field.nativeElement as HTMLInputElement)
            const parent = field.parent()
            if (parent && check.test) {
                parent.find('span').show()
                parent.find('span').text(check.message as string)
                flag = false
            }
            else if (parent){
                parent.find('span').hide()
            }
        });
        if (!flag) return
        const form = this.element.nativeElement as HTMLFormElement
        let data = new FormData(form)
        this.callback(data)
    }
}


const clearForm = (e: Event) => {
    const field = $(e.target as HTMLElement)
    const parent = field.parent()
    if (parent) {
        parent.find('span').hide()
        parent.find('span').text('')
    }

}