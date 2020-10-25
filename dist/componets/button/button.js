import { Component } from "../../core/Component.js";
export class Button extends Component {
    constructor(props, events = {}) {
        super("button", props, events);
        this.element.addClass("button");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.renderString(Button.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
Button.TEMPLATE = "{{text}}";
//# sourceMappingURL=button.js.map