import {Component} from "../../core/Component.js"

declare var nunjucks: any;
interface Props {
    [index: string]: string | {} | number | boolean | undefined 
}

export class Lenta extends Component {
    static TEMPLATE = "../../componets/lenta/lenta.html"

    constructor(props: Props) {
        super("article", props);
        this.element!.setClass("lenta container container_size_auto container_isColumn")
    }
    
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Lenta.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
    }

}
