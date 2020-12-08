class Field {

    static EMAIL = {
        name: "email",
        type: "email",
        title: "Почта",
        value: '',
        placeholder: "Укажите свою почту",
    }
    static PHONE = {
        name: "phone",
        type: "tel",
        title: "Телефон",
        value: '',
        placeholder: "+7...",
    }
    static FIRST_NAME = {
        name: "first_name",
        type: "text",
        title: "Имя",
        value: '',
        placeholder: "...",
    }
    static SECOND_NAME = {
        name: "second_name",
        type: "text",
        title: "Фамилия",
        value: '',
        placeholder: "...",
    }
    static DISPLAY_NAME = {
        name: "display_name",
        type: "text",
        title: "display_name",
        value: '',
        placeholder: "...",
    }
    static LOGIN = {
        name: "login",
        type: "login",
        title: "Логин",
        value: '',
        placeholder: "Укажите свой логин или кл...",
    }
    static PSW = {
        name: "password",
        type: "password",
        title: "Пароль",
        value: '',
        placeholder: "@#)**^_!~",
    }
    static PSW_REPL = {
        name: "passwordRepl",
        type: "password",
        title: "Повторите пароль",
        value: '',
        placeholder: "@#)**^_!~",
    }
    static PSW_CUR = {
        name: "passwordCur",
        type: "password",
        title: "Текущий пароль",
        value: '',
        placeholder: "@#)**^_!~",
    }
    static PSW_NEW = {
        name: "passwordNew",
        type: "password",
        title: "Новый пароль",
        value: '',
        placeholder: "@#)**^_!~",
    }
    static AVATAR = {
        avatar: true,
        title: "Изображение профиля",
        image: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
        name: "avatar",
    }

}

export const fieldsLogin = {
    login: Field.LOGIN,
    password: Field.PSW
}
export const fieldsRegistr = {
    first_name: Field.FIRST_NAME,
    second_name: Field.SECOND_NAME,
    login: Field.LOGIN,
    password: Field.PSW,
    email: Field.EMAIL,
    phone: Field.PHONE,
}
export const fieldsPrifile = {
    email: Field.EMAIL,
    phone: Field.PHONE,
    first_name: Field.FIRST_NAME,
    second_name: Field.SECOND_NAME,
    display_name: Field.DISPLAY_NAME,
    login: Field.LOGIN
}
export const fieldsAvatar = {
    avatar: Field.AVATAR,
}
export const fieldsPsw = {
    passwordCur: Field.PSW_CUR,
    passwordNew: Field.PSW_NEW
}