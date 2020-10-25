import { Blockerror } from "../../componets/blockerror/blockerror.js";
export function systemPage() {
    const blockerror = new Blockerror({
        title: "404",
        message: "Ложки не существует"
    });
    const root = document.getElementById('root');
    root.appendChild(blockerror.element.nativeElement);
}
systemPage();
//# sourceMappingURL=404.js.map