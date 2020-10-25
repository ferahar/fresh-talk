import {Component} from "../../core/Component.js"

declare var nunjucks: any;
interface Props {
    image?: "string",
    name?: "string"
    [index: string]: string | {} | number | boolean | undefined 
}

export class Avatar extends Component {
    static TEMPLATE = "../../componets/avatar/avatar.html"

    constructor(props: Props) {

        super("div", props);
        this.element!.setClass("avatar")
    }
    
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Avatar.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }

}