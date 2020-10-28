import { Component } from "../../core/Component.js";
export class Avatar extends Component {
    constructor(props) {
        super("div", props);
        this.element.setClass("avatar");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Avatar.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
Avatar.TEMPLATE = "../../componets/avatar/avatar.html";
//# sourceMappingURL=avatar.js.map