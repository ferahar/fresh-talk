import { Component } from "../../core/Component.js";
export class Chat extends Component {
    constructor(props) {
        super("li", props, {
            'submit': 'onSubmit'
        });
        this.element.setClass("chatItem");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Chat.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }
}
Chat.TEMPLATE = "../../componets/chat/chat.html";
//# sourceMappingURL=chat.js.map