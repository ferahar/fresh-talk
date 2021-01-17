import {Modalwindow} from './modalwindow'
import {formsCreateChat, formsSearchuser} from '../forms2/'
import {userSearch} from '../usersearch/'


export const modalwindowCreateChat = new Modalwindow(
    'Новый чат',
    [
      formsCreateChat
    ]
)

export const modalwindowAddUsers = new Modalwindow(
    'Добавить участников',
    [
      formsSearchuser,
      userSearch
    ]
)
