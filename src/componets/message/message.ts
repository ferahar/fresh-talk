import {Component} from "../../core/Component.js"

declare var nunjucks: any;
interface Props {
    [index: string]: string | {} | number | boolean | undefined 
}

export class Message extends Component {
    static TEMPLATE = "../../componets/message/message.html"

    constructor(props: Props) {
        super("li", props);
        this.element!.setClass("message")
    }
    
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Message.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }

}
