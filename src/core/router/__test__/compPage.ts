import {Component} from "../../component/component";
import {renderString} from "nunjucks";

export class CompPage extends Component {
    constructor(title: string) {
        super({
            tagName: 'div',
            props: {
                title
            },
            template: '{{title}}'
        });
    }
    render(){
        return renderString(this.template, this.props)
    }
}