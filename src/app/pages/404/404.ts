import {Component, Router, DomElement} from '../../../core/'

const template = require('./404.html')

class Page404 extends Component {
  constructor(props: Indexed) {
    super( {
      tagName: 'section',
      template,
      props
    } );
        this.element!.setClass('msgSys')
  }
}

export const page404 = new Page404({
  title: '404',
  message: 'Ложки не существует'
})


new Router().initLink( page404.element as DomElement )
