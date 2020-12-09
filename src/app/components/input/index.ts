import {Input} from "./input";
import {field} from "./state";


export const inputsForLogin = [
    new Input(field.LOGIN_CLEAR),
    new Input(field.PSW)
]

export const inputsProfile = [
    new Input(field.LOGIN),
    new Input(field.EMAIL),
    new Input(field.PHONE),
    new Input(field.FIRST_NAME),
    new Input(field.SECOND_NAME),
    new Input(field.DISPLAY_NAME)
]

export const inputsRegistr = [
    new Input(field.FIRST_NAME),
    new Input(field.SECOND_NAME),
    new Input(field.LOGIN),
    new Input(field.PSW),
    new Input(field.EMAIL),
    new Input(field.PHONE)
]

export const inputsAvatar = [
    new Input(field.AVATAR)
]

export const inputsPswChange = [
    new Input(field.PSW_CUR),
    new Input(field.PSW_NEW)
]

export const inputsCreateChat = [
    new Input({
        name: "chat_name",
        type: "text",
        title: "Название чата",
        value: '',
        placeholder: "рога и копыта",
    })
]