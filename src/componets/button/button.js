import {Component} from "../../core/component"

interface Btn {
    text: string | null
}

class Button extends Component {
    constructor( props: Btn | null ) {
        super("button", props);
    }
  
    render(): string|null {
        let tmpl: string|null
        
        if (!this.props) {
            tmpl = window.nunjucks.renderString('<span>${{text}}</span>', { text: this.props.text });
        }
        
        return tmpl;
    }
  }
  
  function render(query: string, component: Component): HTMLElement | null {
    const root: HTMLElement | null = document.querySelector(query);
    if (root) {
        root.appendChild(component.getContent());
    }
    return root;
  }
  
  const button = new Button({
        text: 'Click me',
  });
  
  // app — это id дива в корне DOM
  render(".app", button);
  
  // Через секунду контент изменится сам, достаточно обновить пропсы
  setTimeout(() => {
    button.setProps({
      text: 'Click me, please',
    });
  }, 1000);