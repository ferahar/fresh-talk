import { Component } from "../../core/Component.js";
export class Container extends Component {
    constructor(tagname, components = [], style) {
        super(tagname);
        if (style) {
            style.forEach(style => {
                this.element.addClass(style);
            });
        }
        this.append(components);
    }
}
//# sourceMappingURL=container.js.map