import { Component, Config } from "../../../core/component.js"
// import { HTTP } from "../../../core/index.js"


class Button extends Component {

    static TEMPLATE = '../app/components/button/button.html'
    
    constructor(config: Config) {
        config.template = Button.TEMPLATE;
        config.listeners = {
            'click': 'onClick'
        }
        super( config );
    }

    componentDidMount() {
        console.log('ButtonClick = ',this.props.title);
        
    }

    onClick() {
        this.setProps({
            title: Math.floor(Math.random()*100)
        })
        // new HTTP().get('https://jsonplaceholder.typicode.com/todos/1')
        // .then( data => {
        //     console.log( (data as XMLHttpRequest).response );
        // })
    }

}

export const button = new Button({
    selector: 'app-button',
    props: {
        title: 'API handler',
        icon: 'pest_control_rodent'
    }
})





  