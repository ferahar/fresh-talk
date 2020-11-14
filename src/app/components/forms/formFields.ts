import { Component } from "../../../core/component"
import { Item } from "../item/item"

type Titles = {
    [key in string]: {}
};

const titles: Titles = {
    email: {
        name: "email",
        type: "email",
        title: "Почта",
        placeholder: "Укажите свою почту",
    },
    phone: {
        name: "phone",
        type: "phone",
        title: "Телефон",
        placeholder: "+7...",
    },
    avatar: {
        avatar: {
            image: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
        },
        name: "avatar",
    },
    firstname: {
        name: "firstname",
        type: "text",
        title: "Имя",
        placeholder: "...",
    },
    secondname: {
        name: "secondname",
        type: "text",
        title: "Фамилия",
        placeholder: "...",
    },
    displayname: {
        name: "displayname",
        type: "text",
        title: "displayname",
        placeholder: "...",
    },
    login: {
        name: "login",
        type: "text",
        title: "Логин",
        placeholder: "Укажите свой логини или кл...",
    },
    password: {
        name: "password",
        type: "password",
        title: "Пароль",
        placeholder: "@#)**^_!~",
    },
    passwordDouble: "Пароль еще раз",
    passwordOld: "Старый пароль",
    passwordNew: "Новый пароль"
};

function getFields( items: Titles[] ): Component[] {
    const components: Component[] = [];
    items.forEach( (item: Titles) => {
        components.push(
            new Item({
                props: {
                    title: item.title,
                    type: item.type,
                    placeholder: item.placeholder,
                    name: item.name,
                    value: ''
                }
            })
        )
    });
    return components
}

const presetLogin = [
    titles.login,
    titles.password
]

const presetRegistr = [
    titles.login,
    titles.password
]

export const fieldsLogin = getFields( presetLogin )
export const fieldsRegistr = getFields( presetRegistr )