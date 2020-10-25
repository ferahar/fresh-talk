import {Component} from "../../core/Component.js"
declare var nunjucks: any;
 
interface Props {
    [index: string]: string | {} | number | undefined
  }

export class ErrorText extends Component {
    
    static TEMPLATE = `{{text}}`

    constructor(props: Props) {
        super("span", props);
        this.element!.addClass("form-textErorr")
    }
  
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.renderString(ErrorText.TEMPLATE, this.props)
            this.element.html(tmpl);
        }
    }

}