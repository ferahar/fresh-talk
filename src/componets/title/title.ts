import {Component} from "../../core/Component.js"
declare var nunjucks: any;
 
interface Props {
    [index: string]: string | {} | number | undefined
  }

export class Title extends Component {
    
    static TEMPLATE = `{{text}}`

    constructor(tagname:string, props: Props) {
        super(tagname, props);
        this.element!.addClass("h3")
    }
  
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.renderString(Title.TEMPLATE, this.props)
            this.element.html(tmpl);
        }
    }

}