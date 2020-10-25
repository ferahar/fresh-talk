import { Component } from "../../core/Component.js";
export class Blockerror extends Component {
    constructor(props) {
        super("main", props);
        this.element.setClass("main container container_center");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Blockerror.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
Blockerror.TEMPLATE = "../../componets/blockerror/blockerror.html";
//# sourceMappingURL=blockerror.js.map