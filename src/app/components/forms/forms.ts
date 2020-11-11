import { Component, Config, Props } from "../../../core/component.js"
import { checkField } from "../../../core/index.js"
import {$} from "../../../core/DomElement.js"


export class Forms extends Component {
    static TEMPLATE = "../app/components/forms/forms.html"

    constructor(config: Config) {
        config.template = Forms.TEMPLATE;
        config.listeners = {
            'click': 'onSubmit'
        }
        super( config );
    }


    componentDidMount() {
        
        const focus = this.props.focus
        setTimeout(() => {
            if (focus) {
                document.getElementsByName(focus as string)![0].focus()
            }
        }, 0)
        
        
        this.initBlurAndFocus()
    }

    // componentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
    //     if (newProps.value && oldProps.value) {
    //         return newProps.value !== oldProps.value
    //     }
    //     return true;
    // }

    private checkField( target: HTMLInputElement): Props {
        return checkField(target)
    }

    private initBlurAndFocus() {
        const fields = this.element!.findAll('input')
        if (fields) {
            fields!.forEach(field => {
                field.on('blur', this.checkForm as EventListener, this)
                field.on('focus', this.clearForm, this)
            });
        }
    }

    private clearForm(e: Event) {
        const field = e.target as HTMLInputElement
        $(field).parent()!.find('span').hide()
        $(field).parent()!.find('span').text('')
    }

    private checkForm(e: Event & FocusEvent) {
        
        const next = e.relatedTarget as HTMLInputElement
        const field = e.target as HTMLInputElement
        const props: Props = {}
        const oldProps = Object.assign({},this.props[field.name])
        const checkField: Props = this.checkField(field)
        if (next && next.tagName==="BUTTON") return

        console.log(field.name, Math.random());
        
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

    onSubmit(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLFormElement
        if ( target!.tagName !== "BUTTON" ) return
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

        const form = this.element!.nativeElement
        let data = new FormData(form as HTMLFormElement)
        for(let [name, value] of data) {
            console.log(`${name} = ${value}`)
        }    
    }
}

