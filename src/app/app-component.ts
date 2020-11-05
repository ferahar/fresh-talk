import { Component } from "../core/component.js"


declare var nunjucks: any;

class StartPoint extends Component {
    
    static TEMPLATE = `
    <app-header></app-header>
    <app-page></app-page>
    `
    constructor(config: {}) {
        super( config );
    }
  
}

export const startPoint = new StartPoint({
    selector: 'app-root',
    template: StartPoint.TEMPLATE
})