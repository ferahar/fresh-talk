import { Component } from "../../core/Component.js";
import { Button } from "../../componets/button/button.js";
export class Blockerror extends Component {
    constructor(props) {
        super("section", props, {
            "click": 'demoClickButton'
        });
        this.element.setClass("msgSys");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Blockerror.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
        const button = new Button({ text: "Назад к чатам" });
        button.element.setClass("button button_primary");
        this.append([button]);
    }
    demoClickButton(e) {
        const target = e.target;
        if (target.tagName === "BUTTON") {
            console.log(this.props);
        }
    }
}
Blockerror.TEMPLATE = "../../componets/blockerror/blockerror.html";
//# sourceMappingURL=blockerror.js.map