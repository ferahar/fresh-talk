import { DomElement, $ } from "../util/dom-element"
import { Store, EventBus } from "../index"


type Indexed = {
  [key in string]: unknown
}


type ListComponents = {
  [key in string]: Component[]
}


declare var nunjucks: any

export class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:Component-did-mount",
    FLOW_CDU: "flow:Component-did-update",
    FLOW_RENDER: "flow:render"
  }


  private _element: DomElement
  private listeners: {[key: string]: keyof Component}


  protected _store: Store | null = null
  protected _template: string = ''
  protected components: ListComponents = {}

  eventBus: EventBus
  props: Indexed

  constructor(config: Indexed){

    this._element = $(document.createElement( config.tagName as string))
    this._template = config.template as string
    this.listeners = config.listeners as {}
    this._store = config.store as Store

    if (config.components) {
      this.components = config.components as ListComponents
    }

    if (config.props) {
      this.props = this._makePropsProxy(config.props as {});
    } else this.props = this._makePropsProxy({});

    this.eventBus = new EventBus()
    this._registerEvents(this.eventBus)
    this.eventBus.emit(Component.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private init() {
    this._initDomListeners()
    this.eventBus.emit(Component.EVENTS.FLOW_CDM)
  }

  private _initDomListeners() {
    if (!this.listeners) return
    Object.keys(this.listeners).forEach(eventName => {
      const nameMethod = this.listeners![eventName]
      if (this[nameMethod]) {
        const method = (this[nameMethod] as Function).bind(this)
        this._element!.on(eventName, method)
      }
    })
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
  }

  componentDidMount() {}

  private _componentDidUpdate<T extends Indexed>(newProps: T, oldProps: T): boolean {
    return this.componentDidUpdate(newProps, oldProps)
  }

  componentDidUpdate(newProps: Indexed, oldProps: Indexed): boolean {
    if ( newProps && oldProps) return true
    return false
  }


  private _render(): void {

    if ( this.element && this._template) {
      const tmpl = this.render()
      this.element.html( tmpl )
    }

    if (this.components) {
      Object.keys(this.components).forEach(key=>{
        const compArray = this.components[key]
        compArray.forEach(component=>{
          this.append( [component], key )
        })
      })
    }

  }

  render() {
    return nunjucks.render(this._template, this.props)
  }

  setProps = (nextProps: Indexed) => {
    if (!nextProps) {
      return
    } else if (this.componentDidUpdate(this.props, nextProps) ) {
      Object.assign(this.props, nextProps)
    }
  }

  private _makePropsProxy(props: Indexed): Indexed {
    return new Proxy(props, {
      get: (target, prop: keyof Indexed) => {
        return target[prop]
      },
      set: (target, prop: keyof Indexed, value) => {
        const check: boolean = this._componentDidUpdate(value, target[prop] as Indexed)
        if (check) {
          target[prop] = value
          this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
        }
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет прав')
      }
    });
  }

  get element(): DomElement {
    return this._element
  }

  getContent() {
    return this.element
  }

  append(components: Component[], id?: string) {

    if ( !this.element) return
    let element: DomElement = this.element
    let node: DomElement | undefined = undefined
    if ( id ) {
      node = this.element.find(`#${id}`)
    }
    if (node !== undefined) {
      element = node
    }
    components.forEach( component => {
      element.append( component.element as DomElement )
    })
  }

  show() {
    if (this.element) this.element.show()
  }

  hide() {
    if (this.element) this.element.hide()
  }
}