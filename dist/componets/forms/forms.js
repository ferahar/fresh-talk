import { Component } from "../../core/Component.js";
import { $ } from "../../core/DomElement.js";
export class Forms extends Component {
    constructor(props) {
        super("form", props, {
            'submit': 'onSubmit'
        });
        this.element.setClass("form container container_isColumn");
    }
    render() {
        if (this.props && this.element) {
            const tmpl = nunjucks.render(Forms.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
        const focus = this.props.focus;
        setTimeout(() => {
            if (focus) {
                document.getElementsByName(focus)[0].focus();
            }
        }, 0);
    }
    componentDidMount() {
        this.initBlur();
        this.initFocus();
    }
    initBlur() {
        const fields = this.element.findAll('input');
        fields.forEach(field => {
            field.on('blur', this.checkForm, this);
        });
    }
    initFocus() {
        const fields = this.element.findAll('input');
        fields.forEach(field => {
            field.on('focus', this.clearForm, this);
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const props = {};
        const fields = this.element.findAll('input');
        fields.forEach(element => {
            const field = element.nativeElement;
            const checkField = this.checkField(field);
            const oldProps = Object.assign({}, this.props[field.name]);
            if (checkField.test) {
                Object.assign(oldProps, {
                    value: field.value,
                    error: checkField.message
                });
                props[field.name] = oldProps;
            }
            else {
                Object.assign(oldProps, {
                    value: field.value,
                    error: ''
                });
                props[field.name] = oldProps;
            }
        });
        this.setProps(props);
        let data = new FormData(this.element.nativeElement);
        for (let [name, value] of data) {
            console.log(`${name} = ${value}`);
        }
    }
    formProps() {
        const res = {};
        let data = new FormData(this.element.nativeElement);
        for (let [name, value] of data) {
            res[name] = {
                value: value
            };
        }
        return res;
    }
    componentDidUpdate(newProps, oldProps) {
        if (newProps.value && oldProps.value) {
            return newProps.value !== oldProps.value;
        }
        return true;
    }
    clearForm(e) {
        const field = e.target;
        $(field).parent().find('span').hide();
        $(field).parent().find('span').text('');
    }
    checkForm(e) {
        const next = e.relatedTarget;
        const field = e.target;
        const props = {};
        const oldProps = Object.assign({}, this.props[field.name]);
        const checkField = this.checkField(field);
        if (next && next.tagName === "BUTTON")
            return;
        if (checkField.test) {
            Object.assign(oldProps, {
                value: field.value,
                error: checkField.message
            });
            props[field.name] = oldProps;
        }
        else {
            Object.assign(oldProps, {
                value: field.value,
                error: ''
            });
            props[field.name] = oldProps;
        }
        props.focus = next ? next.name : '';
        this.setProps(props);
    }
    checkField(fieldName) {
        let test = false;
        let message = '';
        switch (fieldName.name) {
            case 'email':
                const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (fieldName.value.length === 0 || !emailRegExp.test(fieldName.value)) {
                    test = true;
                    message = "Не верный формат почты";
                }
                break;
            case 'phone':
                const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                if (fieldName.value.length === 0 || !phoneRegExp.test(fieldName.value)) {
                    test = true;
                    message = "Не верный формат телефона или пустое поле";
                }
                break;
            case 'psw':
                if (fieldName.value.length < 6) {
                    test = true;
                    message = "Пароль должен содержать более 6 символов";
                }
                break;
            case 'avatar':
                test = false;
                break;
            default:
                if (fieldName.value.length === 0) {
                    test = true;
                    message = "Поле не должно быть пустым";
                }
                break;
        }
        return { test: test, message: message };
    }
}
Forms.TEMPLATE = "../../componets/forms/forms.html";
//# sourceMappingURL=forms.js.map