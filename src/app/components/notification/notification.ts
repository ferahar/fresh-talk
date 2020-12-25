import {Component} from "../../../core/index"


export class Notification extends Component {

    static TEMPLATE = '../app/components/notification/notification.html'

    constructor(message: string) {
        super({
            tagName: 'dialog',
            template: Notification.TEMPLATE,
            props: {
                message
            },
            style: 'notification'
        })
        document.body.appendChild(this.element.nativeElement as HTMLElement)
    }

    componentDidMount() {
        setTimeout(()=>this.element.nativeElement!.remove(), 3000)
    }

}
