import {checkField} from "./check-field"
import {$} from "./dom-element"


export const checkForm = (e: Event) => {
    const field = $(e.target as HTMLElement);
    const check = checkField(field.nativeElement as HTMLInputElement);
    if (check.test) {
        field.parent()!.find('span').show();
        field.parent()!.find('span').text( check.message as string);
    }
    else {
        field.parent()!.find('span').hide();
    }
}
