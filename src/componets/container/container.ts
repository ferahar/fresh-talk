import {Component} from "../../core/Component.js"

export class Container<T> extends Component<T> {
    
    constructor(tagname: string, components: Component<T>[] = [], style?: string[]) {
        super(tagname);
        if (style) {
            style.forEach( style => {
                this.element!.addClass(style)
            })
        }
        this.append(components)
    }

}