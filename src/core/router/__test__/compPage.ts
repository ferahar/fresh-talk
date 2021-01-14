import {Component} from "../../component/component";
import {compile} from "nunjucks";

const tmpl = compile('{{title}}')


export class CompPage extends Component {
    constructor(title: string) {
        super({
            tagName: 'div',
            props: {
                title
            },
            // template: 'template'
            template: tmpl.render.bind(tmpl)
        });
    }
    // render(){
    //     return renderString('{{title}}', this.props)
    // }
}