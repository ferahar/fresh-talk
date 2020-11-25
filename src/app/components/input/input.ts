import { Component } from "../../../core/component/component"
import { checkField } from "../../../core/index.js"
import { Title } from "../title/title.js"

type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Input extends Component {

    static TEMPLATE = '../app/components/item/item.html';

    private boundFunc: Function
    private keyFunc: Function
    errorText: Title

    constructor(config: Indexed) {
        config.template = Input.TEMPLATE;
        config.tagName = 'label';
        super(config);
        this.element.setClass('form-label');
        this.boundFunc = new Function
        this.keyFunc = new Function
        this.errorText = this.initTextError();
        this.append([this.errorText])
    }

    initTextError() {
        const errorText = new Title({
            props: {
                title: 'Error text'
            },
            tagName: 'span'
        })
        errorText.element.setClass('form-textErorr')
        errorText.hide()
        return errorText
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.initBlurAndFocus;
    //     }, 0)
    // }
    render() {
        return nunjucks.render(this._template, this.props)
    }

    initBlurAndFocus() {
        const field = this.element.find('input');
        if (field) {
            this.boundFunc = (e: Event) => {
                checkForm(e, this)
            }
            field.nativeElement!.addEventListener('blur', this.boundFunc as EventListener)
            this.keyFunc = this.clearForm.bind(this)
            field.on('focus', this.keyFunc as EventListener)
        }
    }

    clearForm() {
        this.errorText.hide();
    }
}

const checkForm = (e:Event, self: Input) => {
    const field = e.target as HTMLInputElement
    const check = checkField(field)
    if (check.test) {
        self.errorText.setProps({
            title: check.message
        })
        self.errorText.show()
    }
    else {
        self.errorText.hide()
    }
}