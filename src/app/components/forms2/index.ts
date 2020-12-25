import {objectForm} from '../../../core/util/index'
import {Forms} from './forms'
import {Component, Router, Store} from '../../../core/index'
import {apiAuth, apiChats, apiUser} from '../../api/index'
import {Button} from "../button/button"
import {
    inputsForLogin,
    inputsProfile,
    inputsRegistr,
    inputsAvatar,
    inputsPswChange,
    inputsCreateChat,
    inputsEditChat,
    inputsSearchUser
} from "../input/index"
import {appStore} from "../../store/appStore"
import {modalwindowCreateChat} from "../modalwindow/index"
import {errorRequest} from "../../../core/util/error"
import {Notification} from "../notification/notification"


export const formsLogin2 = new Forms(
    {
        inputs: inputsForLogin,
        buttons: [
            new Button({title:'Авторизоваться'}, 'button button_primary margin-tb_s-2'),
            new Button({title: 'Зарегистрироваться'}, '', ()=>{new Router().go('/register')})
        ],
    },
    signIn
)

export const formsRegistr = new Forms(
    {
        inputs: inputsRegistr,
        buttons: [
            new Button({title:'Зарегистрироваться'}, 'button button_primary margin-tb_s-2'),
            new Button({title: 'Авторизоваться'}, '', ()=>{new Router().go('/login')})
        ],
    },
    signUp
)

export const formsAvatar = new Forms(
    {
        inputs: inputsAvatar
    },
    updateAvatarUser,
    'change'
)

export const formsPswChange = new Forms(
    {
        inputs: inputsPswChange,
        buttons: [new Button({title:'Изменить пароль'}, 'button')],
    },
    pswUpdate
)

export const formsProfile2 = new Forms(
    {
        inputs: inputsProfile,
        buttons: [new Button({title:'Изменить профиль'}, 'button')],
    },
    profileUpdate
)

export const formsCreateChat = new Forms(
    {
        inputs: inputsCreateChat,
        buttons: [
            new Button({title:'Создать'}, 'button button_primary', ()=> {
                setTimeout(()=>{
                    if (formsCreateChat.validation) {
                        modalwindowCreateChat.hide()
                        new Notification(`Вы создали чатик`)
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
    updateAvatarChat,
    'change'
)

export const formsSearchuser = new Forms(
    {
        inputs: inputsSearchUser,
    },
    searchUsers,
    'keyup',
    false
)


// Methods

function apiStart() {
    return apiAuth.user()
    .then(data => {
        appStore.dispatch(Store.EVENTS.IS_LOGIN)
        appStore.dispatch('setProfile', data)
        return apiChats.chats()
    })
    .then(data => appStore.dispatch('setChats', data))
}

function signIn(data: FormData) {
    const object = objectForm(data)
    apiAuth.signIn(object)
        .then(apiStart)
        .then(()=>{
            new Router().go('/')
            resetForms(inputsForLogin)
        })
        .catch(error=> {
            unauthorize(error as XMLHttpRequest, inputsForLogin)
            console.log(error.message)
        })
}

function signUp(data: FormData) {
    const object = objectForm(data)
    apiAuth.signUp(object)
        .then(apiStart)
        .then(()=> {
            new Router().go('/profile')
            resetForms(inputsRegistr)
        })
        .catch(error=>console.log(error.message))
}

function profileUpdate(data: FormData) {
    const object = objectForm(data)
    apiUser.saveProfil(object)
        .then(apiAuth.user)
        .then(data => {
            appStore.dispatch('setProfile', data)
            new Notification(`Профиль успешно изменен`)
        })
        .catch(error=>console.log(error.message))
}

function pswUpdate(data: FormData) {
    const object = objectForm(data)
    apiUser.savePsw(object)
        .then(() => {
            console.log('password changed successfully')
            new Notification(`Пароль успешно изменен`)
        })
        .catch(error=>console.log(error.message))
}

function unauthorize(data: XMLHttpRequest, inputs: Component[]=[],) {
    if (data.status===401) {
        const error = JSON.parse(data.response)
        inputs.forEach(input=> {
            input.element.find('span').text(error.reason)
            input.element.find('span').show()
        })
    }

}


function chatCreate(data: FormData) {
    const object = objectForm(data)
    apiChats.create(object)
        .then(apiChats.chats, errorRequest)
        .then(data => {
            appStore.dispatch('setChats', data)
            resetForms(inputsCreateChat)
        })
}

function updateAvatarUser(data: FormData){
    apiUser.saveAvatar(data)
        .then(apiAuth.user)
        .then(data => {
            const store = new Store()
            store.dispatch('setProfile', data)
            new Notification(`Изображение успешно изменено`)
        })
}

function updateAvatarChat(data: FormData){
    const currentchat = appStore.getState('currentchat') as Indexed
    data.append('chatId', currentchat.id as string)
    apiChats.uploadAvatar(data)
        .then(apiChats.chats, errorRequest)
        .then(data=>{
            const content = data as Indexed[]
            appStore.dispatch('setChats', content)
            const chat = content.find(chat=> chat.id === currentchat.id)
            appStore.dispatch('setCurrentChat', chat)
            new Notification(`Изображение успешно изменено`)
        })
}

function searchUsers(data: FormData) {
    const object = objectForm(data)
    apiUser.findUser(object)
        .then(data=>{
            const content = JSON.parse((data as XMLHttpRequest).response) as Indexed[]
            appStore.dispatch('setUserSearch', content)
        })
}


//utils

function resetForms(inputs: Component[]) {
    inputs.forEach(input=>input.eventBus.emit(Component.EVENTS.FLOW_RENDER))
}