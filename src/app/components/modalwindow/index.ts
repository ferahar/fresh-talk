import {Modalwindow} from "./modalwindow";
import {formsCrfeateChat} from "../forms2/index";


export const modalwindowCreateChat = new Modalwindow(
    {
        title:'Новый чат'
    },
    [
        formsCrfeateChat
    ]
)