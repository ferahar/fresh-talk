import { Component } from "../../core/Component.js";
import { Chat } from "../../componets/chat/chat.js";
export class Chatlist extends Component {
    constructor(props) {
        super("aside", props);
        this.element.setClass("chat");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Chatlist.TEMPLATE, this.props);
            this.element.html(tmpl);
            const posts = this.props.posts;
            posts.forEach(post => {
                this.append([
                    new Chat(post)
                ]);
            });
        }
    }
}
Chatlist.TEMPLATE = "../../componets/chatllist/chatlist.html";
//# sourceMappingURL=chatlist.js.map