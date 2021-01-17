import {Component, Router, DomElement} from '../../../core/'
import {formsRegistr} from '../../components/forms2/'
import {headerReg} from '../../components/header/'
import {ListComponents} from '../../../core/type'


class RegisterPage extends Component {
  constructor(components: ListComponents = {}) {
    super( {
      tagName: 'section',
      components
    } )
        this.element!.setClass('container container_isColumn container_center')
  }
}

export const registerPage = new RegisterPage({
  components: [headerReg, formsRegistr]
})

new Router().initLink( registerPage.element as DomElement )

