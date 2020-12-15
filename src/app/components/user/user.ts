import {Component} from "../../../core/index"
import {appStore} from "../../store/appStore";

type Indexed = {
    [key in string]: unknown
}

export class User extends Component {

    static TEMPLATE = '../app/components/user/user.html'

    constructor(props: Indexed) {
        super({
            template: User.TEMPLATE,
            tagName: 'li',
            props: props,
        })
        this.element.setClass('list-item')
        this.element.on('click', ()=>{
            this.element.nativeElement!.classList.toggle('user_selected')
            const users = appStore.getState('userSelected') as number[]
            if (users.includes(this.props.id as number)) {
                const newUsers = users.filter(userId=>userId!==this.props.id)
                appStore.dispatch('setUserSelected', newUsers)
            } else {
                users.push(this.props.id as number)
                appStore.dispatch('setUserSelected', users)
            }

            console.log(appStore.getState('userSelected'))
        })
    }

}
