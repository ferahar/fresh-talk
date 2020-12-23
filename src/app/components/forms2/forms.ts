import {Component} from "../../../core/index"
import { checkField, checkForm } from "../../../core/util/index"
import { $ } from "../../../core/util/dom-element"



export class Forms extends Component {

    static TEMPLATE = "../app/components/forms2/forms.html"

    private callback: Function | null
    private verification  = true

    validation:boolean = false
    constructor(components:{[key in string]: Component[]}, callback: Function | null = null, listener='submit', verification:boolean = true) {

        super({
            template: Forms.TEMPLATE,
            tagName: 'form',
            components,
        })
        this.element.setClass('container container_isColumn form')
        this.callback = callback
        this.element.on(listener, this.onSubmit.bind(this), true)
        this.verification = verification
        if (verification) {
            this.element.on("blur", checkForm, true)
            this.element.on("focus", clearForm, true)
        }
    }

    onSubmit(e: Event) {
        e.preventDefault()
        if (!this.callback) return
        if (this.verification) {

            this.validation = true
            const fields = this.element.findAll('input')
            if (!fields) return
            fields.forEach((field) => {
                const check = checkField(field.nativeElement as HTMLInputElement)
                const parent = field.parent()
                if (parent && check.test) {
                    parent.find('span').show()
                    parent.find('span').text(check.message as string)
                    this.validation = false

                } else if (parent) {
                    parent.find('span').hide()
                    this.validation = true
                }
            });
            if (!this.validation ) return
        }

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