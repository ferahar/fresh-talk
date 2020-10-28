import {Component} from "../../core/Component.js"
declare var nunjucks: any;

interface Props {
    [index: string]: string | {} | number | undefined
  }

export class Button extends Component {
    
    static TEMPLATE = "{{text}}"

    constructor(props: Props, events = {}) {

        super( "button", props, events);
        this.element!.addClass("button")
    }
  
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.renderString(Button.TEMPLATE, this.props)
            this.element.html(tmpl);
        }
    }
}




  