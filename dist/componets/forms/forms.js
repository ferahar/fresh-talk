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
    }
    ComponentDidMount() {
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
        console.log("SUBMIT");
        const fields = this.element.findAll('input');
        fields.forEach(field => {
            const checkField = this.checkField(field.nativeElement);
            if (checkField.test) {
                field.parent().find('span').show();
                field.parent().find('span').text(checkField.message);
            }
        });
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
    ComponentDidUpdate(newProps, oldProps) {
        if (newProps || oldProps) {
            return true;
        }
        return false;
    }
    checkForm(e) {
        const field = e.target;
        const checkField = this.checkField(field);
        if (checkField.test) {
            $(field).parent().find('span').show();
            $(field).parent().find('span').text(checkField.message);
        }
        else {
            $(field).parent().find('span').hide();
            $(field).parent().find('span').text('');
        }
    }
    clearForm(e) {
        const field = e.target;
        $(field).parent().find('span').hide();
        $(field).parent().find('span').text('');
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
            case 'psw':
                if (fieldName.value.length < 6) {
                    test = true;
                    message = "Пароль должен содержать более 6 символов";
                }
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