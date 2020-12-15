import {Component} from "../../../core/index"
import {Button} from "../button/button"
import {apiChats} from "../../api/index"
import {appStore} from "../../store/appStore"

type Indexed = {
    [key in string]: unknown
}

export class Useritem extends Component {

    static TEMPLATE = '../app/components/useritem/useritem.html'

    constructor(props: Indexed) {
        const components = []
        if (!props.owner) {
            components.push(new Button({icon: 'close'}, 'button button_ghost', ()=>{
                const currentChat = appStore.getState('currentchat') as Indexed
                apiChats.removeUsers({users:[this.props.id], chatId: currentChat.id})
                    .then(()=>{
                        apiChats.users(currentChat)
                            .then(data=>{
                                const content = JSON.parse((data as XMLHttpRequest).response)
                                appStore.dispatch('setUserList', content )
                            })
                    })
            }))
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
