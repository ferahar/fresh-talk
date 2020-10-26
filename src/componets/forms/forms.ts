import {Component} from "../../core/Component.js"
import {$} from "../../core/DomElement.js"

declare var nunjucks: any;
interface Props {
    [index: string]: string | {} | number | boolean | undefined 
}

export class Forms extends Component {
    static TEMPLATE = "../../componets/forms/forms.html"

    constructor(props: Props) {
        super("form", props, {
            'submit': 'onSubmit'
        });
        this.element!.setClass("form container container_isColumn")   
    }
    
    render() {        
        if (this.props && this.element) {            
            const tmpl = nunjucks.render(Forms.TEMPLATE, this.props);
            this.element.html(tmpl);
        }
        const focus = this.props.focus
        setTimeout(() => {
            if (focus) {
                document.getElementsByName(focus as string)![0].focus()
            }
        }, 0);

    }

    ComponentDidMount() {
        this.initBlur();
        this.initFocus();
    }

    initBlur() {
        const fields = this.element!.findAll('input')
        fields!.forEach(field => {
            field.on('blur', this.checkForm as EventListener, this)
        });
    }

    initFocus() {
        const fields = this.element!.findAll('input')
        fields!.forEach(field => {
            field.on('focus', this.clearForm, this)
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();

        const props: Props = {}
        const fields = this.element!.findAll('input')
        fields!.forEach(element => {            
            const field = element.nativeElement as HTMLInputElement
            const checkField: Props = this.checkField(field)
            const oldProps = Object.assign({},this.props[field.name])
            if (checkField.test) {
                Object.assign(oldProps, {
                    value: field.value,
                    error: checkField.message
                });
                props[field.name] = oldProps            
            } else{
                Object.assign(oldProps, {
                    value: field.value,
                    error: ''
                });
                props[field.name] = oldProps
            }
        });
        this.setProps(props)
        let data = new FormData(this.element!.nativeElement as HTMLFormElement)
        for(let [name, value] of data) {
            console.log(`${name} = ${value}`)
        }    
    }

    formProps() {
        const res: Props = {}
        let data = new FormData(this.element!.nativeElement as HTMLFormElement)
        for(let [name, value] of data) {
            res[name] = {
                value: value}
        }
        return res;
    }

    ComponentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
        if (newProps||oldProps) {
            // return newProps.value!==oldProps.value
            // coming son
            return true;
          }
        return false
    }

    clearForm(e: Event) {
        const field = e.target as HTMLInputElement
        $(field).parent()!.find('span').hide()
        $(field).parent()!.find('span').text('')
    }


    checkForm(e: Event & FocusEvent) {

        const next = e.relatedTarget as HTMLInputElement
        const field = e.target as HTMLInputElement
        const props: Props = {}
        const oldProps = Object.assign({},this.props[field.name])
        const checkField: Props = this.checkField(field)

        console.log(field.value);
        
        
        if (checkField.test) {
            Object.assign(oldProps, {
                value: field.value,
                error: checkField.message
            });
            props[field.name] = oldProps            
        } else{
            Object.assign(oldProps, {
                value: field.value,
                error: ''
            });
            props[field.name] = oldProps
        }
        props.focus = next ? next.name : ''
        this.setProps(props)
    }


    checkField(fieldName: HTMLInputElement): Props {
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
                const phoneRegExp = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/;
                if (fieldName.value.length === 0 || !phoneRegExp.test(fieldName.value)) {
                    test = true
                    message = "Не верный формат телефона"    
                }    
                break;
            case 'psw':
                if (fieldName.value.length < 6) {
                    test = true
                    message = "Пароль должен содержать более 6 символов"    
                }    
                break;
            case 'avatar':
                test = false   
                break;
            default:
                console.log(fieldName.name,fieldName.value, fieldName.value.length);
                
                if (fieldName.value.length === 0) {
                    test = true
                    message = "Поле не должно быть пустым"  
                }
            break;
        }
        return {test:test, message:message}
    }
}