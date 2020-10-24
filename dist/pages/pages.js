import { Container } from "../componets/container/container.js";
import { Button } from "../componets/button/button.js";
import { Input } from "../componets/input/input.js";
const currentPage = window.location.pathname;
console.log(currentPage);
const root = document.getElementById('root');
const inputLogin = new Input({
    text: "Логин",
    placeholder: 'placeholder text'
});
const inputPsw = new Input({ text: "Пароль" });
const button = new Button({ text: "Авторизоваться" });
button.element.addClass("button_primary");
button.element.addClass("form-button");
const buttonLink = new Button({ text: "Зарегистрироваться" });
const footer = new Container('div', [button, buttonLink], ["container", "container_isColumn"]);
const form = new Container('form', [inputLogin, inputPsw, footer], ["form", "form_themeLogin"]);
const main = new Container('main', [form], ["main", "container", "container_centerStart"]);
root.appendChild(main.element.nativeElement);
//# sourceMappingURL=pages.js.map