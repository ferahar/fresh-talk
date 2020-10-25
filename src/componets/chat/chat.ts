import {Component} from "../../core/Component.js"

declare var nunjucks: any;
interface Props {
    [index: string]: string | {} | number | boolean | undefined 
}

export class Chat extends Component {
    static TEMPLATE = "../../componets/chat/chat.html"

    constructor(props: Props) {
        super("li", props, {
            'submit': 'onSubmit'
        });
        this.element!.setClass("chatItem")
    }
    
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Chat.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }

}
