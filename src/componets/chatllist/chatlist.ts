import {Component} from "../../core/Component.js"
import {Chat} from "../../componets/chat/chat.js"

declare var nunjucks: any;
interface Props {
    [index: string]: string | {} | number | boolean | undefined 
}

export class Chatlist extends Component {
    static TEMPLATE = "../../componets/chatllist/chatlist.html"

    constructor(props: Props) {
        super("aside", props);
        this.element!.setClass("chat")
    }
    
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Chatlist.TEMPLATE, this.props);
            this.element.html(tmpl);
            const posts = this.props.posts as []
            posts.forEach( post => {
                this.append([
                    new Chat(post)
                ])
            })
        }
    }

}
