import { EventBus } from "./eventbus.js";
import { $ } from "./DomElement.js";
export class Component {
    constructor(tagName = "div", props = {}, listeners = {}) {
        this._element = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            else if (this.componentDidUpdate(this.props, nextProps)) {
                Object.assign(this.props, nextProps);
            }
        };
        this.eventBus = new EventBus();
        this._tagName = tagName;
        this.listeners = listeners;
        this.props = this._makePropsProxy(props);
        this._registerEvents(this.eventBus);
        this.eventBus.emit(Component.EVENTS.INIT);
    }
    _initDomListeners() {
        if (!this.listeners)
            return;
        Object.keys(this.listeners).forEach(eventName => {
            const nameMethod = this.listeners[eventName];
            if (this[nameMethod]) {
                const method = this[nameMethod].bind(this);
                this._element.on(eventName, method, this);
            }
        });
    }
    get element() {
        return this._element;
    }
    _registerEvents(eventBus) {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _createResources() {
        const tagName = this._tagName;
        this._element = this._createDocumentElement(tagName);
    }
    init() {
        this._createResources();
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
        this._initDomListeners();
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount() {
    }
    _componentDidUpdate(newProps, oldProps) {
        return this.componentDidUpdate(newProps, oldProps);
    }
    componentDidUpdate(newProps, oldProps) {
        if (newProps || oldProps) {
            return true;
        }
        return false;
    }
    _render() {
        if (this._element) {
            this.render();
            this.eventBus.emit(Component.EVENTS.FLOW_CDM);
        }
    }
    render() { }
    append(components) {
        components.forEach(component => {
            if (this.element && component.element) {
                this.element.append(component.element);
            }
        });
    }
    getContent() {
        if (this.element) {
            return this.element.nativeElement;
        }
        return null;
    }
    _makePropsProxy(props) {
        const event = this.eventBus;
        return new Proxy(props, {
            get: (target, prop) => {
                return target[prop];
            },
            set: (target, prop, value) => {
                const check = this._componentDidUpdate(value, target[prop]);
                if (check) {
                    target[prop] = value;
                    event.emit(Component.EVENTS.FLOW_RENDER);
                }
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет прав');
            }
        });
    }
    _createDocumentElement(tagName) {
        return $(document.createElement(tagName));
    }
    show() {
        if (this.element)
            this.element.show();
    }
    hide() {
        if (this.element)
            this.element.hide();
    }
}
Component.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:Component-did-mount",
    FLOW_CDU: "flow:Component-did-update",
    FLOW_RENDER: "flow:render"
};
//# sourceMappingURL=Component.js.map