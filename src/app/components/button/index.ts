import {apiAuth} from '../../api/api-auth'
import {Button} from './button'
import {appStore} from '../../store/appStore'
import {apiChats} from '../../api/index'
import {modalwindowAddUsers} from '../modalwindow/index'


export const buttonLogout = new Button(
    {
      props: {
        title: 'Выход',
        // icon: 'pest_control_rodent'
      }
    },
    'button button_ghost',
    () => {
      apiAuth.logout()
          .then(
              data => console.log( (data as XMLHttpRequest).response ),
              error => console.log(error.response)
          )
    }
)

export const buttonAddUsers = new Button({title: 'Добавить выбранных'}, 'button', ()=>{
  const users = appStore.getState('userSelected') as number[]
  const currentChat = appStore.getState('currentchat') as Indexed
  if (users.length<=0) return
  apiChats.addUsers({users, chatId: currentChat.id})
      .then(() => apiChats.users(currentChat))
      .then(data => appStore.dispatch('setUserList', data ))
      .catch(error=>console.log(error.message))
  console.log('Add persons')
  modalwindowAddUsers.hide()
})
