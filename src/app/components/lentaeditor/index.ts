import {Lentaeditor} from "./lentaeditor";
import {modalwindowAddUsers} from "../modalwindow/index";

document.body.appendChild(modalwindowAddUsers.element.nativeElement as HTMLElement)
export const lentaEditor = new Lentaeditor()