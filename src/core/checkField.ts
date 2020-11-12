import { Props } from "./component"

export function checkField(fieldName: HTMLInputElement): Props {
    let test: boolean = false
    let message: string = ''
    
    switch (fieldName.name) {
        case 'email':
            const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (fieldName.value.length === 0 || !emailRegExp.test(fieldName.value)) {
                test = true
                message = "Не верный формат почты"
            }    
            break;
        case 'phone':
            const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
            if (fieldName.value.length === 0 || !phoneRegExp.test(fieldName.value)) {
                test = true
                message = "Не верный формат телефона или пустое поле"
            }    
            break;
        case 'password':
            if (fieldName.value.length < 6) {
                test = true
                message = "Пароль должен содержать более 6 символов"
            }    
            break;
        case 'avatar':
            test = false   
            break;
        default:
            if (fieldName.value.length === 0) {
                test = true
                message = "Поле не должно быть пустым"
            }
        break;
    }
    return {test:test, message:message}
}
