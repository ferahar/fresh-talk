import {Component} from '../../../core/'
import {appStore} from '../../store/appStore'

import './user.scss'
const template = require('./user.html')

export class User extends Component {
  constructor(props: Indexed) {
    super({
      template,
      tagName: 'li',
      props,
      style: 'list-item'
    })

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
    })
  }
}
