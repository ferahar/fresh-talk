import { Component, Config } from "../../../core/component"

export class Button extends Component {

    static TEMPLATE = '../app/components/button/button.html'
    private onclick: Function | null

    constructor(config: Config, onclick?: Function) {
        config.template = Button.TEMPLATE;
        config.listeners = {
            'click': 'onClick'
        }
        super( config );
        
        if (onclick) {
            this.onclick = onclick
        } else {
            this.onclick = null
        }
    }

    componentDidMount() {
        console.log('ButtonClick = ',this.props.title);
    }

    onClick() {
        if (this.onclick !== null) {
            (this.onclick as Function)()
        }
    }

}





  