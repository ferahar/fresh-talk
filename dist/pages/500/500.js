import { Blockerror } from "../../componets/blockerror/blockerror.js";
export function loginPage() {
    const blockerror = new Blockerror({
        title: "500",
        message: "Не туда попали"
    });
    const root = document.getElementById('root');
    root.appendChild(blockerror.element.nativeElement);
}
loginPage();
//# sourceMappingURL=500.js.map