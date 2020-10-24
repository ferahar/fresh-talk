import { Button } from "./componets/button/button.js";
console.log('-= ʕ ᵔᴥᵔ ʔ =-');
const btn = new Button({
    text: 'I am Button'
});
btn.element.addClass('button_primary');
document.body.appendChild(btn.getContent());
setTimeout(() => {
    console.log('5sec Button');
    btn.setProps({
        text: 'Ferahar'
    });
}, 5000);
//# sourceMappingURL=index.js.map