import { Component } from "../../core/Component.js";
export class Button extends Component {
    constructor(props) {
        super("button", props, {
            'click': 'onClick'
        });
        this.element.addClass("button");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.renderString(Button.TEMPLATE, {
                text: this.props.text
            });
            this.element.html(tmpl);
        }
    }
    onClick(e) {
        e.preventDefault();
        console.log(this);
        alert(this.props.text);
    }
}
Button.TEMPLATE = "{{text}}";
//# sourceMappingURL=button.js.map