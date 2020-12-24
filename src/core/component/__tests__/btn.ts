import {Component} from "../component";
import {renderString} from "nunjucks";


export class Btn extends Component {

    static TEMPLATE = `{% if icon %}<i class="material-icons">{{ icon }}</i>{% endif %}{{ title }}`
    private callback: Function | null

    constructor(title: string, callback?: Function) {
        super({
            template: Btn.TEMPLATE,
            tagName: 'button',
            style: 'button',
            props: {
                title
            }
        })

        if (callback && this.element ) {
            this.callback = callback
            this.element.on( 'click', this.callback as EventListener )
        } else {
            this.callback = null
        }
    }

    render() {
        return renderString(this._template, this.props);
    }

}