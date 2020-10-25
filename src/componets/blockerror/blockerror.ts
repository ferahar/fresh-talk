import {Component} from "../../core/Component.js"
import {Button} from "../../componets/button/button.js"
declare var nunjucks: any;
 
interface Props {
    [index: string]: string | {} | number | undefined
  }

export class Blockerror extends Component {
    
    static TEMPLATE = "../../componets/blockerror/blockerror.html"

    constructor(props: Props) {
        super("section", props, {
            "click": 'demoClickButton'
        });
        this.element!.setClass("msgSys")
    }
  
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Blockerror.TEMPLATE, this.props)
            this.element.html(tmpl);
        }
        const button = new Button({text:"Назад к чатам"})
        button.element!.setClass("button button_primary")
        this.append([button])
    }

    demoClickButton(e: Event){

        const target = e.target as HTMLButtonElement        
        if (target.tagName === "BUTTON") {
            console.log(this.props);
        }
        
    }

}