import { EventBus } from "./eventbus"
import { DomElement, $ } from "./util/DomElement"
import { Router } from "./router/router"

export type StringIndexed = Record<string, unknown>;

export interface Props {
  [index: string]: string | {} | number | undefined | string[]
}

export type Config = {
  [key in string]: Component[] | Component | Router | string | {} | string[] | Config;
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
  private _meta: Config | null = null;
  
  private listeners: {[key: string]: keyof Component}
  
  // protected components: Component[] | null = null

  eventBus: EventBus
  props: Props
  
  constructor(config: Config){
    
    this._meta = {
      tagName: config.tagName,
      props: config.props
    }

    this._template = config.template as string
    this.listeners = config.listeners as {}
    
    // if (config.components) {
    //   this.components = config.components as Component[]
    // }

    if (config.props) {
      this.props = this._makePropsProxy(config.props as {});  
    } else this.props = this._makePropsProxy({});
    
    this.eventBus = new EventBus();
    this._registerEvents(this.eventBus);
    this.eventBus.emit(Component.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private init() {
    if (!this._meta) return
    const tagName = this._meta.tagName;
    this._element = $(document.createElement( tagName as string))
    this._initDomListeners()
    this.eventBus.emit(Component.EVENTS.FLOW_CDM)
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

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
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

    if ( this.element && this._template) {
      const tmpl = this.render()
      this.element.html( tmpl )
    }

    // if (this.components) {
    //   this.components.forEach( component => {
    //     // component.renderDom( this.props.id as string )
    //     this.append( component )
    //   })
    // }
  }

  render() {
    return nunjucks.render(this._template, this.props)
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    } else if (this.componentDidUpdate(this.props, nextProps) ) {
      Object.assign(this.props, nextProps);
    }
  }

  private _makePropsProxy(props: Props): Props {
    return new Proxy(props, {
        get: (target, prop: keyof Props) => {
            return target[prop]
        },
        set: (target, prop: keyof Props, value) => {
          const check: boolean = this._componentDidUpdate(value, target[prop] as Props)
          if (check) {
              target[prop] = value
              this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
          }
          return true;
        },
        deleteProperty: () => {
            throw new Error('Нет прав');
        }
    });
  }

  get element(): DomElement | null {
    return this._element
  }

  getContent() {
    return this.element;
  }

  append(component: Component) {
    if ( !this.element) return
    this.element.append( component.element as DomElement )
  }

  append2(components: Component[], id?: string) {
    
    if ( !this.element) return
    console.log(components);
    let node = this.element
    if ( id ) node = this.element.find(`#${id}`)
    components.forEach( component => {
      node.append( component.element as DomElement )
    })
  }

  renderDom(query: string) {
    const root = document.getElementById( query );
    if (!root || !this.element) return
    root.appendChild( this.element.nativeElement as HTMLElement);
  }

  show() {
      if (this.element) this.element.show()
  }

  hide() {
      if (this.element) this.element.hide()
  }
}