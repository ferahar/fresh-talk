import { objectForm } from '../../../core/util/index'
import { Forms } from './forms'
import {Component, Router, Store} from '../../../core/index'
import {apiAuth, apiChats, apiUser} from '../../api/index'
import {Button} from "../button/button";
import {
    inputsForLogin,
    inputsProfile,
    inputsRegistr,
    inputsAvatar,
    inputsPswChange,
    inputsCreateChat,
    inputsEditChat
} from "../input/index";
import {appStore} from "../../store/appStore";
import {modalwindowCreateChat} from "../modalwindow/index";

type Indexed = {
    [key in string]: unknown
}


export const formsLogin2 = new Forms(
    {
        inputs: inputsForLogin,
        buttons: [
            new Button({title:'Авторизоваться'}, 'button button_primary'),
            new Button({title: 'Зарегистрироваться'}, '', ()=>{new Router().go('/registr')})
        ],
    },
    signIn
)

export const formsRegistr = new Forms(
    {
        inputs: inputsRegistr,
        buttons: [
            new Button({title:'Зарегистрироваться'}, 'button button_primary'),
            new Button({title: 'Авторизоваться'}, '', ()=>{new Router().go('/login')})
        ],
    },
    signUp
)

export const formsAvatar = new Forms(
    {
        inputs: inputsAvatar
    },
    (data: FormData)=>{
        apiUser.saveAvatar(data)
            .then(apiAuth.user, error => console.log(error.response))
            .then(data => {
                const store = new Store()
                const content = (data as XMLHttpRequest).response
                store.dispatch('setProfile', JSON.parse(content))
            })
    },
    'change'
)

export const formsPswChange = new Forms(
    {
        inputs: inputsPswChange,
        buttons: [new Button({title:'Изменить пароль'}, 'button')],
    }
)

export const formsProfile2 = new Forms(
    {
        inputs: inputsProfile,
        buttons: [new Button({title:'Изменить профиль'}, 'button')],
    }
)

export const formsCreateChat = new Forms(
    {
        inputs: inputsCreateChat,
        buttons: [
            new Button({title:'Создать'}, 'button button_primary', ()=> {
                setTimeout(()=>{
                    if (formsCreateChat.validation) {
                        modalwindowCreateChat.hide()
                    }
                },0)
            }),
        ],
    },
    chatCreate
)

export const formsEditChat = new Forms(
    {
        inputs: inputsEditChat,
    },
    updateAvatar,
    'change'
)


// Methods

function signIn(data: FormData) {
    const object = objectForm(data)
    apiAuth.signIn(object)
        .then(apiAuth.user, error => error)
        .then(data => {
            getUser(data as XMLHttpRequest, inputsForLogin)
    })
}

function signUp(data: FormData) {
    const object = objectForm(data)
    apiAuth.signUp(object)
        .then(apiAuth.user, error => console.log(error.response))
        .then(data => {
            const store = new Store()
            store.dispatch(Store.EVENTS.IS_LOGIN)
            const content = (data as XMLHttpRequest).response
            store.dispatch('setProfile', JSON.parse(content))
            inputsForLogin.forEach(input=>input.eventBus.emit(Component.EVENTS.FLOW_RENDER))
            new Router().go('/profile')
        })
}

function getUser(data: XMLHttpRequest, inputs: Component[]=[], routerPath: string = "/"):boolean {
    if (!data) return false
    if (data.status===401) {
        inputs.forEach(input=> {
            input.element.find('span').text(data.response)
            input.element.find('span').show()
        })
        return false
    }
    const store = new Store()
    store.dispatch(Store.EVENTS.IS_LOGIN)
    const content = data.response
    store.dispatch('setProfile', JSON.parse(content))
    inputs.forEach(input=>input.eventBus.emit(Component.EVENTS.FLOW_RENDER))
    new Router().go(routerPath)
    return true
}

function chatCreate(data: FormData) {
    const object = objectForm(data)
    apiChats.create(object)
        .then(apiChats.chats, error => console.log(error.response))
        .then(data => {
            const content = JSON.parse((data as XMLHttpRequest).response)
            appStore.dispatch('setChats', content)
        })
}

function updateAvatar(data: FormData){
    const currentchat = appStore.getState('currentchat') as Indexed
    data.append('chatId', currentchat.id as string)
    apiChats.uploadAvatar(data)
        .then(apiChats.chats)
        .then(data=>{
            const content = JSON.parse((data as XMLHttpRequest).response) as Indexed[]
            appStore.dispatch('setChats', content)
            const chat = content.find(chat=> chat.id === currentchat.id)
            appStore.dispatch('setCurrentChat', chat)
        })

}
