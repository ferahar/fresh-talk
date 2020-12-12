import {Modalwindow} from "./modalwindow";
import {formsCreateChat} from "../forms2/index";


export const modalwindowCreateChat = new Modalwindow(
    {
        title:'Новый чат'
    },
    [
        formsCreateChat
    ]
)