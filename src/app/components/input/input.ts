import {Component, Store} from "../../../core/index"

type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Input extends Component {

    static TEMPLATE = '../app/components/item/input.html'

    constructor(props: Indexed) {
        super(
            {
                template: Input.TEMPLATE,
                tagName: 'label',
                props: props,
                listeners: {
                    'submit': 'onSubmit'
                }
            }
        )
        this.element.setClass('form-label')
    }

    render() {
        if (this.props.value || this.props.value !=='') {
            const value = new Store().getState(this.props.value as string)
            const props = Object.assign(this.props, {value})
            return nunjucks.render(this._template, props)
        }
        return nunjucks.render(this._template, this.props)
    }

}
