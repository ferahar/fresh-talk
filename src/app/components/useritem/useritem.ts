import {Component} from "../../../core/index"
import {Button} from "../button/button"
import {apiChats} from "../../api/index"
import {appStore} from "../../store/appStore"

export class Useritem extends Component {

    static TEMPLATE = '../app/components/useritem/useritem.html'

    constructor(props: Indexed) {

        const components = []
        const currentChat = appStore.getState('currentchat') as Indexed
        const profile = appStore.getState('profile') as Indexed

        if (!props.owner && currentChat.created_by === profile.id ) {
            components.push(
                new Button({icon: 'close'}, 'button button_ghost', ()=> removeUser(this))
            )
        }
        super({
            template: Useritem.TEMPLATE,
            tagName: 'li',
            props: props,
            components: {
                buttonclose: components
            }
        })
        this.element.setClass('list-item')
        this.element!.attr('date-id', props.id as string)

    }

}

function removeUser(component:Component) {
    const currentChat = appStore.getState('currentchat') as Indexed
    apiChats.removeUsers({users:[component.props.id], chatId: currentChat.id})
        .then(() => apiChats.users(currentChat))
        .then(data=> appStore.dispatch('setUserList', data ))
}
