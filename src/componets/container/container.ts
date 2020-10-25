import {Component} from "../../core/Component.js"

export class Container extends Component {
    
    constructor(tagname: string, components?: Component[], style?: string) {
        super(tagname);
        if (style) {
            this.element!.setClass(style)
        }
        if (components) {
            this.append(components)    
        }
    }

    addComponent(components: Component[],) {
        if (components) {
            this.append(components)    
        }
    }

}