import {EventBus} from "./eventbus.js"
import {DomElement, $} from "./DomElement.js"

interface Props {
  [index: string]: string | {} | number | undefined
}

export class Component {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:Component-did-mount",
      FLOW_CDU: "flow:Component-did-update",
      FLOW_RENDER: "flow:render"
    }
    
    private _element: DomElement | null = null;
    private _tagName: string
    
    eventBus: EventBus
    props: Props
    
    private listeners: {[key: string]: keyof Component}

    constructor(
        tagName = "div", 
        props = {}, 
        listeners={}
      ) {
      this.eventBus = new EventBus();
      this._tagName = tagName
      this.listeners = listeners
      this.props = this._makePropsProxy(props);
      this._registerEvents(this.eventBus);
      this.eventBus.emit(Component.EVENTS.INIT);
    }


    private _initDomListeners() {
      if (this.listeners) {
        Object.keys(this.listeners).forEach(eventName => {
          const nameMethod = this.listeners![eventName];
          if (this[nameMethod]) {
            const method = (this[nameMethod] as Function).bind(this)
            this._element!.on(eventName, method, this)
          }
        })
      }
    }

    get element(): DomElement | null {
      return this._element
    }
  
    private _registerEvents(eventBus: EventBus) {
      eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Component.EVENTS.FLOW_CDM, this._ComponentDidMount.bind(this));
      eventBus.on(Component.EVENTS.FLOW_CDU, this._ComponentDidUpdate.bind(this));
      eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    private _createResources() {
      const tagName = this._tagName;
      this._element = this._createDocumentElement(tagName);
      
    }
  
    init() {
      this._createResources();
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
      this._initDomListeners()
    }
  
    private _ComponentDidMount(): void {
      this.ComponentDidMount();
    }
  
    // Может переопределять пользователь, необязательно трогать
    // вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам
    ComponentDidMount() { 
      console.log(`Render ${this._tagName}`);
    }
  
    private _ComponentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
        return this.ComponentDidUpdate(newProps, oldProps);
    }
  
      // Может переопределять пользователь, необязательно трогать
    ComponentDidUpdate<T extends Props>(newProps: T, oldProps: T): boolean {
      
      if (newProps||oldProps) {
          return true;
        }
      return false
    }
  
    setProps = (nextProps: Props) => {
      if (!nextProps) {
        return;
      } else if (this.ComponentDidUpdate(this.props, nextProps) ) {
        Object.assign(this.props, nextProps);
      }
    }
  
    private _render(): void {
        if (this._element) {
            this.render()
            this.eventBus.emit(Component.EVENTS.FLOW_CDM)
        }
    }
  
    render() {}

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
      const ComponentDidUpdate = this._ComponentDidUpdate.bind(this)
      return new Proxy(props, {
          get(target, prop: keyof Props) {
              return target[prop]
          },
          set(target, prop: keyof Props, value) {
            const check: boolean = ComponentDidUpdate(value, target[prop] as Props)
            if (check) {
                target[prop] = value
                event.emit(Component.EVENTS.FLOW_RENDER)    
            }
            return true;
          },
          deleteProperty() {
              throw new Error('Нет прав');
          }
      });
    }
  
    private _createDocumentElement(tagName:string) {
      return $(document.createElement(tagName));
    }
  
    show() {
        if(this.element) this.element.show()
    }
  
    hide() {
        if(this.element) this.element.hide()
    }
  }