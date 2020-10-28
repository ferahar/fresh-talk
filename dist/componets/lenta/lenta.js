import { Component } from "../../core/Component.js";
export class Lenta extends Component {
    constructor(props) {
        super("article", props);
        this.element.setClass("lenta container container_size_auto container_isColumn");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Lenta.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
Lenta.TEMPLATE = "../../componets/lenta/lenta.html";
//# sourceMappingURL=lenta.js.map