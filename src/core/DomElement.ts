import { util } from "./util.js";

export class DomElement {
    nativeElement: HTMLElement | null
    
    constructor(el: string | HTMLElement){
        if (util.isString(el)) {
            this.nativeElement = document.querySelector(el as string)
        }
        this.nativeElement = el as HTMLElement;
    }

    // on<T>(eventName: string, func: EventListener, context: T){
    //     func = func.bind(context)
    //     this.nativeElement.addEventListener(eventName, func)
    //     return this
    // }

    on(eventName: string, func: EventListener){
        if (this.nativeElement) this.nativeElement.addEventListener(eventName, func)
        return this
    }

    off(eventName: string, func: EventListener){
        if (this.nativeElement) this.nativeElement.removeEventListener(eventName, func)
        return this
    }

    // html(html) {
    //     if(html.isWfm) html.innerHTML = html
    //     this.nativeElement.innerHTML = html
    //     return this
    // }

    html(html: string) {
        if (util.isString(html) && this.nativeElement) {
             this.nativeElement.innerHTML = html as string
        }
      }
    
    getHtml(): string | boolean {
        if (this.nativeElement) {
            return this.nativeElement.innerHTML
        };
        return false
      }

    append(el: DomElement) {
        if (this.nativeElement) {
            this.nativeElement.appendChild(el.nativeElement as Node)
        };
        return this
    }


    find(selector: string) {
        if (this.nativeElement) {
            const node: Node | null = this.nativeElement.querySelector(selector)
            $(node as HTMLElement)
        }
        return this
    }

    findAll(selector: string) {
        if (this.nativeElement) {
            return Array.from(this.nativeElement.querySelectorAll(selector)).map(e => $(e as HTMLElement))
        }
    }

    attr(name:string, value: string|null=null) {
        if (value===null && this.nativeElement) {
            return this.nativeElement.getAttribute(name);
        }
        if (this.nativeElement) {
            this.nativeElement.setAttribute(name,value as string);
        }
        return this
    }

    show() {
        if(this.nativeElement) this.nativeElement.style.display = 'block'
    }

    hide() {
        if(this.nativeElement) this.nativeElement.style.display = 'none'
    }

    addClass(className: string) {
        if (this.nativeElement) this.nativeElement.classList.add(className);
        return this;
    }

    removeClass(className: string) {
        if (this.nativeElement) this.nativeElement.classList.remove(className);
        return this;
    }

        // css(styles) {
    //     if (util.isUndefind(styles)) return this.nativeElement.style;
    //     Object.keys(styles).forEach(key => {
    //         this.nativeElement.style[key] = styles[key]
    //     })
    //     return this;
    // }


    // hasClass(className) {
    //     return this.nativeElement.classList.contains(className);
    // }


}

export function $(el: string | HTMLElement) {
    return new DomElement(el);
}