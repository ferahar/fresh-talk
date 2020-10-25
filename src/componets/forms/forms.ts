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
    }

    ComponentDidMount() {
        this.initBlur();
        this.initFocus();
    }

    initBlur() {
        const fields = this.element!.findAll('input')
        fields!.forEach(field => {
            field.on('blur', this.checkForm, this)
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
        console.log("SUBMIT");
        
        const fields = this.element!.findAll('input')
        fields!.forEach(field => {
            const checkField: Props = this.checkField(field.nativeElement as HTMLInputElement)
            if (checkField.test) {
                field.parent()!.find('span').show()
                field.parent()!.find('span').text(checkField.message as string)
            }
        });
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
              return true;
          }
        return false
    }


    checkForm(e: Event) {
        const field = e.target as HTMLInputElement
        const checkField: Props = this.checkField(field)
        if (checkField.test) {
            $(field).parent()!.find('span').show()
            $(field).parent()!.find('span').text(checkField.message as string)
        } else{
            $(field).parent()!.find('span').hide()
            $(field).parent()!.find('span').text('')
        }
    }

    clearForm(e: Event) {
        const field = e.target as HTMLInputElement
        $(field).parent()!.find('span').hide()
        $(field).parent()!.find('span').text('')
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
            case 'psw':
                if (fieldName.value.length < 6) {
                    test = true
                    message = "Пароль должен содержать более 6 символов"    
                }    
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

}


// checkForm(e: Event) {

//     const field = e.target as HTMLInputElement
//     const props: Props = this.formProps()
//     const formErrors: Props = {}
//     const checkField: Props = this.checkField(field)
//     if (checkField.test) {
//         // $(field).parent()!.find('span').show()
//         // $(field).parent()!.find('span').text(checkField.message as string)
//         formErrors[field.name] = checkField.message 
//         props.formErrors = formErrors
//         props.focus = field.name            
//         this.setProps(props)
        
//     } else{
//         // field.parentElement!.querySelector('span')!.style.display = "none"
//         // formErrors[field.name]= ''
//         // props[field.name] = { value: field.value }
//         // props.formErrors = formErrors
//         // this.setProps(props)
//     }
// }



