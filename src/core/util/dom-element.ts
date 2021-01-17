import {util} from './util'

export class DomElement {
    nativeElement: HTMLElement | null

    constructor(el: string | HTMLElement) {
      if (util.isString(el)) {
        this.nativeElement = document.querySelector(el as string)
      }
      this.nativeElement = el as HTMLElement;
    }

    on(eventName: string, func: EventListener, option=false) {
      if (this.nativeElement) {
        this.nativeElement.addEventListener(eventName, func, option)
      }
      return this
    }

    off(eventName: string, func: EventListener) {
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

    getHtml() {
      if (this.nativeElement) {
        return this.nativeElement.innerHTML
      }
    }

    getText() {
      if (this.nativeElement) {
        return this.nativeElement.innerText
      }
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
        this.nativeElement.setAttribute(name, value as string);
      }
      return this
    }

    show() {
      if (this.nativeElement) this.nativeElement.style.display = 'block'
    }

    hide() {
      if (this.nativeElement) this.nativeElement.style.display = 'none'
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
}

export function $(el: string | HTMLElement) {
  return new DomElement(el);
}
