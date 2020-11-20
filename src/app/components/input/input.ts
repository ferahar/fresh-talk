import { Component } from "../../../core/component/component"

type Indexed = {
    [key in string]: unknown
}

export class Input extends Component {

    static TEMPLATE = '../app/components/input/input.html'
    
    constructor(config: Indexed) {
        config.template = Input.TEMPLATE;
        config.tagName = 'label'
        super( config )
        this.element!.setClass( 'form-label' )
    }
}
