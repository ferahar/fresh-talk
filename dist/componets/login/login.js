import { Component } from "../../core/Component.js";
export class Login extends Component {
    constructor(props) {
        super("main", props);
    }
    render() {
        if (this.props) {
            return nunjucks.render("../../componets/login/login.html", { text: this.props.text });
        }
        return "null";
    }
}
//# sourceMappingURL=login.js.map