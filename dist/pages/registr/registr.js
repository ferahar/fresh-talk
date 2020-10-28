import { Container } from "../../componets/container/container.js";
import { Forms } from "../../componets/forms/forms.js";
export function registrPage() {
    const root = document.getElementById('root');
    const form = new Forms({
        title: "Регистрация",
        email: true,
        phone: true,
        firstname: true,
        secondtname: true,
        psw: 'psw',
        pswdouble: 'psw',
        button: {
            text: "Зарегистрироваться",
            textlink: "Вход",
            link: "#"
        }
    });
    form.element.addClass("form_themeLogin");
    const main = new Container('main', [form], "main container container_centerStart");
    root.appendChild(main.element.nativeElement);
}
registrPage();
//# sourceMappingURL=registr.js.map