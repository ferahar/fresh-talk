import {Component} from "../../core/Component.js"
declare var nunjucks: any;
 
interface Props {
    [index: string]: string | {} | number | undefined
  }

export class Blockerror extends Component {
    
    static TEMPLATE = "../../componets/blockerror/blockerror.html"

    constructor(props: Props) {
        super("main", props);
        this.element!.setClass("main container container_center")
    }
  
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Blockerror.TEMPLATE, this.props)
            this.element.html(tmpl);
        }
    }

}