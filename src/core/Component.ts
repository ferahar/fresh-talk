import { EventBus } from "./eventbus.js"
import { DomElement, $ } from "./DomElement.js"
import { Router } from "./router.js"

export interface Props {
  [index: string]: string | {} | number | undefined
}

export type Config = {
  [key in string]: Component[] | Component | Router | string | {};
};

declare var nunjucks: any;

export class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:Component-did-mount",
    FLOW_CDU: "flow:Component-did-update",
    FLOW_RENDER: "flow:render"
  }
  
  private _template: string = ''
  private _element: DomElement | null = null;
  private _selectorClass: string = ''
  private listeners: {[key: string]: keyof Component}
  private components: Component[] | null = null

  selector: string = 'app-root'
  eventBus: EventBus
  props: Props
  
  constructor(config: Config){

    this.selector = config.selector as string
    this._selectorClass = config.selectorClass as string
    this._template = config.template as string
    this.listeners = config.listeners as {}
    if (config.components) {
      this.components = config.components as Component[]
    }

    if (config.props) {
      this.props = this._makePropsProxy(config.props as {});  
    } else this.props = this._makePropsProxy({});
    
    this.eventBus = new EventBus();
    this._registerEvents(this.eventBus);
    this.init()
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

  init() {
    const element = document.getElementById(this.selector)
    
    if (element) {
      this._element = $(element as HTMLElement)  
      this._initDomListeners()
    }
    
    if (this._element && this._selectorClass ) {
      this._element.setClass( this._selectorClass )
    }

  }

  private _initDomListeners() {
    if (!this.listeners) return
    Object.keys(this.listeners).forEach(eventName => {
      const nameMethod = this.listeners![eventName];
      if (this[nameMethod]) {
        const method = (this[nameMethod] as Function).bind(this)
        this._element!.on(eventName, method, this)
      }
    })
  }

  private _removeDomListeners() {
    if (!this.listeners) return
    Object.keys(this.listeners).forEach(eventName => {
      const nameMethod = this.listeners![eventName];
      if (this[nameMethod]) {
        console.log(nameMethod, Math.random());
        const method = (this[nameMethod] as Function).bind(this)
        this._element!.off(eventName, method)
      }
    })
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount() { 
    // console.log(`Render componentDidMount`);
  }

  private _componentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
      return this.componentDidUpdate(newProps, oldProps);
  }

  componentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
    if (newProps||oldProps) {
      return true;
    }
    return false
  }

  private _render(): void {  
    
    if ( !this._element ) {
      this.init()
    }
    
    this.render()
    this._componentDidMount()
    
    if (this.components) {
      this.components.forEach( component => {
        component.eventBus.emit(Component.EVENTS.INIT)
        component.eventBus.emit(Component.EVENTS.FLOW_RENDER)
      })
    }
  }

  render() {
    if(!this._element) throw new Error(`Component with selector ${this.selector} wosn't found`)
    this.element!.html(nunjucks.render(this._template, this.props))
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    } else if (this.componentDidUpdate(this.props, nextProps) ) {
      Object.assign(this.props, nextProps);
    }
  }

  private _makePropsProxy(props: Props): Props {
    // const event = this.eventBus
    return new Proxy(props, {
        get: (target, prop: keyof Props) => {
            return target[prop]
        },
        set: (target, prop: keyof Props, value) => {
          const check: boolean = this._componentDidUpdate(value, target[prop] as Props)
          if (check) {
              target[prop] = value
              this._render()
              // event.emit(Component.EVENTS.FLOW_RENDER)    
          }
          return true;
        },
        deleteProperty: () => {
            throw new Error('Нет прав');
        }
    });
  }

  show() {
      if(this.element) this.element.show()
  }

  hide() {
      if(this.element) this.element.hide()
  }
}