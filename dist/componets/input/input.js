import { Component } from "../../core/Component.js";
export class Input extends Component {
    constructor(props) {
        super("label", props);
        this.element.addClass("form-label");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.renderString(Input.TEMPLATE, {
                label: this.props.text,
                type: this.props.type,
                placeholder: this.props.placeholder,
                name: this.props.name,
                value: this.props.value,
            });
            this.element.html(tmpl);
        }
    }
}
Input.TEMPLATE = `
    {{label}}
    <input class="inputText form-input" type="{{type}}" placeholder="{{placeholder}}" name="{{name}}" value="{{value}}" >
    `;
//# sourceMappingURL=input.js.map