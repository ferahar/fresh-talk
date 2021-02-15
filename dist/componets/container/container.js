import { Component } from "../../core/Component.js";
export class Container extends Component {
    constructor(tagname, components, style) {
        super(tagname);
        if (style) {
            this.element.setClass(style);
        }
        if (components) {
            this.append(components);
        }
    }
    addComponent(components) {
        if (components) {
            this.append(components);
        }
    }
}
//# sourceMappingURL=container.js.map