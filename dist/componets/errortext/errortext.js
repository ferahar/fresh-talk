import { Component } from "../../core/Component.js";
export class ErrorText extends Component {
    constructor(props) {
        super("span", props);
        this.element.addClass("form-textErorr");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.renderString(ErrorText.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
ErrorText.TEMPLATE = `{{text}}`;
//# sourceMappingURL=errortext.js.map