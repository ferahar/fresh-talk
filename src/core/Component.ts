import { EventBus } from "./eventbus.js"
import { DomElement, $ } from "./DomElement.js"
import { Router } from "./router.js"

interface Props {
  [index: string]: string | {} | number | undefined
}

type Config = {
  [key in string]: Component[] | Component | Router | string | {};
};

export class Component {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:Component-did-mount",
      FLOW_CDU: "flow:Component-did-update",
      FLOW_RENDER: "flow:render"
    }
    
    private _element: DomElement | null = null;
    private _template: string = ''
    // private _tagName: string

    selector: string = 'app-root'
    eventBus: EventBus
    props: Props
    
    private listeners: {[key: string]: keyof Component}

    // constructor(
    //     tagName = "div", 
    //     props = {}, 
    //     listeners= {}
    //   ) {
    constructor(config: Config){
      
      // this._tagName = config.tagName as string
      this.selector = config.selector as string
      this._template = config.template as string
      this.listeners = config.listeners as {}
      
      if (config.props) {
        this.props = this._makePropsProxy(config.props as {});  
      } else this.props = this._makePropsProxy({});
      
      this.eventBus = new EventBus();
      this._registerEvents(this.eventBus);
      this.init()
      // this.eventBus.emit(Component.EVENTS.INIT);
    }


    get element(): DomElement | null {
      return this._element
    }
  
    private _registerEvents(eventBus: EventBus) {
      eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    // private _createResources() {
    //   const tagName = this._tagName;
    //   this._element = this._createDocumentElement(tagName);
      
    // }
  
    init() {
      // this._createResources();
      // this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
      this._element = $(document.createElement(this.selector))
      // this._render()
      // this._initDomListeners()
    }

    private _initDomListeners() {
      if (!this.listeners) return
      Object.keys(this.listeners).forEach(eventName => {
        const nameMethod = this.listeners![eventName];
        if (this[nameMethod]) {
          const method = (this[nameMethod] as Function).bind(this)
          const element = document.querySelector(this.selector)
          if (element) {
            $(element as HTMLElement).on(eventName, method, this)  
          }
        }
      })
    }
  
    private _componentDidMount(): void {
      this.componentDidMount();
    }
  
    // Может переопределять пользователь, необязательно трогать
    // вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам
    componentDidMount() { 
      // console.log(`Render ${this._tagName}`);
    }
  
    private _componentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
        return this.componentDidUpdate(newProps, oldProps);
    }
  
      // Может переопределять пользователь, необязательно трогать
    componentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
      if (newProps||oldProps) {
        return true;
      }
      return false
    }
  
    setProps = (nextProps: Props) => {
      if (!nextProps) {
        return;
      } else if (this.componentDidUpdate(this.props, nextProps) ) {
        Object.assign(this.props, nextProps);
      }
    }
  
    private _render(): void {
      if (this._element) {
        this.render()
        this.eventBus.emit(Component.EVENTS.FLOW_CDM)
      }
    }
  
    render() {
      if(!this._element) throw new Error(`Component with selector ${this.selector} wosn't found`)
      console.log(this._element.nativeElement);
      document.querySelector( this.selector )!.innerHTML = this._template
      this._initDomListeners()
    }

    protected append(components: any[]) {
      components.forEach( component => {
         if (this.element&&component.element) {
          this.element.append(component.element)
         }
      })
    }
  
    getContent(): HTMLElement | null {
        if (this.element) {
            return this.element.nativeElement
        }
        return null
    }
  
    private _makePropsProxy(props: Props): Props {
      const event = this.eventBus
      return new Proxy(props, {
          get: (target, prop: keyof Props) => {
              return target[prop]
          },
          set: (target, prop: keyof Props, value) => {
            const check: boolean = this._componentDidUpdate(value, target[prop] as Props)
            if (check) {
                target[prop] = value
                event.emit(Component.EVENTS.FLOW_RENDER)    
            }
            return true;
          },
          deleteProperty: () => {
              throw new Error('Нет прав');
          }
      });
    }
  
    // private _createDocumentElement(tagName:string) {
    //   return $(document.createElement(tagName));
    // }
  
    show() {
        if(this.element) this.element.show()
    }
  
    hide() {
        if(this.element) this.element.hide()
    }
  }