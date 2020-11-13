import { Component, Config, Props } from "../../../core/component"
import { checkField } from "../../../core/index"
import { Item } from "../item/item"


export class Forms2 extends Component {

    static TEMPLATE = "../app/components/forms/forms2.html"
    callback: Function
    
    constructor(config: Config, components:Component[], callback: Function) {
        config.template = Forms2.TEMPLATE;
        config.tagName = 'form'
        config.listeners = {
            'submit': 'onSubmit'
        }
        super( config );
        this.element!.setClass('container container_isColumn form form_themeLogin')
        this.components = components
        this.callback = callback
    }

    private checkField( target: HTMLInputElement): Props {
        return checkField(target)
    }

    onSubmit(e: Event) {
        let flag = true
        e.preventDefault();
        const fields = this.components

        fields!.forEach( (el: Item | Component) => {
            const field = el.element!.find('input').nativeElement as HTMLInputElement
            const checkField: Props = this.checkField(field)
            if (checkField.test) {
                (el as Item).errorText.setProps({
                    title: checkField.message
                });
                (el as Item).errorText.show()
                flag = false
            } else {
                (el as Item).errorText.hide()
            }
        });

        if (!flag) return

        const form = this.element!.nativeElement
        let data = new FormData(form as HTMLFormElement)
        this.callback(data)
    }

}
