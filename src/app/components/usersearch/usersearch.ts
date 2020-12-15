import { Component } from "../../../core/index"
import {appStore} from "../../store/appStore"
import {User} from "../user/user";
import {Button} from "../button/button";
import {apiChats} from "../../api/index";



type Indexed = {
    [key in string]: unknown
}

declare var nunjucks: any

export class UserSearch extends Component {

    static TEMPLATE = '../app/components/usersearch/usersearch.html'

    constructor(props: Indexed={}) {
        super({
            template: UserSearch.TEMPLATE,
            tagName: 'ul',
            props: props
        })
        this.element.setClass('list')
        appStore.subscribe('setUserSearch', ()=> {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        } )

    }

    render() {
        const components: Component[] = []
        const userSearch = appStore.getState('userSearch') as Indexed[]
        const currentChat = appStore.getState('currentchat') as Indexed
        if (userSearch.length > 0) {
            userSearch.forEach(user => {
                components.push(new User(user as Indexed))
            })
            components.push(new Button({title:'Добавить выбранных'},'button', ()=>{
                const users = appStore.getState('userSelected') as number[]
                console.log(users)
                // if (users) return
                apiChats.addUsers({users, chatId:currentChat.id})
                    .then(()=>{
                        apiChats.users(currentChat)
                            .then(data=>{
                                const content = JSON.parse((data as XMLHttpRequest).response)
                                appStore.dispatch('setUserList', content )
                            })
                    }, error => { console.log(error.response) })
                console.log('Add persons')
            }))
        }

        this.components = {
            components
        }
        return nunjucks.render(this._template, this.props)
    }
}