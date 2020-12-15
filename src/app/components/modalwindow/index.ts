import {Modalwindow} from "./modalwindow";
import {formsCreateChat, formsSearchuser} from "../forms2/index";
import {userSearch} from "../usersearch/index";


export const modalwindowCreateChat = new Modalwindow(
    {
        title:'Новый чат'
    },
    [
        formsCreateChat
    ]
)

export const modalwindowAddUsers = new Modalwindow(
    {
        title:'Добавить участников'
    },
    [
        formsSearchuser,
        userSearch
    ]
)