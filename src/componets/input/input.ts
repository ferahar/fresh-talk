import {Component} from "../../core/Component.js"
declare var nunjucks: any;
 

export class Input<T> extends Component<T> {
    
    static TEMPLATE = `
    {{label}}
    <input class="inputText form-input" type="{{type}}" placeholder="{{placeholder}}" name="{{name}}" value="{{value}}" >
    `

    constructor(props: T) {
        super("label", props, {
            'keydown': 'printConsole'
        });
        this.element!.addClass("form-label")
    }
  
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.renderString(Input.TEMPLATE, {
                label: this.props.text,
                type: this.props.type,
                placeholder: this.props.placeholder,
                name: this.props.name,
                value: this.props.value,
            })
            this.element.html(tmpl);
        }
    }

    printConsole():void {
        console.log('key press');
    }
}




  