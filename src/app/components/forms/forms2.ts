import { Component, Config, Props } from "../../../core/component.js"
import { Item } from "../../components/item/item.js"
import { checkField } from "../../../core/index.js"

type Titles = Record<string, string>;

const titles: Titles = {
    email: "Почта",
    phone: "Телфон",
    avatar: "Автар",
    firstname: "Имя",
    secondname: "Фамилия",
    displayname: "",
    login: "Логин",
    password: "Пароль",
    passwordDouble: "Пароль еще раз",
    passwordOld: "Старый пароль",
    passwordNew: "Новый пароль"
};

function getFields( items: string[] ): Component[] {
    const components: Component[] = [];
    items.forEach( (item: string) => {
        components.push(
            new Item({
                selector: `app-${item}`,
                props: {
                    title: titles[item],
                    type: `${item}`,
                    placeholder: '',
                    name: item,
                    value: ''
                }
            })
        )
    });
    return components
}


export class Forms2 extends Component {

    static TEMPLATE = "../app/components/forms/forms2.html"

    constructor(config: Config) {
        config.components = getFields( (config.props as Props).items as string[] )
        config.template = Forms2.TEMPLATE;
        config.listeners = {
            'submit': 'onSubmit'
        };
        super( config );
    }

    private checkField( target: HTMLInputElement): Props {
        return checkField(target)
    }

    onSubmit(e: Event) {
        let flag = true
        e.preventDefault();
        const fields = this.components

        fields!.forEach( el => {
            const props = Object.assign({}, el.props)
            
            const field = el.element!.find('input').nativeElement as HTMLInputElement
            const checkField: Props = this.checkField(field)
            
            if (checkField.test) {
                props.value = field.value,
                props.error = checkField.message
                flag = false
            } else {
                props.value = field.value,
                props.error = ''
            }
            el.setProps(props)
        });

        if (!flag) return

        const form = this.element!.nativeElement
        let data = new FormData(form as HTMLFormElement)
        for(let [name, value] of data) {
            console.log(`${name} = ${value}`)
        }    
    }

}

export const formsRegistr2 = new Forms2({
    selector: 'app-form-registr',
    props: {
        items: [
            "email",
            "phone",
            "firstname",
            "login",
            "password"
        ],
        button: {
            text: "Зарегистрироваться",
            textlink: "Вход",
            link: "/login"
        }
    }
});

