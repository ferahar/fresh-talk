import {EventBus} from "./eventbus.js"
import {DomElement, $} from "./DomElement.js"


export class Component<T> {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:Component-did-mount",
      FLOW_CDU: "flow:Component-did-update",
      FLOW_RENDER: "flow:render"
    }
    
    private _element: DomElement | null = null;
    private _tagName: string
    
    eventBus: EventBus<T>
    props: any
    
    private listeners: {[key: string]: keyof Component<T>}

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
          const method = this[nameMethod]!.bind(this)
          this._element!.on(eventName, method)
        })
      }
    }
  
    private _registerEvents(eventBus: EventBus<T>) {
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
  
    //   // Может переопределять пользователь, необязательно трогать
    ComponentDidMount<T>(oldProps?: T) {
        if (oldProps) {
            console.log(oldProps)
        } else {
            console.log("ComponentDidMount")
        }

    }
  
    private _ComponentDidUpdate<T,R>(oldProps: T, newProps: R) {
       return this.ComponentDidUpdate(oldProps, newProps);
    }
  
      // Может переопределять пользователь, необязательно трогать
    ComponentDidUpdate<T,R>(oldProps: T, newProps: R) {
        if (oldProps||newProps) {
            return true;
        }
    }
  
    setProps = (nextProps: object) => {
      if (!nextProps) {
        return;
      } else if (this.ComponentDidUpdate(this.props, nextProps) ) {
        Object.assign(this.props, nextProps);
      }
        
    }
  
    get element() {
      return this._element;
    }
  
    private _render(): void {
      // const render = this.render()? this.render(): 'render false';
      // Этот небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно не в строку компилировать (или делать это правильно),
      // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        if (this._element) {
            this.render()
            this.eventBus.emit(Component.EVENTS.FLOW_CDM)
        }
    }
  
      // Может переопределять пользователь, необязательно трогать
    render() {

    }

    append(components: any[]) {
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
  
    private _makePropsProxy<T extends object>(props: T): object {
        const event = this.eventBus
        return new Proxy(props, {
            get(target, prop: keyof T) {
                return target[prop]
            },
            set(target, prop: keyof T, value) {
                target[prop] = value
                if (event.emit(Component.EVENTS.FLOW_CDU), props, target) {
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
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return $(document.createElement(tagName));
    }
  
    show() {
        if(this.element) this.element.show()
    }
  
    hide() {
        if(this.element) this.element.hide()
    }
  }