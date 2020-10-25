import { util } from "./util.js";
export class DomElement {
    constructor(el) {
        if (util.isString(el)) {
            this.nativeElement = document.querySelector(el);
        }
        this.nativeElement = el;
    }
    on(eventName, func, context) {
        const fun = func.bind(context);
        if (this.nativeElement)
            this.nativeElement.addEventListener(eventName, fun);
        return this;
    }
    off(eventName, func) {
        if (this.nativeElement)
            this.nativeElement.removeEventListener(eventName, func);
        return this;
    }
    parent() {
        if (this.nativeElement)
            return $(this.nativeElement.parentElement);
    }
    text(text) {
        if (util.isString(text) && this.nativeElement) {
            this.nativeElement.textContent = text;
        }
    }
    html(html) {
        if (util.isString(html) && this.nativeElement) {
            this.nativeElement.innerHTML = html;
        }
    }
    getHtml() {
        if (this.nativeElement) {
            return this.nativeElement.innerHTML;
        }
        ;
        return false;
    }
    append(el) {
        if (this.nativeElement) {
            this.nativeElement.appendChild(el.nativeElement);
        }
        ;
        return this;
    }
    find(selector) {
        if (this.nativeElement) {
            const node = this.nativeElement.querySelector(selector);
            return $(node);
        }
        return this;
    }
    findAll(selector) {
        if (this.nativeElement) {
            return Array.from(this.nativeElement.querySelectorAll(selector)).map(e => $(e));
        }
    }
    attr(name, value = null) {
        if (value === null && this.nativeElement) {
            return this.nativeElement.getAttribute(name);
        }
        if (this.nativeElement) {
            this.nativeElement.setAttribute(name, value);
        }
        return this;
    }
    show() {
        if (this.nativeElement)
            this.nativeElement.style.display = 'block';
    }
    hide() {
        if (this.nativeElement)
            this.nativeElement.style.display = 'none';
    }
    addClass(className) {
        if (this.nativeElement)
            this.nativeElement.classList.add(className);
        return this;
    }
    setClass(style) {
        this.nativeElement.className = style;
    }
    removeClass(className) {
        if (this.nativeElement)
            this.nativeElement.classList.remove(className);
        return this;
    }
}
export function $(el) {
    return new DomElement(el);
}
//# sourceMappingURL=DomElement.js.map