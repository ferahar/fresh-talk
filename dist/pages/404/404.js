import { Blockerror } from "../../componets/blockerror/blockerror.js";
export function systemPage() {
    const blockerror = new Blockerror({
        title: "500",
        message: "Мы уже фиксим"
    });
    const root = document.getElementById('root');
    root.appendChild(blockerror.element.nativeElement);
}
systemPage();
//# sourceMappingURL=404.js.map