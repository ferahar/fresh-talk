import {Component, $, Store} from "../../../core/index"

type Indexed = {
    [key in string]: unknown
}

export class Chatitem extends Component {

    static TEMPLATE = '../app/components/chatitem/chatitem.html'

    constructor(props: Indexed) {
        super({
            template: Chatitem.TEMPLATE,
            tagName: 'li',
            props: props
        })
        this.element!.setClass('chatItem')
        this.element!.attr('date-id', props.id as string)
        this.element.on('click', this.onClick.bind(this))
    }

    onClick() {
        unSelect('chatItem', 'chatItem_selected')
        this.element.addClass('chatItem_selected')
        const store = new Store()
        store.dispatch('setCurrentChat', this.props)
    }
}

function unSelect(target:string, style: string) {
    const elements = document.querySelectorAll(`.${target}`)
    if (!elements) return
    elements.forEach(element =>{
        $(element as HTMLElement ).removeClass(style)
    })
}