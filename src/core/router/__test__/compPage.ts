import {Component} from "../../component/component";
import {renderString} from "nunjucks";

export class CompPage extends Component {
    constructor(title: string) {
        super({
            tagName: 'div',
            props: {
                title
            }
        });
    }
    render(){
        return renderString('{{title}}', this.props)
    }
}