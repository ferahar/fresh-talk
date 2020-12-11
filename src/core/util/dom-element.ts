import { util } from "./util";

export class DomElement {
    nativeElement: HTMLElement | null
    
    constructor(el: string | HTMLElement){
        if (util.isString(el)) {
            this.nativeElement = document.querySelector(el as string)
        }
        this.nativeElement = el as HTMLElement;
    }

    on(eventName: string, func: EventListener, option=false){

        if (this.nativeElement) {
            this.nativeElement.addEventListener(eventName, func, option)
        }
        return this
    }

    off(eventName: string, func: EventListener){
        if (this.nativeElement) this.nativeElement.removeEventListener(eventName, func)
        return this
    }

    parent() {
        if (this.nativeElement) return $(this.nativeElement.parentElement as HTMLElement)
    }

    text(text: string) {
        if (util.isString(text) && this.nativeElement) {
             this.nativeElement.textContent = text as string
        }
      }

    html(html: string) {
        if (util.isString(html) && this.nativeElement) {
             this.nativeElement.innerHTML = html as string
        }
      }
    
    getHtml(): string | boolean {
        if (this.nativeElement) {
            return this.nativeElement.innerHTML
        }
        return false
      }

    append(el: DomElement) {
        if (this.nativeElement) {
            this.nativeElement.appendChild(el.nativeElement as Node)
        }
        return this
    }


    find(selector: string):DomElement {
        if (this.nativeElement) {
            const node: Node | null = this.nativeElement.querySelector(selector)
            return $(node as HTMLElement)
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

    setClass(style: string) {
        this.nativeElement!.className = style
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