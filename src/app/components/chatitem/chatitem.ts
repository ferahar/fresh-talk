import {Component, $} from "../../../core/index"
import {apiChats} from "../../api/index"
import {appStore} from "../../store/appStore"


export class Chatitem extends Component {

    static TEMPLATE = '../app/components/chatitem/chatitem.html'

    constructor(props: Indexed) {
        super({
            template: Chatitem.TEMPLATE,
            tagName: 'li',
            props: props,
            style: 'chatItem'
        })

        this.element.attr('date-id', props.id as string)
        this.element.on('click', this.onClick.bind(this))
    }

    onClick() {
        unSelect('chatItem', 'chatItem_selected')
        this.element.addClass('chatItem_selected')
        appStore.dispatch('setCurrentChat', this.props)
        apiChats.users(this.props)
            .then(data => appStore.dispatch('setUserList', data ))
            .catch(error=>console.log(error.message))
    }
}

function unSelect(target:string, style: string) {
    const elements = document.querySelectorAll(`.${target}`)
    if (!elements) return
    elements.forEach(element => {
        $(element as HTMLElement ).removeClass(style)
    })
}