import { objectForm } from '../../../core/util/index'
import { Forms } from './forms'
import { fieldsPrifile, fieldsLogin, fieldsRegistr, fieldsAvatar, fieldsPsw } from './state'
import { Router, Store } from '../../../core/index'
import { apiAuth, apiUser } from '../../api/index'

const router = new Router()

export const formsLogin = new Forms({
    props: {
        button: {
            text: "Авторизоваться",
            textlink: "Зарегистрироваться",
            link: "/registr"
        },
        fields: fieldsLogin
    }
}, (data: FormData) => signIn(data))

export const formsRegistr = new Forms({
    props: {
        button: {
            text: "Зарегистрироваться",
            textlink: "Авторизоваться",
            link: "/login"
        },
        fields: fieldsRegistr
    }
}, (data: FormData) => signUp(data))

export const formsProfile = new Forms({
    props: {
        button: {
            text: "Сохранить",
        },
        fields: fieldsPrifile,
    },
    store: true
}, (data: FormData) => saveProfile(data))

export const formsAvatar = new Forms({
    props: {
        button: {
            text: "Сохранить",
        },
        fields: fieldsAvatar
    },
    store: true
}, (data: FormData) => saveAvatar(data))

export const formsPassword = new Forms({
    props: {
        button: {
            text: "Сохранить",
        },
        fields: fieldsPsw
    }
}, (data: FormData) => console.log(data))

function signIn(data: FormData) {
    const object = objectForm(data)
    apiAuth.signIn(object)
        .then(apiAuth.user, error => console.log(error.response))
        .then(data => {
            const store = new Store()
            store.dispatch(Store.EVENTS.IS_LOGIN)
            const content = (data as XMLHttpRequest).response
            store.dispatch(Store.EVENTS.SET_PROFILE, content)
            router.go('/')
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
            store.dispatch(Store.EVENTS.SET_PROFILE, content)
            router.go('/')
        })
}

function saveProfile(data: FormData) {
    const object = objectForm(data)
    apiUser.saveProfil(object)
        .then(data => {
            const store = new Store()
            const content = (data as XMLHttpRequest).response
            store.dispatch(Store.EVENTS.SET_PROFILE, content)
        })
}

function saveAvatar(data: FormData) {
    apiUser.saveAvatar(data)
        .then(data => {
            const store = new Store()
            const content = (data as XMLHttpRequest).response
            store.dispatch(Store.EVENTS.SET_PROFILE, content)
            console.log(content)
            console.log(store.getState('profile'))
        }, error => console.log(error.response))
}