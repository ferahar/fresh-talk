import {Component} from "../../core/Component.js"
declare var nunjucks: any;

export class Button<T> extends Component<T> {
    
    static TEMPLATE = "{{text}}"

    constructor(props: T) {
        
        super(
            "button", 
            props, 
            {
                'click': 'onClick'
            }
        );
        
        this.element!.addClass("button")

    }
  
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.renderString(Button.TEMPLATE, {
                text: this.props.text
            })
            this.element.html(tmpl);
        }
    }

    onClick(e:Event):void {
        e.preventDefault();
        // const form = document.querySelector('form');
        // let data = new FormData(form!)
        // console.log("data:", data);
        
        // for(let [name, value] of data) {
        //     console.log(`=>   ${name} = ${value}`)
        // }
        
        console.log(this);
        alert(this.props.text)
    }
}




  