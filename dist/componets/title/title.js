import { Component } from "../../core/Component.js";
export class Title extends Component {
    constructor(tagname, props) {
        super(tagname, props);
        this.element.addClass("h3");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.renderString(Title.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
Title.TEMPLATE = `{{text}}`;
//# sourceMappingURL=title.js.map