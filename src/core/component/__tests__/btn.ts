import {Component} from '../component';
import {compile} from 'nunjucks';

const tmpl = compile('{{title}}')

export class Btn extends Component {
    private callback: Function | null

    constructor(title: string, callback?: Function) {
      super({
        tagName: 'button',
        style: 'button',
        props: {
          title
        },
        template: tmpl.render.bind(tmpl)
      })

      if (callback && this.element ) {
        this.callback = callback
        this.element.on( 'click', this.callback as EventListener )
      } else {
        this.callback = null
      }
    }
}
