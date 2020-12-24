import {Modalwindow} from "./modalwindow";
import {formsCreateChat, formsSearchuser} from "../forms2/index";
import {userSearch} from "../usersearch/index";


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