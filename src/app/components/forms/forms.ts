import { Component } from "../../../core/index"
import { checkField, checkForm } from "../../../core/util/index"
import { $ } from "../../../core/util/dom-element"

declare var nunjucks: any

type Indexed = {
    [key in string]: unknown
}


export class Forms extends Component {

    static TEMPLATE = "../app/components/forms/forms.html"

    private callback: Function

    constructor(config:Indexed, callback: Function) {
        config.template = Forms.TEMPLATE
        config.tagName = 'form'
        config.listeners = {
            'submit': 'onSubmit'
        }
        super(config)

        this.element.setClass('container container_isColumn form form_themeLogin')
        this.callback = callback
        this.element.on("blur", checkForm, true)
        this.element.on("focus", clearForm, true)
    }

    render() {
        if (this._store) {
            // const state = JSON.parse(this._store.getState('profile'))
            // setForm(this.props['fields'], state)
        }
        return nunjucks.render(this._template, this.props)
    }

    onSubmit(e: Event) {
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