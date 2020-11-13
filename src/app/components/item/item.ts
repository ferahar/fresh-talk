import { Component, Config } from "../../../core/component"
import { Props } from "../../../core/component"
import { checkField } from "../../../core/index"
import { Title } from "../title/title"


export class Item extends Component {

    static TEMPLATE = '../app/components/item/item.html'
    boundFunc: Function
    keyFunc: Function
    errorText: Title
    
    constructor(config: Config) {
        config.template = Item.TEMPLATE;
        config.tagName = 'label'
        super( config )
        this.element!.setClass( 'form-label' )
        this.boundFunc = () => {}
        this.keyFunc = () => {}
        this.errorText = this.initTextError()
        this.append( this.errorText )
    }

    initTextError(): Component {
        const errorText = new Title({
            props: {
                title: 'Error text'
            },
            tagName: 'span'
        })
        errorText.element!.setClass( 'form-textErorr' )
        errorText.hide()
        return errorText
    }

    componentDidMount() {
        setTimeout(() => {
            this.initBlurAndFocus()
        }, 0);
    }

    private initBlurAndFocus() {
        const field = this.element!.find('input')
        if (field) {
            this.boundFunc = (e: FocusEvent) => {
                checkForm(e, this)
            }
            field.nativeElement!.addEventListener('blur', this.boundFunc as EventListener)
            this.keyFunc = this.clearForm.bind(this)
            field.on('focus', this.keyFunc as EventListener)
        }
    }

    private clearForm() {
        this.errorText.hide()
    }

}


const checkForm = (e: Event & FocusEvent, self: Item) => {

    const field = e.target as HTMLInputElement
    const check: Props = checkField(field)

    if (check.test) {
        self.errorText.setProps({
            title: check.message
        })
        self.errorText.show()
    } else {
        self.errorText.hide()
    }

}

