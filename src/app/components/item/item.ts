import { Component, Config, Props } from "../../../core/component.js"
import { checkField } from "../../../core/index.js"
import { $ } from "../../../core/DomElement.js"


export class Item extends Component {

    static TEMPLATE = '../app/components/item/item.html'
    
    constructor(config: Config) {
        config.template = Item.TEMPLATE;
        super( config );
    }

    componentDidMount() {
        this.initBlurAndFocus();
    }

    private initBlurAndFocus() {
        const field = this.element!.find('input')
        if (field) {
            field.on('blur', this.checkForm as EventListener, this)
            field.on('keydown', this.clearForm, this)
        }
    }

    private checkField( target: HTMLInputElement): Props {
        return checkField(target)
    }

    private checkForm(e: Event & FocusEvent) {
        
        const props = Object.assign({},this.props)
        const field = e.target as HTMLInputElement
        const checkField: Props = this.checkField(field)
        
        if (checkField.test) {
            props.value = field.value,
            props.error = checkField.message
        } else {
            props.value = field.value,
            props.error = ''
        }
        this.setProps(props)
    }

    private clearForm(e: Event) {
        const field = e.target as HTMLInputElement
        $(field).parent()!.find('span').hide()
        $(field).parent()!.find('span').text('')
        $(field).off('keydown', this.clearForm)
    }

}

export const item = new Item({
    selector: 'app-item',
    props: {
        title: 'API handler',
        icon: 'pest_control_rodent'
    }
})
