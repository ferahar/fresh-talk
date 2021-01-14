import {Component} from '../component';
import {renderString} from 'nunjucks';


export class Btn extends Component {
    static TEMPLATE = `{{ title }}`
    private callback: Function | null

    constructor(title: string, callback?: Function) {
      super({
        tagName: 'button',
        style: 'button',
        props: {
          title
        }
      })

      if (callback && this.element ) {
        this.callback = callback
        this.element.on( 'click', this.callback as EventListener )
      } else {
        this.callback = null
      }
    }

    render() {
      return renderString(Btn.TEMPLATE, this.props);
    }
}
