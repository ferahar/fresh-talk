import {Component} from "../../../core/index"
import {Button} from "../button/button";
import {objectForm} from "../../../core/util/index";

type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class FormResponse extends Component {

    static TEMPLATE = '../app/components/formresponse/formresponse.html'

    constructor(props: Indexed = {}) {
        super(
            {
                template: FormResponse.TEMPLATE,
                tagName: 'form',
                props: props,
                components: {
                    button: [
                        new Button({icon:'send'}, 'button formresponse-sendButton' )
                    ]
                }
            }
        )
        this.element.setClass('formresponse')
        this.element.on('submit', this.onSubmit.bind(this), true)
        // this.element.on('keydown', autosize)

    }

    onSubmit(e: Event) {
        e.preventDefault()
        const form = this.element.nativeElement as HTMLFormElement
        let data = new FormData(form)
        console.log(objectForm(data))
    }

}

// function autosize(e: Event){
//     const el = e.target as HTMLElement
//     setTimeout(function(){
//         el.style.cssText = 'height:auto; padding:0';
//         el.style.cssText = 'height:' + el.scrollHeight + 'px';
//     },0);
// }
