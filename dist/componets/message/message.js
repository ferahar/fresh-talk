import { Component } from "../../core/Component.js";
export class Message extends Component {
    constructor(props) {
        super("li", props);
        this.element.setClass("message");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Message.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
Message.TEMPLATE = "../../componets/message/message.html";
//# sourceMappingURL=message.js.map