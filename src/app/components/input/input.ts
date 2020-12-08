import {Component, Store} from "../../../core/index"

type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class Input extends Component {

    static TEMPLATE = '../app/components/input/input.html'

    constructor(props: Indexed) {
        super(
            {
                template: Input.TEMPLATE,
                tagName: 'label',
                props: props,
            }
        )
        this.element.setClass('form-label')
        if (this.props.store) {
            // new Store().subscribe(Store.EVENTS.STATE_CHANGE, ()=> {
            new Store().subscribe('setProfile', ()=> {
                this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
            } )
        }
    }

    render() {
        if (this.props.store) {
            const props = Object.assign({},this.props)
            if (this.props.image) {
                props.avatar = new Store().getState(this.props.store as string)
            } else {
                props.value = new Store().getState(this.props.store as string)
            }
            return nunjucks.render(this._template, props)
        }
        return nunjucks.render(this._template, this.props)
    }

}
