import {Router} from '../../../core/'
import {apiAuth} from '../../api/'
import {Header} from './header'
import {Button} from '../button/button'
import {appStore} from '../../store/appStore'


export const headerLogin = new Header('Вход')

export const headerReg = new Header('Регистрация')

export const headerProfile = new Header(
    'Профиль',
    {
      header_left: [
        new Button({title: 'Главная'}, 'button button_ghost', ()=>{
          new Router().go('/')
        })
      ],
      header_right: [
        new Button({title: 'Выход'}, 'button button_ghost', logout)
      ]
    }
);

function logout() {
  apiAuth.logout()
      .then(
          () => {
            appStore.clearStore()
            appStore.setState('isLogin', '')
            new Router().go('/login')
          }
      )
      .catch(error=>console.log(error.message))
}

