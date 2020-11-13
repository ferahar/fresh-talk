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
    phone: "Телфон",
    avatar: "Автар",
    firstname: "Имя",
    secondname: "Фамилия",
    displayname: "",
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

export const fieldsLogin = getFields( presetLogin )